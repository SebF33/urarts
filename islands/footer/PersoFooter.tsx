import { css } from "@twind/core";
import { DELAY_DISPLAY_FOOTER } from "@utils/constants.ts";
import { useEffect, useState } from "preact/hooks";


type PersoFooterProps = {
  artist: string;
  birthyear: string;
  color: string;
  facebook?: string;
  instagram?: string;
};


export default function PersoFooter(
  { artist, birthyear, color, facebook, instagram }: PersoFooterProps,
) {
  const [display, setDisplay] = useState<boolean>(false);

  // Délai d'affichage initial
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDisplay(true);
    }, DELAY_DISPLAY_FOOTER);
    return () => clearTimeout(timeoutId);
  }, []);


  return (
    <>
      {display && (
        <footer
          class={`relative bottom-0 w-full text-white z-50 ${
            css({
              "background-color": `${color}`,
            })
          }`}
        >
          <div
            class={`max-w-7xl mx-auto py-7 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8`}
          >
            <div class={`flex justify-center space-x-8 md:order-2`}>
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer me"
                  class={`hover:opacity-80 mt-[2px]`}
                  aria-label="Facebook"
                >
                  <span class={`sr-only`}>Facebook</span>
                  <svg
                    class={`h-5 w-5`}
                    viewBox="0 0 24 24"
                    role="img"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M22.675 0h-21.35C.596 0 0 .597 0 1.333v21.333C0 23.403.596 24 1.325 24h11.495v-9.294H9.691V11.01h3.129V8.41c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.098 2.794.142v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.312h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.667V1.333C24 .597 23.403 0 22.675 0z"
                    />
                  </svg>
                </a>
              )}

              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer me"
                  class={`hover:opacity-80`}
                  aria-label="Instagram"
                >
                  <span class={`sr-only`}>Instagram</span>
                  <svg
                    class={`h-6 w-6`}
                    viewBox="0 0 24 24"
                    role="img"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M7.75 2h8.5C19.55 2 22 4.46 22 7.75v8.5C22 19.55 19.54 22 16.25 22h-8.5C4.45 22 2 19.54 2 16.25v-8.5C2 4.45 4.46 2 7.75 2zm0 1.5C5.68 3.5 3.5 5.68 3.5 7.75v8.5c0 2.07 2.18 4.25 4.25 4.25h8.5c2.07 0 4.25-2.18 4.25-4.25v-8.5c0-2.07-2.18-4.25-4.25-4.25h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.88a1.12 1.12 0 1 1-2.25 0 1.12 1.12 0 0 1 2.25 0z"
                    />
                  </svg>
                </a>
              )}
            </div>

            <div class={`mt-8 md:mt-0 md:order-1`}>
              <p className="text-center text-lg md:text-xl font-bold">
                © {birthyear}–{new Date().getFullYear()} {artist}
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
