import { ART_IMG_WRAPPER, DELAY_REACH_HREF } from "@utils/constants.ts";
import { h } from "preact";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { useImageOnLoad } from "@utils/hooks/useImageOnLoad.ts";

interface PreviewProps {
  id: string;
  name: string;
  slug: string;
  url: string;
}


export default function Preview(
  props: { readonly image: PreviewProps | null },
) {
  const { handleImageOnLoad, imageOnLoadStyle } = useImageOnLoad();


  // Délai au click
  function handleClick(event: h.JSX.TargetedMouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const href = (event.currentTarget as HTMLAnchorElement).href;
    setTimeout(() => { window.location.href = href; }, DELAY_REACH_HREF);
  }


  return (
    <div class="preview-frame relative mt-16 mb-6 mx-auto lg:mr-0">
      <div class="paper absolute top-7 right-2 min-w-[110px] font-brush text-xl rotate-[20deg] transform-gpu z-10">
        <div class="top-tape max-h-2"></div>
        {i18next.t("arts.preview", { ns: "translation" })}
      </div>
      {props.image && (
        <a
          href={"/art/" + props.image.slug + "?alone&id=" + props.image.id}
          class="preview block mx-auto cursor-pointer"
          onClick={handleClick}
          title={props.image.name}
        >
          <img
            style={{ ...ART_IMG_WRAPPER.image, ...imageOnLoadStyle.thumbnail }}
            src="/placeholder_150.png"
            alt="placeholder_150"
          />
          <img
            onLoad={handleImageOnLoad}
            style={{ ...imageOnLoadStyle.fullSize }}
            class="preview-img"
            src={props.image.url}
            alt={i18next.t("arts.preview", { ns: "translation" })}
            title={props.image.name}
          />
        </a>
      )}
    </div>
  );
}
