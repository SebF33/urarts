import { ArtRow } from "@utils/types.tsx";
import ky from "ky";
import { tw } from "@twind";
import { useEffect, useState } from "preact/hooks";

export default function LiveSearch() {
  const [searchResults, setSearchResults] = useState<ArtRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    ky.get(`http://localhost:8000/api/arts?name=${searchTerm}`)
      .json<ArtRow[]>()
      .then((response) => {
        setSearchResults(response);
      });
  }, [searchTerm]);

  return (
    <main class={tw`flex-grow font-brush`}>
      <div class={tw`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <h2 class={tw`text-lg font-medium mx-auto mb-1 w-48`}>
          Œuvre(s) d'art :
        </h2>
        <div class={tw`relative mx-auto mb-4 w-48`}>
          <input
            type="text"
            value={searchTerm}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            onKeyUp={(e) => setSearchTerm(e.currentTarget.value)}
            class={tw`w-full rounded border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
          />
        </div>
        <div class={tw`flex flex-wrap`}>
          {searchResults &&
            (
              <ul class={tw`lg:w-1/3 sm:w-1/2 p-2`}>
                {searchResults.map((item, index) => (
                  <a
                    href={"/art/" + item.slug + "#" + item.id}
                    class={tw`cursor-pointer`}
                  >
                    <li class={tw`text-lg`} key={index}>
                      {item.name}
                    </li>
                  </a>
                ))}
              </ul>
            )}
        </div>
      </div>
    </main>
  );
}
