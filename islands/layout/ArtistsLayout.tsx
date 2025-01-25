import { Any } from "any";
import { ARTIST_IMG_WRAPPER, DELAY_DISPLAY, DELAY_REACH_HREF, NB_LOADING_ARTISTS } from "@utils/constants.ts";
import { ArtistRow } from "@utils/types.d.ts";
import { css } from "@twind/core";
import { h } from "preact";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import tippy from "tippyjs";
import { useEffect, useState } from "preact/hooks";
import { useImageOnLoad } from "@utils/hooks/useImageOnLoad.ts";
import { useIntersectionObserver } from "@utils/hooks/useIntersectionObserver.ts";

type Artists = Array<ArtistRow>;


export default function ArtistsLayout(
  props: { readonly artists: Artists; readonly flag: string; readonly grid: string },
) {
  const [display, setDisplay] = useState<boolean>(false);
  const [displayedArtistIndex, setDisplayedArtistIndex] = useState<number>(0);
  const { handleImageOnLoad, imageOnLoadStyle } = useImageOnLoad();
  const { isIntersecting, ref: endRef } = useIntersectionObserver({ threshold: 0.9 }) // Seuil d'intersection des éléments
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(false);
  const [tippyInstances, setTippyInstances] = useState<Any[]>([]);

  // Rendu des artistes
  const displayedArtists = display ? props.artists.slice(0, displayedArtistIndex + NB_LOADING_ARTISTS) : [];
  const draggable = false;


  // Délais d'affichage initiaux
  useEffect(() => {
    const timeoutId = setTimeout(() => { setDisplay(true); }, DELAY_DISPLAY);
    const timeoutNoresults = setTimeout(() => { setShowPlaceholder(true); }, 300);
  
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutNoresults);
    };
  }, []);


  // Chargement à la fin de la liste
  useEffect(() => {
    if (isIntersecting) {
      if (displayedArtistIndex + NB_LOADING_ARTISTS < props.artists.length) { // Vérifier s'il reste des éléments à afficher
        setDisplayedArtistIndex(displayedArtistIndex + NB_LOADING_ARTISTS); // Mettre à jour pour afficher les prochains
      }
    }
  }, [isIntersecting]);


  // Infobulles
  useEffect(() => {
    // Détruire seulement les instances qui ne sont pas visibles
    tippyInstances.forEach((instance) => {
      if (!instance.state.isVisible) { instance.destroy(); }
    });

    // Mettre à jour la liste des instances en supprimant celles qui ne sont pas visibles
    setTippyInstances((prevInstances) => prevInstances.filter((instance) => instance.state.isVisible));

    const noresultsElement: HTMLElement | null = document.querySelector("#Noresults");

    if (noresultsElement) {
      tippy(noresultsElement, {
        allowHTML: true,
        content: `<p>${i18next.t("common.no_results", { ns: "translation" })}.</p>`,
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

    displayedArtists.forEach((p) => {
      const artistElement: HTMLElement | null = document.querySelector(`[data-artist-id="${p.id}"]`);

      if (artistElement) {
        tippy(artistElement, {
          allowHTML: true,
          content:
            `<strong style="font-size:1.3em;line-height:1.2;color:${p.color}"><a href="/art/${p.slug}">${p.last_name}</a></strong>
            <p style="font-size:1.15em;font-style:italic">${p.birthyear} — ${p.deathyear}</p>
            <p style="font-size:1em;line-height:1.05;padding-bottom:8px">${i18next.t("artists.nationality", { ns: "translation" })} ${p.nationality}</p>
            <p style="margin:8px;font-size:1.1em;text-justify:auto;line-height:1.2;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${p.info}</p>`,
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

    return () => {
      // Nettoyer les listeners et instances pour éviter les fuites mémoire
      tippyInstances.forEach((instance) => instance.destroy());
    };
  }, [display, props.artists, isIntersecting]);


  function handleClick(event: h.JSX.TargetedMouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const href = (event.currentTarget as HTMLAnchorElement).href;
    setTimeout(() => {
      window.location.href = href;
    }, DELAY_REACH_HREF);
  }


  return (
    <div
      id="data-flag"
      data-flag={`${props.flag}`}
      class={`max-w-7xl mx-auto mb-40 px-6 sm:px-8 md:px-10 lg:px-12`}
    >
      {displayedArtists && displayedArtists.length > 0
        ? (
          <div class={`${props.grid}`}>
            {/* Liste des artistes */}
            {displayedArtists.map((p, index) => (
              <div
                key={index + 1}
                data-artist-id={p.id}
                class={`artist-frame transform-gpu appear-effect-very-fast-fadein bg-dark ${
                  css(
                    {
                      position: "relative",
                      "padding-bottom": "120%",
                      "box-shadow": "0 10px 7px -5px rgba(0, 0, 0, 0.3)",
                    },
                  )
                }`}
              >
                <p
                  class={`text-lighterdark leading-3 pr-2 z-10 ${
                    css(
                      {
                        position: "absolute",
                        top: "6.5%",
                        bottom: "3%",
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
                {display && (
                  <div
                    class={`${
                      css(
                        {
                          position: "absolute",
                          top: "3.0303%",
                          bottom: "3.0303%",
                          left: "2.5%",
                          right: "2.5%",
                          background: "white",
                          "box-shadow": "0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset",
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
                            background: "#ddc",
                            "&::after": {
                              content: "",
                              display: "block",
                              position: "absolute",
                              top: "0",
                              width: "100%",
                              height: "100%",
                              ...(imageOnLoadStyle.fullSizeNoTransition && {
                                boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset",
                              }),
                            },
                          },
                        )
                      }`}
                    >
                      <img
                        style={{ ...ARTIST_IMG_WRAPPER.image, ...imageOnLoadStyle.thumbnail }}
                        src="/placeholder_150.png"
                        alt="placeholder_150"
                      />
                      <img
                        onLoad={handleImageOnLoad}
                        style={{ ...imageOnLoadStyle.fullSizeNoTransition }}
                        class={`w-full object-cover ease-in-out duration-[400ms] group-hover:rotate-6 group-hover:scale-125`}
                        src={p.avatar_url}
                        alt={p.last_name}
                      />
                      <div class={`absolute w-full h-full bg-black opacity-0 transition-opacity duration-[400ms] group-hover:opacity-60`}/>
                    </a>
                  </div>
                )}
                <ul class={`artist-side z-20`}>
                  <a href={"/artists?nationality=" + p.nationality} class={`w-7`}>
                    <img
                      src={"/flags/" + p.nationality + ".png"}
                      alt="flag-symbol"
                      draggable={draggable}
                      class={`${css({"filter": "drop-shadow(0.03rem 0.03rem 0.08rem rgba(0, 0, 0, 0.5))"})}`}
                    />
                  </a>
                </ul>
              </div>
            ))}
            {/* Référence à la fin de la liste */}
            <div ref={endRef}></div>
          </div>
        )
        : (
          <div class={`${props.grid}`}>
            {showPlaceholder
              ? (
                <div
                  id="Noresults"
                  class={`transform-gpu appear-effect-fast-fadein bg-dark ${
                    css(
                      {
                        "position": "relative",
                        "padding-bottom": "120%",
                        "box-shadow": "0 10px 7px -5px rgba(0, 0, 0, 0.3)",
                      },
                    )
                  }`}
                >
                  <div
                    class={`${
                      css(
                        {
                          position: "absolute",
                          top: "3.0303%",
                          bottom: "3.0303%",
                          left: "2.5%",
                          right: "2.5%",
                          background: "white",
                          "box-shadow": "0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset",
                        },
                      )
                    }`}
                  >
                    <div
                      class={`group flex justify-center text-center relative overflow-hidden z-20 ${
                        css(
                          {
                            position: "absolute",
                            top: "16.129%",
                            bottom: "16.129%",
                            left: "13.158%",
                            right: "13.158%",
                            background: "#ddc",
                            "&::after": {
                              content: "",
                              display: "block",
                              position: "absolute",
                              top: "0",
                              width: "100%",
                              height: "100%",
                              "box-shadow": "0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset",
                            },
                          },
                        )
                      }`}
                    >
                      <img
                        class={`w-full object-cover`}
                        src="/errors/0.jpg"
                        alt={i18next.t("common.no_results", { ns: "translation" })}
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
