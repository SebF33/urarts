import i18next from "i18next";
import "@utils/i18n/config.ts";


export function ArrowPaperButton(
  props: {
    readonly direction: "left" | "right";
    readonly disabled?: boolean;
    readonly onClick?: () => void;
  },
) {
  const rotateClass = props.direction === "left" ? "-rotate-3" : "rotate-3";

  return (
    <button
      type="button"
      onClick={props.disabled ? undefined : props.onClick}
      disabled={props.disabled}
      class={`paper paper-shadow relative min-w-[56px] h-[72px] md:min-w-[72px] md:h-[92px] p-2 flex items-center justify-center ${rotateClass} ${
        props.disabled ? "invisible pointer-events-none" : "cursor-pointer"
      }`}
      aria-label={props.direction === "left"
        ? `${i18next.t("meta.previous_artwork", { ns: "translation" })}`
        : `${i18next.t("meta.next_artwork", { ns: "translation" })}`}
      aria-hidden={props.disabled ? "true" : "false"}
      tabIndex={props.disabled ? -1 : 0}
    >
      <div class="top-tape max-h-3"></div>

      <svg
        viewBox="0 0 64 64"
        class="w-9 h-9 md:w-11 md:h-11 text-lighterdark"
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
