import i18next from "i18next";
import "@utils/i18n/config.ts";
import { useEffect, useState } from "preact/hooks";

import { UrartsTrimBrush } from "@components/Assets.tsx";


export default function ToTopButton() {
  const [showButton, setShowButton] = useState<boolean>(false);


  useEffect(() => {
    const handleScroll = () => {
      const globalScrolled = globalThis.scrollY > 100;
      const scrollableElement = document.querySelector<HTMLElement>(".scrollable");
      const elementScrolled = scrollableElement
        ? scrollableElement.scrollTop > 36
        : false;

      setShowButton(globalScrolled || elementScrolled);
    };

    globalThis.addEventListener("scroll", handleScroll);

    const scrollableElement = document.querySelector<HTMLElement>(".scrollable");
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);


  const scrollToTop = () => {
    globalThis.scrollTo({ top: 0, behavior: "smooth" });
    
    const target: HTMLElement | null = document.querySelector('.scrollable');
    if (target) {
      target.scrollTo({ top: 0, behavior: "smooth" });
    }
  };


  return (
    <>
      <button
        onClick={scrollToTop}
        class={`fixed right-2 bottom-2 md:right-4 md:bottom-4 flex items-center justify-center p-2 bg-red text-white border-none rounded-full shadow-md cursor-pointer z-[9999] ${
          showButton ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300 ease-in-out`}
        aria-label={`${i18next.t("meta.scroll_to_top", { ns: "translation" })}`}
      >
        <span class="sr-only">${i18next.t("meta.scroll_to_top", { ns: "translation" })}</span>
        <UrartsTrimBrush aria-hidden="true" />
      </button>
    </>
  );
}
