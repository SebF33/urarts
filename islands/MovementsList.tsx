import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { DELAY_REACH_HREF } from "@utils/constants.ts";
import { h } from "preact";
import i18next from "i18next";
import "../utils/i18n/config.ts";
import { MovementRow } from "@utils/types.d.ts";
import { useLayoutEffect } from "preact/hooks";

type Movements = Array<MovementRow>;

export default function MovementsList(
  props: { movements: Movements },
) {
  // Background pour la page des mouvements
  useLayoutEffect(() => {
    const body = document.querySelector("body");
    const main = document.querySelector<HTMLElement>('[data-name="movements"]');

    if (body) {
      body.style.backgroundColor = colorScheme[currentColorScheme].white;
    }

    if (main) {
      main.style.background = `url(/background/gray)`;
      main.style.backgroundAttachment = "local";
      main.style.backgroundPosition = "center";
      main.style.backgroundSize = "3700px";
    }
  }, []);

  function handleClick(event: h.JSX.TargetedMouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const href = (event.currentTarget as HTMLAnchorElement).href;
    setTimeout(() => {
      window.location.href = href;
    }, DELAY_REACH_HREF);
  }

  return (
    <div class={`p-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
      <div
        class={`paper min-h-[60px] max-w-[230px] mt-5 mb-6`}
      >
        <div class="top-tape"></div>
        <h1 class={`text-5xl font-medium mx-auto`}>
          {i18next.t("title.movements", { ns: "translation" })}
        </h1>
      </div>

      <div class={`flex flex-wrap`}>
        {props.movements &&
          (
            <ul class={`text-lighterdark lg:w-1/3 sm:w-1/2 p-2`}>
              {props.movements.map((item, index) => (
                <li class={`mx-2 my-4`} key={index}>
                  <a
                    href={"/movement/" + item.slug}
                    onClick={handleClick}
                    class={`cursor-pointer`}
                  >
                    <p class={`relative group text-xl leading-none`}>
                      <span>{item.name}</span>
                      <span class={`italic text-[1.05rem]`}>
                        {" "}({item.art_count}{" "}
                        œuvre{item.art_count === "1" ? "" : "s"})
                      </span>
                      <span
                        class={`absolute -bottom-2 left-0 w-0 h-1 bg-cyan transition-all group-hover:w-full`}
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
