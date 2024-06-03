import { css } from "@twind/core";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { useLayoutEffect } from "preact/hooks";

export default function ErrorLayout(
  props: {
    firstDigit: string;
    secondDigit: string;
    thirdDigit: string;
    msg: string;
  },
) {
  let msg = "";
  let title = "";

  if (props.firstDigit + props.secondDigit + props.thirdDigit === "404") {
    msg = i18next.t("error.notfound.msg", { ns: "translation" }) + " " + props.msg;
    title = i18next.t("error.notfound.title", { ns: "translation" });
  }
  if (props.firstDigit === "5") {
    msg = i18next.t("error.server.msg", { ns: "translation" }) + " " + props.msg;
    title = i18next.t("error.server.title", { ns: "translation" });
  }

  // Background pour les pages d'erreur
  useLayoutEffect(() => {
    const body = document.querySelector("body");
    const main = document.querySelector<HTMLElement>('[data-name="error"]');

    if (body) {
      body.style.backgroundColor = colorScheme[currentColorScheme].gray;
    }

    if (main) {
      main.style.background = `url(/background/white)`;
      main.style.backgroundAttachment = "local";
      main.style.backgroundPosition = "center";
      main.style.backgroundSize = "3400px";
    }
  }, []);

  return (
    <>
      <div class={`max-w-5xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12`}>
        <div
          class={`grid gap-1 sm:gap-2 md:gap-3 lg:gap-4 grid-cols-3 pt-10 pb-10 lg:pt-20 lg:pb-14`}
        >
          <div
            class={`${
              css(
                {
                  "position": "relative",
                  "padding-bottom": "120%",
                  "background": "black",
                  "box-shadow": "0 10px 7px -5px rgba(0, 0, 0, 0.3)",
                },
              )
            }`}
          >
            <div
              class={`${
                css(
                  {
                    "position": "absolute",
                    "background": "white",
                    "top": "3.0303%",
                    "bottom": "3.0303%",
                    "left": "2.5%",
                    "right": "2.5%",
                    "box-shadow": "0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset",
                  },
                )
              }`}
            >
              <div
                class={`group flex justify-center text-center relative overflow-hidden z-20 ${
                  css(
                    {
                      "position": "absolute",
                      "top": "16.129%",
                      "bottom": "16.129%",
                      "left": "13.158%",
                      "right": "13.158%",
                      "&::after": {
                        content: "",
                        "display": "block",
                        "position": "absolute",
                        "top": "0",
                        "width": "100%",
                        "height": "100%",
                        "box-shadow":
                          "0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset",
                      },
                    },
                  )
                }`}
              >
                <img
                  class={`w-full object-cover`}
                  src={`/errors/${props.firstDigit}.jpg`}
                  alt={props.firstDigit}
                />
              </div>
            </div>
          </div>

          <div
            class={`${
              css(
                {
                  "position": "relative",
                  "padding-bottom": "120%",
                  "background": "black",
                  "box-shadow": "0 10px 7px -5px rgba(0, 0, 0, 0.3)",
                },
              )
            }`}
          >
            <div
              class={`${
                css(
                  {
                    "position": "absolute",
                    "background": "white",
                    "top": "3.0303%",
                    "bottom": "3.0303%",
                    "left": "2.5%",
                    "right": "2.5%",
                    "box-shadow": "0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset",
                  },
                )
              }`}
            >
              <div
                class={`group flex justify-center text-center relative overflow-hidden z-20 ${
                  css(
                    {
                      "position": "absolute",
                      "top": "16.129%",
                      "bottom": "16.129%",
                      "left": "13.158%",
                      "right": "13.158%",
                      "&::after": {
                        content: "",
                        "display": "block",
                        "position": "absolute",
                        "top": "0",
                        "width": "100%",
                        "height": "100%",
                        "box-shadow":
                          "0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset",
                      },
                    },
                  )
                }`}
              >
                <img
                  class={`w-full object-cover`}
                  src={`/errors/${props.secondDigit}.jpg`}
                  alt={props.secondDigit}
                />
              </div>
            </div>
          </div>

          <div
            class={`${
              css(
                {
                  "position": "relative",
                  "padding-bottom": "120%",
                  "background": "black",
                  "box-shadow": "0 10px 7px -5px rgba(0, 0, 0, 0.3)",
                },
              )
            }`}
          >
            <div
              class={`${
                css(
                  {
                    "position": "absolute",
                    "background": "white",
                    "top": "3.0303%",
                    "bottom": "3.0303%",
                    "left": "2.5%",
                    "right": "2.5%",
                    "box-shadow": "0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset",
                  },
                )
              }`}
            >
              <div
                class={`group flex justify-center text-center relative overflow-hidden z-20 ${
                  css(
                    {
                      "position": "absolute",
                      "top": "16.129%",
                      "bottom": "16.129%",
                      "left": "13.158%",
                      "right": "13.158%",
                      "&::after": {
                        content: "",
                        "display": "block",
                        "position": "absolute",
                        "top": "0",
                        "width": "100%",
                        "height": "100%",
                        "box-shadow":
                          "0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset",
                      },
                    },
                  )
                }`}
              >
                <img
                  class={`w-full object-cover`}
                  src={`/errors/${props.thirdDigit}.jpg`}
                  alt={props.thirdDigit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="paper max-w-[500px] mx-auto mb-6 text-lighterdark overflow-hidden sm:overflow-visible">
        <div class="top-tape"></div>
        <div class="w-full my-5 mx-1">
          <h2 class="text-center text-4xl font-bold">{title}</h2>
          <p class="text-center text-xl font-bold">{msg}</p>
        </div>
      </div>
    </>
  );
}
