import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { tw } from "@twind";

import Footer from "@islands/Footer.tsx";
import Header from "@islands/Header.tsx";
import ArtistsSearch from "@islands/ArtistsSearch.tsx";
import WaterDrop from "@islands/WaterDrop.tsx";

export default function Search() {
  return (
    <div class={tw`flex flex-col min-h-screen`}>
      <Header />
      <ArtistsSearch />
      <WaterDrop color={colorScheme[currentColorScheme].lighterdark} />
      <Footer color={colorScheme[currentColorScheme].lighterdark} />
    </div>
  );
}
