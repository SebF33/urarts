import { Any } from "any";
import { ArtistQuote } from "@utils/types.d.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { DELAY_TOOLTIP_TRIGGER } from "@utils/constants.ts";
import tippy from "tippyjs";
import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";

type Quote = Array<ArtistQuote>;


export default function Quote(
  props: { readonly data: Quote; readonly delay: number },
) {
  const [display, setDisplay] = useState<boolean>(false);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [tippyInstances, setTippyInstances] = useState<Any[]>([]);

  const draggable = false;


  // Délai d'affichage initial
  useEffect(() => {
    const timeoutId = setTimeout(() => { setDisplay(true); }, props.delay);
    return () => clearTimeout(timeoutId);
  }, []);


  // Animation
  useEffect(() => {
    if (display && quoteRef.current) {
      quoteRef.current.classList.add("show");
    }
  }, [display]);


  // Infobulle
  useEffect(() => {
    tippyInstances.forEach((instance) => { instance.destroy(); });
    setTippyInstances([]);

    const artistQuoteElement: HTMLElement | null = document.querySelector(`[data-quote-id="${props.data.id}"]`);

    if (artistQuoteElement) {
      tippy(artistQuoteElement, {
        allowHTML: true,
        content:
          `<a data-anchor-id=${props.data.id} href="/art/${props.data.slug}" draggable="${draggable}">
          <img src="${props.data.avatar_url}" alt="${props.data.last_name}" style="max-width:90px" draggable="${draggable}"/>
          </a>`,
        delay: DELAY_TOOLTIP_TRIGGER,
        interactive: true,
        placement: "top",
        popperOptions: { strategy: "fixed", modifiers: [{ name: 'flip', enabled: false }] },
        theme: "urarts",
        onCreate(instance: Any) {
          setTippyInstances((prevInstances) => [...prevInstances, instance]);
          const anchor = instance.popper.querySelector(`[data-anchor-id="${props.data.id}"]`) as HTMLElement;
          anchor.addEventListener("click", (_event: MouseEvent) => {
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
  }, [display, props.data.id]);


  // Background pour la page d'accueil
  useLayoutEffect(() => {
    const body = document.querySelector("body");
    const main = document.querySelector<HTMLElement>('[data-name="home"]');

    if (body) {
      body.style.backgroundColor = colorScheme[currentColorScheme].white;
    }

    if (main) {
      main.style.background = `url(/background/gray)`;
      main.style.backgroundAttachment = "local";
      main.style.backgroundPosition = "center";
      main.style.backgroundSize = "466px";
    }
  }, []);

  
  return (
    <>
      {display && (
        <div
          ref={quoteRef}
          data-quote-id={props.data.id}
          class={`paper paper-shadow w-full max-w-[700px] mx-auto text-lighterdark overflow-hidden sm:overflow-visible appear-effect-y-14px transition-all duration-500 ease-in-out`}
        >
          <div class="top-tape"></div>
          <div
            class={`w-full mt-4 mx-1`}
          >
            <p
              class={`text-center text-xl font-bold leading-6 mx-auto`}
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
      )}
    </>
  );
}
