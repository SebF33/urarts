import { Any } from "any";
import { ArtCollection } from "@utils/types.tsx";
import tippy from "tippyjs";
import { tw } from "twind";
import { UrlBasePath } from "../../env.ts";
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

  useEffect(() => {
    tippyInstances.forEach((instance) => {
      instance.destroy();
    });
    setTippyInstances([]);

    props.arts.forEach((p) => {
      let content;
      const el = document.querySelector(`[data-artist-id="${p.id}"]`);

      if (el) {
        if (props.type === "histocharacters") {
          content =
            `<strong style="font-size:1.3em;line-height:0.1">${p.name}</strong>
        <br><span style="font-style:italic">${p.birthyear} — ${p.deathyear}</span>
        <br>Artiste : <strong style="color:${p.color}"><a href="${UrlBasePath}/art/${p.artist_slug}">${p.last_name}</a></strong>
        <p style="margin-top:10px">${p.info}</p>`;
        } else {
          content =
            `<strong style="font-size:1.3em;line-height:0.1">${p.name}</strong>
        <br><strong><a href="${UrlBasePath}/movement/${p.movement_slug}">${p.movement}</a></strong>
        <br>Artiste : <strong style="color:${p.color}"><a href="${UrlBasePath}/art/${p.artist_slug}">${p.last_name}</a></strong>
        <p style="margin-top:10px">${p.info}</p>`;
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
    <div
      class={tw`row flex flex-wrap mx-auto`}
    >
      {props.arts &&
        props.arts.map((p) => (
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
                    src={p.url_4}
                    alt={p.name + "_4"}
                  />
                </div>
              )}
            {p.polyptych > 1 &&
              (
                <div
                  class={`art-frame art-frame-type-${p.frame} art-polyptych-${p.polyptych}`}
                >
                  <img
                    src={p.url_2}
                    alt={p.name + "_2"}
                  />
                </div>
              )}
            <div
              data-artist-id={p.id}
              class={`art-frame art-frame-type-${p.frame} art-polyptych-${p.polyptych}`}
            >
              <p
                class={tw`font-${p.font ?? props.font}`}
              >
                {p.name}
              </p>
              <img
                src={p.url}
                alt={p.name}
              />
            </div>
            {p.polyptych > 2 &&
              (
                <div
                  class={`art-frame art-frame-type-${p.frame} art-polyptych-${p.polyptych}`}
                >
                  <img
                    src={p.url_3}
                    alt={p.name + "_3"}
                  />
                </div>
              )}
            {p.polyptych === 5 &&
              (
                <div
                  class={`art-frame art-frame-type-${p.frame} art-polyptych-${p.polyptych}`}
                >
                  <img
                    src={p.url_5}
                    alt={p.name + "_5"}
                  />
                </div>
              )}
          </div>
        ))}
    </div>
  );
}
