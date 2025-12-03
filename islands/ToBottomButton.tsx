import i18next from "i18next";
import "@utils/i18n/config.ts";
import { useEffect, useState } from "preact/hooks";

import { UrartsPencilTip } from "@components/Assets.tsx";


export default function ToBottomButton() {
  const [showButton, setShowButton] = useState<boolean>(true);

  
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(globalThis.scrollY < 100);
    };

    globalThis.addEventListener("scroll", handleScroll);
    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const scrollToBottom = () => {
    globalThis.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };


  return (
    <>
      <button
        onClick={scrollToBottom}
        class={`fixed left-2 bottom-2 md:left-4 md:bottom-4 flex items-center justify-center p-2 bg-cyan text-white border-none rounded-full shadow-md cursor-pointer z-[9999] ${
          showButton ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300 ease-in-out`}
        aria-label={`${i18next.t("meta.scroll_to_bottom", { ns: "translation" })}`}
      >
        <span class="sr-only">${i18next.t("meta.scroll_to_bottom", { ns: "translation" })}</span>
        <UrartsPencilTip aria-hidden="true" />
      </button>
    </>
  );
}
