import type { ArtCollection } from "@utils/types.d.ts";
import {
  artistAvatarSignal,
  artistNameSignal,
  artistSlugSignal,
  artModalOpenSignal,
  isClickableSignal,
  isForAloneArtistSignal,
} from "@utils/signals.ts";
import { DELAY_REACH_ART_FROM_MODAL } from "@utils/constants.ts";
import { formatDimensions, initials } from "@utils/helpers.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { render } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

import { ButtonCross } from "@components/Assets.tsx";


type DiscoverModalProps = {
  readonly arts: ArtCollection[];
  readonly startIndex?: number;
  readonly onClose: () => void;
};


export default function DiscoverModal(
  { arts, startIndex = 0, onClose }: DiscoverModalProps,
) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isRevealed, setIsRevealed] = useState(false);
  const [slideDir, setSlideDir] = useState<"right" | "left" | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const scrollYRef = useRef<number>(0);

  // Contexte
  const lng = i18next.language;
  const art = arts[currentIndex];
  if (!art) return null;

  // Nettoyage
  const cleanupModalGlobals = () => {
    document.body.classList.remove("no-scroll");
    document.body.style.paddingRight = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overscrollBehavior = "";
    document.documentElement.style.scrollBehavior = "";

    const nav = document.getElementById("Urarts-Nav");
    nav?.classList.remove("pointer-events-none");

    try {
      history.scrollRestoration = "auto";
    } catch {}
  };


  // Créer un conteneur de portail dans le body
  useEffect(() => {
    portalRef.current = document.createElement("div");
    document.body.appendChild(portalRef.current);

    return () => {
      if (portalRef.current) {
        render(null, portalRef.current);
        document.body.removeChild(portalRef.current);
        portalRef.current = null;
      }
    };
  }, []);


  // Ouverture de la modal
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 0);
    artModalOpenSignal.value = true;

    return () => {
      clearTimeout(timer);
      cleanupModalGlobals();
    };
  }, []);


  // Gel du scroll
  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("no-scroll");
      try {
        history.scrollRestoration = "manual";
      } catch {}
      scrollYRef.current = globalThis.scrollY || globalThis.pageYOffset || 0;
      const sbW = globalThis.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${sbW}px`;
      document.documentElement.style.scrollBehavior = "auto";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overscrollBehavior = "contain";
    }
    return () => {
      document.body.classList.remove("no-scroll");
      document.body.style.paddingRight = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overscrollBehavior = "";
      document.documentElement.style.scrollBehavior = "";
      try {
        history.scrollRestoration = "auto";
      } catch {}
    };
  }, [isVisible]);


  // Désactiver la barre de navigation
  useEffect(() => {
    const nav = document.getElementById("Urarts-Nav");

    if (nav) nav.classList.toggle("pointer-events-none", isVisible);

    return () => {
      if (nav) nav.classList.remove("pointer-events-none");
    };
  }, [isVisible]);


  // Clavier et clic extérieur
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    if (isVisible) {
      globalThis.addEventListener("keydown", onKey);
      globalThis.addEventListener("click", onClickOutside);
    }
    return () => {
      globalThis.removeEventListener("keydown", onKey);
      globalThis.removeEventListener("click", onClickOutside);
    };
  }, [isVisible, currentIndex]);


  // Fermeture de la modal
  const restoreScroll = () => {
    const y = scrollYRef.current || 0;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        globalThis.scrollTo(0, y);
        requestAnimationFrame(() => globalThis.scrollTo(0, y));
      });
    });
  };

  const handleClose = () => {
    setIsVisible(false);
    restoreScroll();
    cleanupModalGlobals();
    artModalOpenSignal.value = false;
    onClose();
  };


  // Navigation entre œuvres
  const navigate = (dir: 1 | -1) => {
    setSlideDir(dir === 1 ? "right" : "left");
    setAnimKey((k) => k + 1);
    setCurrentIndex((prev) => (prev + dir + arts.length) % arts.length);
    setIsRevealed(false);
  };


  // Révélation du tableau
  const revealArtwork = () => {
    if (!isRevealed) setIsRevealed(true);
  };


  // Clic sur un lien dans la modal
  const handleLinkClick = (event: MouseEvent, href: string) => {
    // pas d'action si le clic n'est pas autorisé
    if (!isClickableSignal.value) return;

    // désactiver les clics pendant le délai
    isClickableSignal.value = false;

    event.preventDefault();

    // on précise que c'est pour du contenu concernant seulement un(e) artiste
    isForAloneArtistSignal.value = true;
    artistAvatarSignal.value = art.avatar_url;
    artistNameSignal.value = art.first_name
      ? `${art.first_name} ${art.last_name}`
      : art.last_name;
    artistSlugSignal.value = art.artist_slug;

    // fermer la modal
    handleClose();

    // pour le délai au clic tout en préservant la navigation Fresh côté client
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = href;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, DELAY_REACH_ART_FROM_MODAL);

    // réactiver les clics après le délai
    setTimeout(() => {
      isClickableSignal.value = true;
    }, DELAY_REACH_ART_FROM_MODAL + 200);
  };


  // Dimensions
  const dimStr = art.width_cm != null && art.height_cm != null
    ? formatDimensions(lng, art.width_cm, art.height_cm)
    : null;


  // Classes d'animation
  const slideClass = slideDir === "right"
    ? "dm-slide-enter"
    : slideDir === "left"
    ? "dm-slide-enter-left"
    : "";


  // URL de l'image active (gestion polyptiques)
  const imgUrl = art.url;


  // Modal
  const modalLayout = (
    <div
      class={`dm-overlay ${isVisible ? "visible" : ""}`}
    >
      <div class="dm-vignette" />
      {/* Carte */}
      <div ref={modalRef} class="dm-card" key={animKey}>
        {/* Barre de progression */}
        <div class="dm-progress">
          <div
            class="dm-progress-bar"
            style={{ width: `${((currentIndex + 1) / arts.length) * 100}%` }}
          />
        </div>

        {/* Bouton : fermer */}
        <button
          type="button"
          onClick={handleClose}
          class="dm-close absolute top-2.5 right-2.5 text-lighterdark hover:text-red focus:outline-none"
          aria-label={i18next.t("meta.close_modal", { ns: "translation" })}
        >
          <ButtonCross aria-hidden="true" />
        </button>

        {/* Section gauche : tableau */}
        <div class={`dm-art-side ${slideClass}`}>
          <div class="dm-reveal-wrap" onClick={revealArtwork}>
            <img
              class="dm-artwork"
              src={imgUrl}
              alt={art.name ?? ""}
              draggable={false}
            />

            {/* Drap de dévoilement */}
            <div class={`dm-curtain ${isRevealed ? "revealed" : ""}`}>
              <span class="dm-curtain-hint">
                {i18next.t("modal.reveal_hint", { ns: "translation" })}
              </span>
            </div>

            {/* Cadre doré */}
            <div class={`dm-frame ${isRevealed ? "show" : ""}`} />
          </div>

          {/* Copyright */}
          <p class="dm-copyright">
            {art.copyright === 0
              ? `⊘ ${i18next.t("arts.public_domain", { ns: "translation" })}`
              : `© ${art.first_name ?? ""} ${art.last_name}`}
          </p>
        </div>

        {/* Section droite : infos */}
        <div class={`dm-info-side custom-scrollbar ${slideClass}`}>
          {/* Mouvement */}
          <span class="dm-movement-badge">
            {art.movement.toUpperCase()}
          </span>

          {/* Titre */}
          <h2 class="dm-title">{art.name}</h2>

          {/* Méta */}
          <div class="dm-meta">
            {art.year && <span class="dm-chip">{art.year}</span>}
            {dimStr && <span class="dm-chip">{dimStr}</span>}
          </div>

          {/* Carte artiste */}
          <div
            class="dm-artist-row"
            onClick={(e) => handleLinkClick(e as unknown as MouseEvent, `/art/${art.artist_slug}`)}
            role="link"
            tabIndex={0}
            aria-label={`${art.first_name ?? ""} ${art.last_name}`}
          >
            {art.avatar_url
              ? (
                <img
                  class="dm-avatar"
                  src={art.avatar_url}
                  alt={`${art.first_name ?? ""} ${art.last_name}`}
                  draggable={false}
                />
              )
              : (
                <div class="dm-avatar-initials">
                  {initials(art.first_name, art.last_name)}
                </div>
              )}
            <div>
              <p class="dm-artist-name">
                {art.first_name ?? ""} {art.last_name}
              </p>
              <p class="dm-artist-hint">
                {i18next.t("modal.see_artist_artworks", { ns: "translation" })}
              </p>
            </div>
            <span class="dm-artist-arrow">→</span>
          </div>

          {/* Description */}
          {art.info && (
            <p
              class="dm-desc"
              dangerouslySetInnerHTML={{ __html: art.info }}
            />
          )}

          {/* Tags */}
          {art.tags && art.tags.length > 0 && (
            <div class="dm-tags">
              {art.tags.map((tag, idx) => (
                <div
                  key={idx}
                  class="dm-tag"
                  onClick={(e) => handleLinkClick(e as unknown as MouseEvent, `/tag/${tag.slug}`)}
                  role="link"
                  tabIndex={0}
                  aria-label={tag.name}
                >
                  <img
                    src={`/icons/${tag.slug}.png`}
                    alt={tag.name}
                    draggable={false}
                    onError={(e) => {(e.target as HTMLImageElement).style.display = "none";}}
                  />
                  {tag.name}
                </div>
              ))}
            </div>
          )}

          {/* Clipboard */}
          <button
            type="button"
            class="dm-clipboard"
            onClick={async () => {
              try {
                const artistUrl = `${globalThis.location.origin}/art/${art.artist_slug}`;
                await navigator.clipboard.writeText(artistUrl);
              } catch (error) {
                console.error("Clipboard error:", error);
              }
            }}
          >
            🔗&nbsp;
            {i18next.t("modal.copy_artist_link", { ns: "translation" })}
          </button>
        </div>

        {/* Navigation */}
        {arts.length > 1 && (
          <nav class="dm-nav" aria-label={i18next.t("modal.navigation", { ns: "translation" })}>
            <button
              type="button"
              class="dm-nav-btn"
              onClick={() => navigate(-1)}
              aria-label={i18next.t("modal.previous", { ns: "translation" })}
            >
              ←
            </button>

            <div class="dm-dots">
              {arts.map((_, idx) => (
                <div
                  key={idx}
                  class={`dm-dot ${idx === currentIndex ? "active" : ""}`}
                  onClick={() => {
                    const dir = idx > currentIndex ? 1 : -1;
                    setSlideDir(dir === 1 ? "right" : "left");
                    setAnimKey((k) => k + 1);
                    setCurrentIndex(idx);
                    setIsRevealed(false);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${i18next.t("common.art", { ns: "translation" })} ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              class="dm-nav-btn"
              onClick={() => navigate(1)}
              aria-label={i18next.t("modal.next", { ns: "translation" })}
            >
              →
            </button>
          </nav>
        )}
      </div>
    </div>
  );


  // Rendre le contenu dans le portail
  useEffect(() => {
    if (portalRef.current) {
      render(modalLayout, portalRef.current);
    }
  }, [modalLayout]);

  return null;
}
