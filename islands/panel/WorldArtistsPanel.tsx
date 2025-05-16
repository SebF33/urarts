import { AnimatePresence, motion } from "motion";
import { ArtistRow } from "@utils/types.d.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "@twind/core";
import i18next from "i18next";
import "@utils/i18n/config.ts";

import { ButtonCross } from "@components/Assets.tsx";


interface ArtistPanelProps {
  readonly country: string;
  readonly artists: ArtistRow[];
  readonly onClose: () => void;
}

export function WorldArtistsPanel(
  { country, artists, onClose }: ArtistPanelProps,
) {
  const draggable = false;
  const theme = colorScheme[currentColorScheme];

  return (
    <AnimatePresence>
      {country && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
          className="fixed bottom-0 left-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-h-[80vh] z-[999999] rounded-t-2xl shadow-lg overflow-y-auto custom-scrollbar"
          style={{ backgroundColor: theme.white }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: theme.gray }}
          >
            <div className="flex items-center">
              <img
                src={`/flags/${country}.png`}
                alt={country}
                title={country}
                className={`w-6 h-4 mr-2 object-cover ${css({"filter": "drop-shadow(0.03rem 0.03rem 0.08rem rgba(0, 0, 0, 0.5))"})}`}
                draggable={false}
              />
              <h2
                className="text-2xl font-bold leading-6"
                style={{ color: theme.dark }}
              >
                {i18next.t("worldmap.artists", { ns: "translation" })} — {country}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-lighterdark hover:text-red focus:outline-none"
              aria-label="Fermer"
            >
              <ButtonCross />
            </button>
          </div>

          {/* Liste des artistes */}
          <div className="p-6 space-y-4">
            {artists.map((a) => (
              <motion.div
                key={a.id}
                className="flex items-center gap-4 p-4 rounded-lg"
                style={{
                  backgroundColor: a.gender === "Homme"
                    ? theme.blue
                    : a.gender === "Femme"
                    ? theme.magenta
                    : theme.white,
                  border: `1px solid ${theme.gray}`,
                }}
                whileHover={{
                  boxShadow: `0 4px 8px ${theme.lighterdark}`,
                  transition: { duration: 0.1 }
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex-shrink-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${a.avatar_url}')`,
                    border: `2px solid ${theme.dark}`,
                  }}
                />
                <div className="flex-1">
                  <h3
                    className="text-lg font-medium leading-5"
                    style={{ color: theme.dark }}
                  >
                    {a.first_name} {a.last_name}
                  </h3>
                  {a.info && (
                    <p
                      className="mt-1 text-sm leading-4 overflow-hidden"
                      style={{
                        color: theme.lighterdark,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {a.info}
                    </p>
                  )}
                </div>
                <a
                  href={`/art/${a.slug}`}
                  target="_blank"
                  rel="noopener"
                  className="inline-block px-3 py-1 rounded-full font-medium transition-colors"
                  style={{
                    backgroundColor: theme.dark,
                    color: theme.white,
                    boxShadow: `0 2px 4px ${theme.dark}50`,
                  }}
                  draggable={draggable}
                  onMouseEnter={(
                    e,
                  ) => (e.currentTarget.style.backgroundColor = theme.red)}
                  onMouseLeave={(
                    e,
                  ) => (e.currentTarget.style.backgroundColor = theme.dark)}
                >
                  {i18next.t("worldmap.discover", { ns: "translation" })}
                </a>
              </motion.div>
            ))}

            {artists.length === 0 && (
              <p
                className="text-center italic"
                style={{ color: theme.gray }}
              >
                {i18next.t("worldmap.no_artist", { ns: "translation" })}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
