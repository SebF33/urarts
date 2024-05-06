import { useEffect, useState } from "preact/hooks";

import { UrartsPencilTip } from "@components/Assets.tsx";

export default function ToBottomButton() {
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(globalThis.scrollY < 50);
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
      >
        <UrartsPencilTip />
      </button>
    </>
  );
}
