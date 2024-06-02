import i18next from "i18next";
import "@utils/i18n/config.ts";

export default function Note() {
  const draggable = false;

  return (
    <div class="paper max-w-[700px] mx-auto mt-12 md:mt-2 mb-2">
      <div class="tape-section"></div>
      <div class="flex flex-col m-4 font-medium">
        <div
          dangerouslySetInnerHTML={{
            __html: i18next.t("about.msg", { ns: "translation" }),
          }}
        />
        <a
          href="https://fresh.deno.dev"
          class="inline-block ml-auto z-10"
          draggable={draggable}
          target="_blank"
        >
          <img
            class="w-32"
            src="/deno-plush.svg"
            alt="deno-plush"
            draggable={draggable}
          />
        </a>
      </div>
      <div class="tape-section"></div>
    </div>
  );
}
