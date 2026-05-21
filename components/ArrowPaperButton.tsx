import i18next from "i18next";
import "@utils/i18n/config.ts";


export function ArrowPaperButton(
  props: {
    readonly direction: "left" | "right";
    readonly disabled?: boolean;
    readonly onClick?: () => void;
  },
) {

  // CSS
  const rotateClass = props.direction === "left" ? "-rotate-3" : "rotate-3";
  const tapeClass = props.direction === "left" ? "side-tape side-tape-left" : "side-tape side-tape-right";


  return (
    <button
      type="button"
      onClick={props.disabled ? undefined : props.onClick}
      disabled={props.disabled}
      class={`paper paper-shadow relative
        min-w-[42px] h-[54px]
        sm:min-w-[48px] sm:h-[62px]
        md:min-w-[58px] md:h-[76px]
        p-2 flex items-center justify-center ${rotateClass} ${
        props.disabled ? "invisible pointer-events-none" : "cursor-pointer"
      }`}
      aria-label={props.direction === "left"
        ? `${i18next.t("meta.previous_artwork", { ns: "translation" })}`
        : `${i18next.t("meta.next_artwork", { ns: "translation" })}`}
      aria-hidden={props.disabled ? "true" : "false"}
      tabIndex={props.disabled ? -1 : 0}
    >
      <div class={tapeClass}></div>
      <svg
        viewBox="0 0 64 64"
        class="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-lighterdark"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        {props.direction === "left"
          ? (
            <>
              <path
                d="M50 31C42 31, 34 31.5, 26 32.5C19 33.5, 14 34.5, 10 36"
                stroke-width="4.8"
              />
              <path
                d="M48 27.5C38 27.8, 29 28.8, 21 30.8"
                stroke-width="2.4"
                opacity="0.7"
              />
              <path
                d="M25 18C20 22, 15 27, 10 35"
                stroke-width="5"
              />
              <path
                d="M24 45C18 41, 14 38, 10 35"
                stroke-width="4.6"
              />
            </>
          )
          : (
            <>
              <path
                d="M14 31C22 31, 30 31.5, 38 32.5C45 33.5, 50 34.5, 54 36"
                stroke-width="4.8"
              />
              <path
                d="M16 27.5C26 27.8, 35 28.8, 43 30.8"
                stroke-width="2.4"
                opacity="0.7"
              />
              <path
                d="M39 18C44 22, 49 27, 54 35"
                stroke-width="5"
              />
              <path
                d="M40 45C46 41, 50 38, 54 35"
                stroke-width="4.6"
              />
            </>
          )}
      </svg>
    </button>
  );
}
