import { ArtRow } from "@utils/types.tsx";
import ky from "ky";
import { tw } from "@twind";
import { UrlBasePath } from "../../env.ts";
import { useEffect, useState } from "preact/hooks";

export default function ArtsSearch() {
  const [searchResults, setSearchResults] = useState<ArtRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTimeout(() => {
      ky.get(`${UrlBasePath}/api/arts?name=${searchTerm}`)
        .json<ArtRow[]>()
        .then((response) => {
          setSearchResults(response);
        });
    }, 150);
  }, [searchTerm]);

  return (
    <main class={tw`flex-grow font-brush`}>
      <div class={tw`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <h1 class={tw`text-5xl font-medium mx-auto mb-2`}>
          Œuvres
        </h1>
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
        <div class={tw`flex flex-wrap`}>
          {searchResults &&
            (
              <ul class={tw`lg:w-1/3 sm:w-1/2 p-2`}>
                {searchResults.map((item, index) => (
                  <li class={tw`m-2`} key={index}>
                    <a
                      href={"/art/" + item.slug + "?id=" + item.id}
                      class={tw`cursor-pointer`}
                    >
                      <p class={tw`relative group text-xl`}>
                        <span>{item.name}</span>
                        <span class={tw`text-lg italic`}>
                          {" "}({item.last_name})
                        </span>
                        <span
                          class={tw`absolute -bottom-1 left-0 w-0 h-1 bg-blue transition-all group-hover:w-full`}
                        >
                        </span>
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            )}
        </div>
      </div>
    </main>
  );
}
