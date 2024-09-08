import i18next from "i18next";
import "@utils/i18n/config.ts";
import tippy from "tippyjs";
import { useEffect } from "preact/hooks";

export default function Avatar(
  props: { copyright: number; info: string; name: string; url: string },
) {
  const draggable = false;

  // Infobulle
  useEffect(() => {
    const avatar = document.querySelector("#Avatar");
    let copyright;

    if (avatar) {
      copyright = props.copyright === 0
        ? '<s style="font-size:1.3em">©</s> ' + i18next.t("arts.public_domain", { ns: "translation" })
        : '<span style="font-size:1.3em">©</span> ' + props.name;

      tippy(avatar, {
        allowHTML: true,
        content: `<p style="margin-top:4px;line-height:1.1">${props.info}</p>
                  <p style="margin-top:2px;font-size:1.2em;line-height:1;text-align:end">${copyright}</p>`,
        interactive: true,
        offset: [0, 10],
        placement: "bottom",
        theme: "urarts",
      });
    }
  }, []);

  return (
    <div
      id="Avatar"
      class={`relative p-6 w-60 mx-auto text-center bg-lighterdark rounded-b-xl overflow-hidden shadow-2xl`}
    >
      <img
        src={props.url}
        alt={props.name}
        draggable={draggable}
      />
    </div>
  );
}
