import { ArtCollection } from "@utils/types.tsx";
import ky from "ky";
import { tw } from "@twind";
import { UrlBasePath } from "../../env.ts";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";

import ArtsLayout from "@islands/layout/ArtsLayout.tsx";

type Arts = Array<ArtCollection>;

export default function CollectionSearch(
  props: { font?: string; id?: string; myslug: string; type: string },
) {
  const [searchResults, setSearchResults] = useState<Arts[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTimeout(() => {
      ky.get(
        `${UrlBasePath}/api/collection?type=${props.type}&slug=${props.myslug}&name=${searchTerm}`,
      )
        .json<Arts[]>()
        .then((response) => {
          setSearchResults(response);
        });
    }, 150);
  }, [searchTerm]);

  useLayoutEffect(() => {
    setTimeout(() => {
      const target: HTMLElement | null = document.getElementById(`${props.id}`);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }, 600);
  }, [props.id]);

  return (
    <div class={tw`flex-grow font-brush`}>
      <div
        class={tw`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3`}
      >
        <h2 class={tw`text-lg font-medium mx-auto mb-1 w-48`}>
          Nom(s) :
        </h2>
        <div class={tw`brush-input-box relative w-48 mx-auto mb-4`}>
          <input
            type="text"
            value={searchTerm}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            onKeyUp={(e) => setSearchTerm(e.currentTarget.value)}
            class={tw`w-full rounded text-base outline-none py-1 px-3`}
          />
        </div>
      </div>
      <ArtsLayout
        arts={searchResults}
        font={props.font}
      />
    </div>
  );
}
