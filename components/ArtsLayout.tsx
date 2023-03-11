import { ArtCollection } from "@utils/types.tsx";
import { tw } from "@twind";

type Arts = Array<ArtCollection>;

export default function ArtsLayout(
  props: { arts: Arts; font?: string },
) {
  return (
    <div
      class={tw`row flex flex-wrap mx-auto`}
    >
      {props.arts &&
        props.arts.map((p) => (
          <div id={p.id} class={`art-wrap-${p.polyptych}`}>
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
