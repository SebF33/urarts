import { ArtCollection } from "@utils/types.tsx";
import { DELAY_API_CALL, DELAY_LEONARDO_REACH_ART, DELAY_REACH_ART } from "@utils/constants.ts";
import ky from "ky";
import { UrlBasePath } from "../../env.ts";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";

import ArtsLayout from "@islands/layout/ArtsLayout.tsx";
import { SearchInput } from "@components/SearchInput.tsx";

type Arts = Array<ArtCollection>;

export default function CollectionSearch(
  props: { font?: string; query?: object; myslug: string; type: string },
) {
  const [searchResults, setSearchResults] = useState<Arts[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Appel à l'API
  useEffect(() => {
    setTimeout(() => {
      ky.get(
        `${UrlBasePath}/api/collection?type=${props.type}&slug=${props.myslug}&name=${searchTerm}`,
      )
        .json<Arts[]>()
        .then((response) => {
          setSearchResults(response);
        });
    }, DELAY_API_CALL);
  }, [searchTerm]);

  // Atteindre l'œuvre
  useLayoutEffect(() => {
    let delay;
    props.query?.fromLeonardo ? delay = DELAY_LEONARDO_REACH_ART : delay = DELAY_REACH_ART;

    if (props.query?.id !== "") {
      setTimeout(() => {
        const target: HTMLElement | null = document.getElementById(`${props.query?.id}`);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }, delay);
    }
  }, [props.query]);

  return (
    <div class={`flex-grow`}>
      <div
        class={`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3`}
      >
        <h2 class={`text-lg font-medium text-lighterdark mx-auto mb-1 w-48`}>
          Nom(s) :
        </h2>

        <div class={`brush-input-box relative w-48 max-h-[68px] mx-auto mb-4`}>
          <SearchInput value={searchTerm} onInput={(e) => setSearchTerm((e.currentTarget as HTMLInputElement).value)} />
        </div>
      </div>

      <ArtsLayout
        arts={searchResults}
        font={props.font}
      />
    </div>
  );
}
