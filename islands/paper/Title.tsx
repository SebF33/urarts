import i18next from "i18next";
import "@utils/i18n/config.ts";

export default function Title(
  props: {
    readonly name: string;
    readonly dimension: string;
    readonly margin: string;
  },
) {
  return (
    <div class={`paper paper-shadow ${props.dimension} ${props.margin}`}>
      <div class="top-tape"></div>
      <h1 class={`text-2xl md:text-5xl font-medium text-center mx-auto px-6`}>
        {i18next.t(`title.${props.name}`, { ns: "translation" })}
      </h1>
    </div>
  );
}
