import { PLACEHOLDERS_BY_TYPE } from "@utils/constants.ts";
import { useEffect, useState } from "preact/hooks";


export function SearchInput(
  props: {
    readonly type: string;
    readonly value: string;
    readonly onInput: (e: Event) => void;
  },
) {
  const placeholders = PLACEHOLDERS_BY_TYPE[props.type] ?? ["Recherche..."];

  const [displayText, setDisplayText] = useState("");
  const [targetText, setTargetText] = useState("");

  useEffect(() => {
    // aléatoire au départ
    const pickRandom = () => {
      let next = placeholders[Math.floor(Math.random() * placeholders.length)];
      while (next === targetText) {
        next = placeholders[Math.floor(Math.random() * placeholders.length)];
      }
      return next;
    };

    let currentIndex = 0;
    let typingInterval: number | undefined;
    let pauseTimeout: number | undefined;

    const startTyping = (text: string) => {
      setDisplayText("");
      currentIndex = 0;

      typingInterval = setInterval(() => {
        currentIndex++;
        setDisplayText(text.slice(0, currentIndex));

        if (currentIndex >= text.length) {
          clearInterval(typingInterval);
          // attendre avant de changer de placeholder
          pauseTimeout = setTimeout(() => {
            const newText = pickRandom();
            setTargetText(newText);
            startTyping(newText);
          }, 3000);
        }
      }, 80 + Math.random() * 40);
    };

    // démarrage initial
    const initialText = pickRandom();
    setTargetText(initialText);
    startTyping(initialText);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(pauseTimeout);
    };
  }, []);


  return (
    <div class="relative w-full">
      <input
        type="text"
        value={props.value}
        onInput={(e: Event) => {
          const maxLength = 12;
          const input = e.target as HTMLInputElement;
          if (input.value.length <= maxLength) {
            props.onInput(e);
          } else {
            input.value = input.value.slice(0, maxLength);
          }
        }}
        maxlength={12}
        placeholder={displayText}
        class="w-full rounded text-lg outline-none py-0.5 px-3 placeholder-gray-400 transition-all duration-300 focus:placeholder-gray-300"
      />
    </div>
  );
}
