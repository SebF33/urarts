import i18next from "i18next";
import "@utils/i18n/config.ts";

export default function Title(
  props: { name: string; dimension: string; margin: string },
) {
  return (
    <div class={`paper ${props.dimension} ${props.margin}`}>
      <div class="top-tape"></div>
      <h1 class={`text-5xl font-medium mx-auto`}>
        {i18next.t(`title.${props.name}`, { ns: "translation" })}
      </h1>
    </div>
  );
}
