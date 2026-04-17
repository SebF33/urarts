import i18next from "i18next";
import "@utils/i18n/config.ts";
import { usePageBackground } from "@utils/background.ts";


export default function ErrorLayout(props: {
  firstDigit: string;
  secondDigit: string;
  thirdDigit: string;
  msg: string;
}) {

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
  usePageBackground("error");


  // CSS
  const frame =
    "relative pb-[120%] bg-black shadow-[0_10px_7px_-5px_rgba(0,0,0,0.3)]";

  const inner =
    "absolute inset-[3.0303%_2.5%] bg-realwhite shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]";

  const content =
    "group flex justify-center text-center overflow-hidden z-20 absolute inset-[16.129%_13.158%]";

  const overlay =
    "after:content-[''] after:block after:absolute after:top-0 after:w-full after:h-full after:shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]";


  return (
    <>
      <div class="max-w-5xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
        <div class="grid gap-1 sm:gap-2 md:gap-3 lg:gap-4 grid-cols-3 pt-10 pb-10 lg:pt-20 lg:pb-14">
          {[props.firstDigit, props.secondDigit, props.thirdDigit].map((
            digit,
          ) => (
            <div class={frame}>
              <div class={inner}>
                <div class={`${content} ${overlay}`}>
                  <img
                    class="w-full object-cover"
                    src={`/errors/${digit}.jpg`}
                    alt={digit}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="paper paper-shadow relative max-w-[500px] mx-auto mb-6 text-lighterdark overflow-hidden sm:overflow-visible">
        <div class="top-tape"></div>
        <div class="w-full my-5 mx-1">
          <h2 class="text-center text-4xl font-bold">{title}</h2>
          <p class="text-center text-xl font-bold">{msg}</p>
        </div>
      </div>
    </>
  );
}
