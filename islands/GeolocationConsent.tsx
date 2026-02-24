import { Any } from "any";
import { useEffect, useState } from "preact/hooks";

const COOKIE_NAME = "geo_consent"; // valeurs : "yes", "no"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 an

function setCookie(name: string, value: string, maxAgeSec: number) {
  document.cookie = `${name}=${
    encodeURIComponent(value)
  };max-age=${maxAgeSec};path=/;SameSite=Strict;Secure`;
}

function getCookie(name: string) {
  const m = document.cookie.match(
    new RegExp("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"),
  );
  return m ? decodeURIComponent(m[2]) : null;
}

export default function GeolocationConsent() {
  const [consent, setConsent] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const c = getCookie(COOKIE_NAME);
    setConsent(c);
    // afficher la bannière uniquement si aucun cookie n'est défini
    if (!c) {
      // léger délai pour éviter un affichage instantané du contenu
      setTimeout(() => setVisible(true), 300);
    }
  }, []);

  const handleDecline = () => {
    setCookie(COOKIE_NAME, "no", COOKIE_MAX_AGE);
    setConsent("no");
    setVisible(false);
  };

  const handleAccept = async () => {
    setSending(true);
    try {
      // demander la géolocalisation
      if (!("geolocation" in navigator)) {
        setError("Géolocalisation non disponible dans ce navigateur.");
        setCookie(COOKIE_NAME, "no", COOKIE_MAX_AGE);
        setConsent("no");
        setSending(false);
        setVisible(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          setCookie(COOKIE_NAME, "yes", COOKIE_MAX_AGE);
          setConsent("yes");

          try {
            // activer Google Analytics après consentement
            if ((window as Any).enableAnalytics) {
              (window as Any).enableAnalytics();
            }

            // envoyer la position
            if ((window as Any).sendGeolocation) {
              (window as Any).sendGeolocation(lat, lng);
            }
          } catch (err) {
            console.warn("analytics/geolocation failed:", err);
          }

          setSending(false);
          setVisible(false);
        },
        (err) => {
          console.warn("Geolocation error:", err);
          setError(
            "Impossible de récupérer la géolocalisation (permission refusée ou erreur).",
          );
          setCookie(COOKIE_NAME, "no", COOKIE_MAX_AGE);
          setConsent("no");
          setSending(false);
          setVisible(false);
        },
        {
          enableHighAccuracy: false,
          timeout: 10_000,
          maximumAge: 60_000,
        },
      );
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la demande de géolocalisation.");
      setCookie(COOKIE_NAME, "no", COOKIE_MAX_AGE);
      setConsent("no");
      setSending(false);
      setVisible(false);
    }
  };

  // ne rien afficher si l'utilisateur a déjà répondu
  if (consent === "yes" || consent === "no") return null;

  if (!visible) return null;

  return (
    <div
      aria-live="polite"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-end md:items-center justify-center z-[99999] pointer-events-none"
    >
      <div
        role="dialog"
        aria-modal="true"
        class="pointer-events-auto m-4 w-full max-w-lg rounded-2xl shadow-xl p-4 md:p-6"
        style={{
          background: "#232a2d",
          color: "#dadada",
          border: "1px solid rgba(179, 185, 184, 0.22)",
        }}
      >
        <div class="flex flex-col md:flex-row md:items-start gap-4">
          <div class="flex-shrink-0">
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(103, 176, 232, 0.12)",
                border: "1px solid rgba(103, 176, 232, 0.30)",
              }}
            >
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7l3-7z"
                  stroke="#67b0e8"
                  stroke-width="1.6"
                />
              </svg>
            </div>
          </div>

          <div class="flex-1">
            <h3 class="font-semibold text-lg" style={{ color: "#dadada" }}>
              Autoriser la géolocalisation ?
            </h3>

            <p class="mt-2 text-sm" style={{ color: "#b3b9b8" }}>
              Pour améliorer les suggestions locales et la pertinence des
              statistiques, nous pouvons récupérer votre position approximative
              et l’envoyer à Google Analytics. Acceptez-vous l’envoi de votre
              position ?
            </p>

            {error && (
              <div
                class="mt-3 rounded-xl px-3 py-2 text-xs"
                style={{
                  background: "rgba(229, 116, 116, 0.12)",
                  border: "1px solid rgba(229, 116, 116, 0.28)",
                  color: "#e57474",
                }}
              >
                {error}
              </div>
            )}

            <div class="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-3">
              <button
                onClick={handleAccept}
                disabled={sending}
                class="px-4 py-2 rounded-lg font-medium transition"
                style={{
                  background: sending ? "rgba(103,176,232,0.55)" : "#67b0e8",
                  color: "#141b1e",
                  boxShadow: "0 8px 18px rgba(103, 176, 232, 0.20)",
                  opacity: sending ? 0.85 : 1,
                }}
              >
                {sending ? "Envoi..." : "Accepter"}
              </button>

              <button
                onClick={handleDecline}
                class="mt-2 sm:mt-0 px-4 py-2 rounded-lg font-medium transition"
                aria-label="Refuser la géolocalisation"
                style={{
                  background: "#141b1e",
                  color: "#dadada",
                  border: "1px solid rgba(179, 185, 184, 0.28)",
                }}
              >
                Refuser
              </button>
            </div>

            <p class="mt-3 text-xs" style={{ color: "#dadada" }}>
              Vous pourrez changer d’avis plus tard dans les paramètres /
              confidentialité.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
