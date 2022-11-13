import { css, tw } from "@twind";

export default function ErrorLayout(
  props: { firstDigit: string; secondDigit: string; thirdDigit: string },
) {
  return (
    <div class={tw`max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12`}>
      <div
        class={tw`grid gap-8 grid-cols-3 pt-10 pb-10 lg:pt-20 lg:pb-14`}
      >
        <div
          class={tw`${
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
            class={tw`${
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
              class={tw`group flex justify-center text-center relative overflow-hidden z-20 ${
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
                      "box-shadow": "0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset",
                    },
                  },
                )
              }`}
            >
              <img
                class={tw`w-full object-cover`}
                src={`/errors/${props.firstDigit}.jpg`}
                alt={props.firstDigit}
              />
            </div>
          </div>
        </div>

        <div
          class={tw`${
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
            class={tw`${
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
              class={tw`group flex justify-center text-center relative overflow-hidden z-20 ${
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
                      "box-shadow": "0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset",
                    },
                  },
                )
              }`}
            >
              <img
                class={tw`w-full object-cover`}
                src={`/errors/${props.secondDigit}.jpg`}
                alt={props.secondDigit}
              />
            </div>
          </div>
        </div>

        <div
          class={tw`${
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
            class={tw`${
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
              class={tw`group flex justify-center text-center relative overflow-hidden z-20 ${
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
                      "box-shadow": "0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset",
                    },
                  },
                )
              }`}
            >
              <img
                class={tw`w-full object-cover`}
                src={`/errors/${props.thirdDigit}.jpg`}
                alt={props.thirdDigit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
