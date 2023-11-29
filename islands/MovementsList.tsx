import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { MovementRow } from "@utils/types.tsx";
import { useLayoutEffect } from "preact/hooks";

type Movements = Array<MovementRow>;

export default function MovementsList(
  props: { movements: Movements },
) {
  // Background pour la page des mouvements
  useLayoutEffect(() => {
    const body = document.querySelector("body");

    if (body) {
      body.style.background = `url(/background/gray)`;
      body.style.backgroundColor = colorScheme[currentColorScheme].white;
      body.style.backgroundPosition = "center";
      body.style.backgroundSize = "3700px";
    }
  }, []);

  return (
    <div class={`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
      <div
        class={`paper max-w-[230px] mt-5 mb-6`}
      >
        <div class="top-tape"></div>
        <h1 class={`text-5xl font-medium mx-auto`}>
          Mouvements
        </h1>
      </div>

      <div class={`flex flex-wrap`}>
        {props.movements &&
          (
            <ul class={`text-lighterdark lg:w-1/3 sm:w-1/2 p-2`}>
              {props.movements.map((item, index) => (
                <li class={`m-2`} key={index}>
                  <a
                    href={"/movement/" + item.slug}
                    class={`cursor-pointer`}
                  >
                    <p class={`relative group text-xl`}>
                      <span>{item.name}</span>
                      <span class={`text-lg italic`}>
                        {" "}({item.art_count}{" "}
                        œuvre{item.art_count === "1" ? "" : "s"})
                      </span>
                      <span
                        class={`absolute -bottom-1 left-0 w-0 h-1 bg-cyan transition-all group-hover:w-full`}
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
  );
}
