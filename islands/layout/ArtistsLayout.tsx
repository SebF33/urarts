import { Any } from "any";
import { ArtistRow } from "@utils/types.tsx";
import { css } from "@twind/core";
import { h } from "preact";
import tippy from "tippyjs";
import { useEffect, useState } from "preact/hooks";

type Artists = Array<ArtistRow>;

export default function ArtistsLayout(
  props: { artists: Artists; flag: string; grid: string },
) {
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [tippyInstances, setTippyInstances] = useState<Any[]>([]);

  const draggable = false;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowPlaceholder(true);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    tippyInstances.forEach((instance) => {
      instance.destroy();
    });
    setTippyInstances([]);

    const noresults = document.querySelector("#Noresults");

    if (noresults) {
      tippy(noresults, {
        allowHTML: true,
        content: "<p>Pas de résultats.</p>",
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

    props.artists.forEach((p) => {
      const artist = document.querySelector(`[data-artist-id="${p.id}"]`);

      if (artist) {
        tippy(artist, {
          allowHTML: true,
          content:
            `<strong style="font-size:1.2em;color:${p.color}"><a href="/art/${p.slug}">${p.last_name}</a></strong>
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
    <div
      id="data-flag"
      data-flag={`${props.flag}`}
      class={`max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12`}
    >
      {props.artists && props.artists.length > 0
        ? (
          <div class={`${props.grid}`}>
            {props.artists.map((p) => (
              <div
                data-artist-id={p.id}
                class={`artist-frame ${
                  css(
                    {
                      position: "relative",
                      "padding-bottom": "120%",
                      background: "black",
                      "box-shadow": "0 10px 7px -5px rgba(0, 0, 0, 0.3)",
                    },
                  )
                }`}
              >
                <p
                  class={`text-lighterdark z-10 ${
                    css(
                      {
                        position: "absolute",
                        top: "6.0303%",
                        bottom: "3.0303%",
                        left: "10.5%",
                        right: "2.5%",
                        "font-size": "calc(0.8em + 0.16vw)",
                      },
                    )
                  }`}
                >
                  {p.first_name} {p.last_name}
                </p>
                {p.signature && (
                  <img
                    class={`w-12 z-10 ${
                      css(
                        {
                          position: "absolute",
                          top: "86.0303%",
                          left: "70.5%",
                          "font-size": "calc(0.6em + 0.5vw)",
                        },
                      )
                    }`}
                    src={p.signature}
                    alt={p.signature}
                    draggable={draggable}
                  />
                )}
                <div
                  class={`${
                    css(
                      {
                        position: "absolute",
                        background: "white",
                        top: "3.0303%",
                        bottom: "3.0303%",
                        left: "2.5%",
                        right: "2.5%",
                        "box-shadow":
                          "0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset",
                      },
                    )
                  }`}
                >
                  <a
                    href={"/art/" + p.slug}
                    onClick={handleClick}
                    draggable={draggable}
                    class={`group flex justify-center text-center relative overflow-hidden z-20 cursor-pointer ${
                      css(
                        {
                          position: "absolute",
                          top: "16.129%",
                          bottom: "16.129%",
                          left: "13.158%",
                          right: "13.158%",
                          "&::after": {
                            content: "",
                            display: "block",
                            position: "absolute",
                            top: "0",
                            width: "100%",
                            height: "100%",
                            "box-shadow":
                              "0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset",
                          },
                        },
                      )
                    }`}
                  >
                    <img
                      class={`w-full object-cover ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125`}
                      src={p.avatar_url}
                      alt={p.last_name}
                    />
                    <div
                      class={`absolute w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-60 ${
                        css({
                          "background": "black",
                        })
                      }`}
                    />
                  </a>
                </div>
                <ul class={`artist-side z-20`}>
                  <a class={`w-7`}>
                    <img
                      src={"/flags/" + p.nationality + ".png"}
                      alt="flag-symbol"
                      draggable={draggable}
                      class={`${
                        css(
                          {
                            "filter":
                              "drop-shadow(0.03rem 0.03rem 0.08rem rgba(0, 0, 0, 0.5))",
                          },
                        )
                      }`}
                    />
                  </a>
                </ul>
              </div>
            ))}
          </div>
        )
        : (
          <div class={`${props.grid}`}>
            {showPlaceholder
              ? (
                <div
                  id="Noresults"
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
                          "box-shadow":
                            "0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset",
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
                        src="/errors/0.jpg"
                        alt="Pas de résultats"
                      />
                    </div>
                  </div>
                </div>
              )
              : null}
          </div>
        )}
    </div>
  );
}
