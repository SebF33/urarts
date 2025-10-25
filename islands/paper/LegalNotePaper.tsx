import i18next from "i18next";
import "@utils/i18n/config.ts";

export default function LegalNotePaper() {
  return (
    <div class="paper max-w-[500px] mx-6 mt-6 mb-2 p-6 text-sm md:text-base leading-relaxed">
      <div class="tape-section"></div>
      <div class="font-medium space-y-6" dangerouslySetInnerHTML={{ __html: i18next.t("about.legal", { ns: "translation" }) }} />
      <div class="tape-section mt-6"></div>
    </div>
  );
}
