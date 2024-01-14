import { Any } from "any";
import { ArtistQuote } from "@utils/types.tsx";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import tippy from "tippyjs";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";

type Quote = Array<ArtistQuote>;

export default function Quote(
  props: { data: Quote },
) {
  const [tippyInstances, setTippyInstances] = useState<Any[]>([]);

  const draggable = false;

  useEffect(() => {
    tippyInstances.forEach((instance) => {
      instance.destroy();
    });
    setTippyInstances([]);

    const artistQuote = document.querySelector(
      `[data-quote-id="${props.data.id}"]`,
    );

    if (artistQuote) {
      tippy(artistQuote, {
        allowHTML: true,
        content:
          `<a data-anchor-id=${props.data.id} href="/art/${props.data.slug}" draggable="${draggable}">
          <img src="${props.data.avatar_url}" alt="${props.data.last_name}" style="max-width:90px" draggable="${draggable}"/>
          </a>`,
        interactive: true,
        placement: "top",
        theme: "urarts",
        onCreate(instance: Any) {
          setTippyInstances((prevInstances) => [...prevInstances, instance]);
          const anchor = instance.popper.querySelector(
            `[data-anchor-id="${props.data.id}"]`,
          );
          anchor.addEventListener("click", (event) => {
            instance.destroy();
          });
        },
        onDestroy(instance: Any) {
          setTippyInstances((prevInstances) =>
            prevInstances.filter((i) => i !== instance)
          );
        },
      });
    }
  }, [props.data.id]);

  // Background pour la page d'accueil
  useLayoutEffect(() => {
    const body = document.querySelector("body");

    if (body) {
      body.style.background = `url(/background/gray)`;
      body.style.backgroundColor = colorScheme[currentColorScheme].white;
      body.style.backgroundPosition = "center";
      body.style.backgroundSize = "420px";
    }
  }, []);

  return (
    <div
      data-quote-id={props.data.id}
      class={`paper w-full max-w-[700px] mx-auto text-lighterdark overflow-hidden sm:overflow-visible`}
    >
      <div class="top-tape"></div>
      <div
        class={`w-full mt-4 mx-1`}
      >
        <p
          class={`text-center text-xl font-bold mx-auto`}
        >
          “{props.data.quote}”<br></br>—{props.data.first_name}{" "}
          {props.data.last_name}
        </p>
        {props.data.signature &&
          (
            <div
              class={`flex justify-end md:w-5/6 max-h-9 mt-3 lg:-mt-3 mr-4 mb-3`}
            >
              <img
                class={`max-w-[100px]`}
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
