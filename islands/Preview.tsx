import { ART_IMG_WRAPPER } from "@utils/constants.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { useImageOnLoad } from "@utils/hooks/useImageOnLoad.ts";

export default function Preview(
  props: { imageUrl: string | null },
) {
  const { handleImageOnLoad, imageOnLoadStyle } = useImageOnLoad();

  return (
    <div class="preview-frame relative mt-16 mb-6 mx-auto lg:mr-0">
      <div class="paper absolute top-7 right-2 min-w-[110px] font-brush text-xl rotate-[20deg] transform-gpu z-10">
        <div class="top-tape max-h-2"></div>
        {i18next.t("arts.preview", { ns: "translation" })}
      </div>
      {props.imageUrl && (
        <div class="preview mx-auto">
          <img
            style={{ ...ART_IMG_WRAPPER.image, ...imageOnLoadStyle.thumbnail }}
            src="/placeholder_150.png"
            alt="placeholder_150"
          />
          <img
            onLoad={handleImageOnLoad}
            style={{ ...imageOnLoadStyle.fullSize }}
            class="preview-img"
            src={props.imageUrl}
            alt={i18next.t("arts.preview", { ns: "translation" })}
          />
        </div>
      )}
    </div>
  );
}
