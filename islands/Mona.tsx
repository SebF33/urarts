import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { useEffect, useLayoutEffect } from "preact/hooks";

export default function Mona() {
  useEffect(() => {
    // Yeux Mona Lisa
    const monaPage = document.querySelector<HTMLElement>(".mona-page");
    const monaLeftEyeball = document.querySelector<HTMLElement>(".mona-left-eyeball");
    const monaRightEyeball = document.querySelector<HTMLElement>(".mona-right-eyeball");

    if (monaPage) {
      monaPage.onmousemove = (event: MouseEvent) => {
        if (monaLeftEyeball) {
          const x = Math.min(70, Math.max(20, (event.pageX * 100) / window.innerWidth)) + "%";
          const y = Math.min(80, (event.pageY * 100) / window.innerHeight) + "%";
          monaLeftEyeball.style.left = x;
          monaLeftEyeball.style.top = y;
        }
        if (monaRightEyeball) {
          const x = Math.min(70, Math.max(20, (event.pageX * 100) / window.innerWidth)) + "%";
          const y = Math.min(80, (event.pageY * 100) / window.innerHeight) + "%";
          monaRightEyeball.style.left = x;
          monaRightEyeball.style.top = y;
        }
    }
    };
  }, []);

  // Background pour la page à propos
  useLayoutEffect(() => {
    const body = document.querySelector("body");
    const main = document.querySelector<HTMLElement>('[data-name="about"]');

    if (body) {
      body.style.backgroundColor = colorScheme[currentColorScheme].gray;
    }

    if (main) {
      main.style.background = `url(/background/white)`;
      main.style.backgroundAttachment = "local";
      main.style.backgroundPosition = "center";
      main.style.backgroundSize = "2400px";
    }
  }, []);

  return (
    <div class="flex flex-col md:flex-row mx-auto">
      <div class="art-wrap-1 hidden md:flex">
        <div class="art-frame art-frame-type-2 art-polyptych-1">
          <img
            class="max-w-full min-w-[449px]"
            src="/monalisa.jpg"
            alt="Mona Lisa"
          />
          <div class="absolute top-[7.2rem] left-[8.2rem]">
            <div class="mona-eye mona-left-eye">
              <div class="mona-eyeball mona-left-eyeball"></div>
            </div>
          </div>
          <div class="absolute top-[7.2rem] right-[11.15rem]">
            <div class="mona-eye mona-right-eye">
              <div class="mona-eyeball mona-right-eyeball"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="art-wrap-1 flex md:hidden">
        <div class="art-frame art-frame-type-2 art-polyptych-1">
          <img
            class="max-w-[200px]"
            src="arts/devinci/La Joconde.jpg"
            alt="Mona Lisa"
          />
        </div>
      </div>
    </div>
  );
}
