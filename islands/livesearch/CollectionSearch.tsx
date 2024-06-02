import { ArtCollection } from "@utils/types.d.ts";
import { DELAY_API_CALL, DELAY_DEBOUNCE, DELAY_LEONARDO_REACH_ART, DELAY_REACH_ART } from "@utils/constants.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import ky from "ky";
import { UrlBasePath } from "../../env.ts";
import { useDebounce } from "@utils/hooks/useDebounce.ts";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";

import ArtsLayout from "@islands/layout/ArtsLayout.tsx";
import { SearchInput } from "@components/SearchInput.tsx";

type Arts = Array<ArtCollection>;
export interface Props {
  font?: string;
  query?: object;
  myslug: string;
  type: string;
}

export default function CollectionSearch(props: Props) {
  const [searchResults, setSearchResults] = useState<Arts[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedValue = useDebounce<string>(searchTerm, DELAY_DEBOUNCE);

  // Appel à l'API
  useEffect(() => {
    let apiUrl;
    if (props.query?.alone) apiUrl = `${UrlBasePath}/api/collection?type=${props.type}&slug=${props.myslug}&alone&id=${props.query.id}`;
    else apiUrl = `${UrlBasePath}/api/collection?type=${props.type}&slug=${props.myslug}&name=${debouncedValue}`;

    setTimeout(() => {
      ky.get(apiUrl)
        .json<Arts[]>()
        .then((response) => {
          setSearchResults(response);
        });
    }, DELAY_API_CALL);
  }, [debouncedValue]);

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

    {!props.query?.alone &&
      (
        <div class={`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3`}>
          <div class="paper max-w-[64px] min-w-[64px] mx-auto mb-2 -translate-x-16">
          <div class="top-tape max-h-2.5"></div>
            <h2 class={`text-lg font-medium text-lighterdark`}>
              {i18next.t("paper.name", { ns: "translation" })}
            </h2>
          </div>

          <div class={`brush-input-box relative w-48 max-h-[68px] mx-auto mb-4`}>
            <SearchInput value={searchTerm} onInput={(e) => setSearchTerm((e.currentTarget as HTMLInputElement).value)} />
          </div>
        </div>
      )}

      <ArtsLayout
        arts={searchResults}
        font={props.font}
      />
    </div>
  );
}
