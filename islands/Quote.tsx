import { ArtistQuote } from "@utils/types.tsx";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { css } from "twind/css";
import { tw } from "twind";
import tippy from "tippyjs";
import { UrlBasePath } from "../env.ts";
import { useEffect } from "preact/hooks";

type Quote = Array<ArtistQuote>;

export default function Quote(
  props: { data: Quote },
) {
  const draggable = false;

  useEffect(() => {
    const artistQuote = document.querySelector("#Quote");
    if (artistQuote) {
      tippy(artistQuote, {
        allowHTML: true,
        content:
          `<a href="${UrlBasePath}/art/${props.data.slug}" draggable="${draggable}">
          <img src="${props.data.avatar_url}" alt="${props.data.last_name}" style="max-width:90px" draggable="${draggable}"/>
          </a>`,
        interactive: true,
        placement: "top",
        theme: "urarts",
      });
    }
  }, []);

  return (
    <div
      id="Quote"
      class={tw`paper max-w-[900px] mx-auto -mt-4 mb-6 overflow-hidden ${
        css(
          {
            "color": `${colorScheme[currentColorScheme].lighterdark}`,
          },
        )
      }`}
    >
      <div class="top-tape"></div>
      <div
        class={tw`w-full mt-4 mx-1`}
      >
        <p
          class={tw`text-center text-xl font-bold mx-auto`}
        >
          “{props.data.quote}”<br></br>—{props.data.first_name}{" "}
          {props.data.last_name}
        </p>
        {props.data.signature &&
          (
            <div
              class={tw`flex justify-end md:w-9/12 max-h-9 mt-3 lg:-mt-3 mr-4 mb-3`}
            >
              <img
                class={tw`max-w-[100px]`}
                src={props.data.signature}
                alt={props.data.signature}
                draggable={draggable}
              />
            </div>
          )}
      </div>
    </div>
  );
}
