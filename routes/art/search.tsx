import { tw } from "@twind";
import { useEffect, useState } from "preact/hooks";
// import { Art } from "@utils/types.tsx";
import ky, { KyResponse } from "ky";

import Footer from "@islands/Footer.tsx";
import Header from "@islands/Header.tsx";

type Art = {
  name: string;
};

export default function LiveSearch() {
  const [art, setData] = useState<Art[]>([]);
  const [query, setQuery] = useState("");

  // const queryurl = "?name=${query}";

  useEffect(() => {
    (async () => {
      const parsed = await ky.get(
        "http://localhost:8000/api/arts",
      )
        .then((response: KyResponse) => {
          return response.json();
        });
      setData(parsed as []);
    })();
  }, [query]);

  return (
    <div class={tw`flex flex-col min-h-screen`}>
      <Header />
      <main class={tw`flex-grow`}>
        <div class={tw`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
          <h2 class={tw`text-gray-900 text-lg mb-1 font-medium title-font`}>
            Chercher par le nom
          </h2>
          <div class={tw`relative mb-4`}>
            <input
              type="text"
              value={query}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              onChange={(e) => setQuery(e.currentTarget.value)}
              class={tw`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
            />
          </div>
          <div class={tw`flex flex-wrap`}>
            <ul class={tw`lg:w-1/3 sm:w-1/2 p-2`}>
              {art.map((art) => (
                <li class={tw`text-lg text-gray-700`} key={art}>
                  {art.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
