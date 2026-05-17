import type { ArtCollection } from "@utils/types.d.ts";
import { DISCOVER_BANNER_ARTS } from "@utils/constants.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import ky from "ky";
import { shuffleArray } from "@utils/helpers.ts";
import { UrlBasePath } from "@/env.ts";
import { useMemo, useState } from "preact/hooks";

import DiscoverModal from "@islands/modal/DiscoverModal.tsx";


export function DiscoverPaper() {
  const [arts, setArts] = useState<ArtCollection[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const lng = i18next.language;

  // Ordre aléatoire des 8 images de la bannière
  const randomizedBannerArts = useMemo(
    () => shuffleArray(DISCOVER_BANNER_ARTS).slice(0, 8),
    [],
  );


  // Ouverture de la modal
  // et appel à l'API "Découverte de l'Art"
  const openDiscoverModal = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const apiUrl = `${UrlBasePath}/api/discover?lng=${lng}&limit=14`;
      const response = await ky.get(apiUrl).json<ArtCollection[]>();

      setArts(response);
      setIsOpen(true);
    } catch (error) {
      console.error("Discover API error:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <button
        type="button"
        onClick={openDiscoverModal}
        class="paper paper-shadow relative w-60 md:w-80 mx-10 md:mr-2 -rotate-[12deg] text-center cursor-pointer overflow-visible"
        aria-label={i18next.t("paper.discover", { ns: "translation" })}
      >
        <div class="p-3 text-[0.8rem] md:text-[0.9rem] leading-snug text-dark">
          <h1 class="font-bold text-base md:text-xl -mt-1 ml-10">
            Urarts.art
          </h1>
          <p>
            {isLoading
              ? i18next.t("common.loading", { ns: "translation" })
              : i18next.t("paper.discover", { ns: "translation" })}
          </p>
          {/* Bannière */}
          <div class="relative mt-1 z-20">
            <div class="discover-paper-art-banner" aria-hidden="true">
              <div class="discover-paper-art-track">
                {randomizedBannerArts.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt={src}
                    draggable={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div class="tape-section"></div>
      </button>

      {isOpen && arts.length > 0 && (
        <DiscoverModal
          arts={arts}
          startIndex={0}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
