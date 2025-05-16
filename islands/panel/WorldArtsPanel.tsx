import { AnimatePresence, motion } from "motion";
import { ArtRow } from "@utils/types.d.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";

import { ButtonCross } from "@components/Assets.tsx";

interface ArtPanelProps {
  readonly country: string;
  readonly artworks: ArtRow[];
  readonly onClose: () => void;
}

export function WorldArtsPanel({ country, artworks, onClose }: ArtPanelProps) {
  const draggable = false;
  const theme = colorScheme[currentColorScheme];

  return (
    <AnimatePresence>
      {!!country && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
          className="fixed bottom-0 right-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-h-[80vh] z-[999999] rounded-t-2xl shadow-lg overflow-y-auto custom-scrollbar"
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
                className="w-6 h-4 mr-2 object-cover"
                draggable={false}
              />
              <h2
                className="text-2xl font-bold"
                style={{ color: theme.dark }}
              >
                {i18next.t("worldmap.representations", { ns: "translation" })} — {country}
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

          {/* Grille des œuvres */}
          <div className="p-6 grid grid-cols-2 gap-4">
            {artworks.map((art) => (
              <motion.div
                key={art.id}
                className="rounded-lg overflow-hidden"
                style={{ border: `2px solid ${theme.dark}` }}
                whileHover={{
                  boxShadow: `0 4px 8px ${theme.lighterdark}`,
                  transition: { duration: 0.1 }
                }}
              >
                <a
                  href={`/art/${art.slug}?alone&id=${art.id}`}
                  target="_blank"
                  rel="noopener"
                  className="cursor-pointer block"
                  draggable={draggable}
                >
                  <img
                    src={art.url}
                    alt={art.name}
                    draggable={draggable}
                    className="w-full h-32 object-cover"
                  />
                </a>
                <div className="p-3 bg-white">
                  <h3
                    className="text-md font-semibold truncate"
                    style={{ color: theme.dark }}
                  >
                    {art.name}
                  </h3>
                </div>
              </motion.div>
            ))}

            {artworks.length === 0 && (
              <p
                className="col-span-2 text-center italic"
                style={{ color: theme.gray }}
              >
                {i18next.t("worldmap.no_artwork", { ns: "translation" })}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
