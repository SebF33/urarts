import { Any } from "any";
import { ArtCollection } from "@utils/types.tsx";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import tippy from "tippyjs";
import { useEffect, useState } from "preact/hooks";

type Arts = Array<ArtCollection>;
interface ArtsLayoutProps {
  arts: Arts;
  font?: string;
  type?: string;
}

export default function ArtsLayout(
  props: ArtsLayoutProps,
) {
  const [tippyInstances, setTippyInstances] = useState<Any[]>([]);

  const draggable = false;

  useEffect(() => {
    tippyInstances.forEach((instance) => {
      instance.destroy();
    });
    setTippyInstances([]);

    props.arts.forEach((p) => {
      let content;
      let copyright;
      const el = document.querySelector(`[data-artist-id="${p.id}"]`);

      if (el) {
        copyright = p.copyright === 0 ? '<s style="font-size:1.3em">©</s> Domaine public' : '<span style="font-size:1.3em">©</span> ' + (p.first_name ?? "") + " " + p.last_name;

        if (props.type === "histocharacters") {
          content =
            `<p style="margin-top:2px;font-size:1.4em;line-height:1;color:${colorScheme[currentColorScheme].gray}"><strong>${p.name}</strong></p>
            <p style="margin-top:2px;font-size:1.1em;font-style:italic;line-height:1">${p.birthyear} — ${p.deathyear}</p>
            <p style="margin-top:6px;line-height:1">Artiste : <strong style="color:${p.color}"><a href="/art/${p.artist_slug}">${p.last_name}</a></strong></p>
            <p style="margin-top:8px;line-height:1">${p.info}</p>
            <p style="margin-top:2px;font-size:1.2em;line-height:1;text-align:end">${copyright}</p>`;
        } else {
          content =
            `<p style="margin-top:2px;font-size:1.4em;line-height:1;color:${colorScheme[currentColorScheme].gray}"><strong>${p.name}</strong></p>
            <p style="margin-top:10px;font-size:1.1em;line-height:1"><strong><a href="/movement/${p.movement_slug}">${p.movement}</a></strong></p>
            <p style="line-height:1">Artiste : <strong style="color:${p.color}"><a href="/art/${p.artist_slug}">${p.last_name}</a></strong></p>
            <p style="margin-top:8px;line-height:1">${p.info}</p>
            <p style="margin-top:2px;font-size:1.2em;line-height:1;text-align:end">${copyright}</p>`;
        }

        tippy(el, {
          allowHTML: true,
          content: content,
          interactive: true,
          placement: "bottom",
          theme: "urarts",
          onCreate(instance: Any) {
            setTippyInstances((prevInstances) => [...prevInstances, instance]);
          },
          onDestroy(instance: Any) {
            setTippyInstances((prevInstances) =>
              prevInstances.filter((i) => i !== instance)
            );
          },
        });
      }
    });
  }, [props.arts]);

  return (
    <div class={`flex flex-wrap mx-auto`}>
      {props.arts &&
        props.arts.map((p) => (
          <div class={`flex flex-col mx-auto`}>
            <div
              id={p.id}
              class={`art-wrap-${p.polyptych}`}
            >
              {p.polyptych > 3 &&
                (
                  <div
                    class={`art-frame art-frame-type-${p.frame} art-polyptych-${p.polyptych}`}
                  >
                    <img
                      class={`max-w-full ${p.gap_4}`}
                      src={p.url_4}
                      alt={p.name + "_4"}
                      draggable={draggable}
                    />
                  </div>
                )}
              {p.polyptych > 1 &&
                (
                  <div
                    class={`art-frame art-frame-type-${p.frame} art-polyptych-${p.polyptych}`}
                  >
                    <img
                      class={`max-w-full ${p.gap_2}`}
                      src={p.url_2}
                      alt={p.name + "_2"}
                      draggable={draggable}
                    />
                  </div>
                )}
              <div
                data-artist-id={p.id}
                class={`art-frame art-frame-type-${p.frame} art-polyptych-${p.polyptych}`}
              >
                {(p.frame === 0 || p.frame > 2) &&
                  (
                    <p
                      class={`text-lighterdark font-${p.font ?? props.font}`}
                    >
                      {p.name}
                    </p>
                  )}
                <img
                  class={`max-w-full ${p.gap_1}`}
                  src={p.url}
                  alt={p.name}
                  draggable={draggable}
                />
              </div>
              {p.polyptych > 2 &&
                (
                  <div
                    class={`art-frame art-frame-type-${p.frame} art-polyptych-${p.polyptych}`}
                  >
                    <img
                      class={`max-w-full ${p.gap_3}`}
                      src={p.url_3}
                      alt={p.name + "_3"}
                      draggable={draggable}
                    />
                  </div>
                )}
              {p.polyptych === 5 &&
                (
                  <div
                    class={`art-frame art-frame-type-${p.frame} art-polyptych-${p.polyptych}`}
                  >
                    <img
                      class={`max-w-full ${p.gap_5}`}
                      src={p.url_5}
                      alt={p.name + "_5"}
                      draggable={draggable}
                    />
                  </div>
                )}
            </div>
            {(p.frame !== 0 && p.frame < 3) &&
              (
                <div class="frame-label flex mx-3">
                  <div
                    class={`paper min-h-[30px] md:min-h-[40px] min-w-[180px] mx-auto`}
                  >
                    <div class="top-tape"></div>
                    <p
                      class={`px-3 text-lighterdark font-${p.font ?? props.font} leading-none`}
                    >
                      {p.name}
                    </p>
                  </div>
                </div>
              )}
          </div>
        ))}
    </div>
  );
}
