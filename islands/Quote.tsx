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
      class={tw`mx-auto ${
        css(
          {
            "color": `${colorScheme[currentColorScheme].lighterdark}`,
          },
        )
      }`}
    >
      <p
        id="Quote"
        class={tw`text-center text-xl font-bold w-5/6 md:w-1/2 mx-auto`}
      >
        “{props.data.quote}”<br></br>—{props.data.first_name}{" "}
        {props.data.last_name}
      </p>
      {props.data.signature &&
        (
          <div
            class={tw`flex justify-end w-5/6 md:w-1/3 max-h-9 mx-auto`}
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
  );
}
