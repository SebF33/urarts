import { Any } from "any";
import { ArtistRow } from "@utils/types.tsx";
import { css } from "twind/css";
import { tw } from "twind";
import { h } from "preact";
import tippy from "tippyjs";
import { UrlBasePath } from "../../env.ts";
import { useEffect, useState } from "preact/hooks";

type Artists = Array<ArtistRow>;

export default function ArtistsLayout(
  props: { artists: Artists; grid: string },
) {
  const [tippyInstances, setTippyInstances] = useState<Any[]>([]);

  useEffect(() => {
    tippyInstances.forEach((instance) => {
      instance.destroy();
    });
    setTippyInstances([]);

    props.artists.forEach((p) => {
      const el = document.querySelector(`[data-artist-id="${p.id}"]`);

      if (el) {
        tippy(el, {
          allowHTML: true,
          content:
            `<strong style="font-size:1.2em"><a href="${UrlBasePath}/art/${p.slug}">${p.last_name}</a></strong>
            <br><span style="font-style:italic">${p.birthyear} — ${p.deathyear}</span>
            <br>Nationalité : ${p.nationality}
            <p style="margin-top:10px">${p.info}</p>`,
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
  }, [props.artists]);

  function handleClick(event: h.JSX.TargetedMouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const href = (event.currentTarget as HTMLAnchorElement).href;
    setTimeout(() => {
      window.location.href = href;
    }, 200);
  }

  return (
    <div class={tw`max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12`}>
      {props.artists &&
        (
          <div
            class={tw`${props.grid}`}
          >
            {props.artists.map((p) => (
              <div
                data-artist-id={p.id}
                class={tw`artist-frame ${
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
                <p
                  class={tw`font-brush z-10 ${
                    css(
                      {
                        "position": "absolute",
                        "top": "6.0303%",
                        "bottom": "3.0303%",
                        "left": "10.5%",
                        "right": "2.5%",
                        "font-size": "calc(0.8em + 0.16vw)",
                      },
                    )
                  }`}
                >
                  {p.first_name} {p.last_name}
                </p>
                {p.signature &&
                  (
                    <img
                      class={tw`w-12 z-10 ${
                        css(
                          {
                            "position": "absolute",
                            "top": "86.0303%",
                            "left": "70.5%",
                            "font-size": "calc(0.6em + 0.5vw)",
                          },
                        )
                      }`}
                      src={p.signature}
                      alt={p.signature}
                    />
                  )}
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
                        "box-shadow":
                          "0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset",
                      },
                    )
                  }`}
                >
                  <a
                    href={"/art/" + p.slug}
                    onClick={handleClick}
                    class={tw`group flex justify-center text-center relative overflow-hidden z-20 cursor-pointer ${
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
                      class={tw`w-full object-cover ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125`}
                      src={p.avatar_url}
                      alt={p.last_name}
                    />
                    <div
                      class={tw`absolute w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-60 ${
                        css({
                          "background": "black",
                        })
                      }`}
                    />
                  </a>
                </div>
                <ul class={tw`artist-side z-20`}>
                  <a class={tw`w-7`}>
                    <img
                      src={"/flags/" + p.nationality + ".png"}
                      alt="flag-symbol"
                    />
                  </a>
                </ul>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
