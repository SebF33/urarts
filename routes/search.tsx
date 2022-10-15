import { tw } from "@twind";

import Footer from "@islands/Footer.tsx";
import Header from "@islands/Header.tsx";
import LiveSearch from "@islands/LiveSearch.tsx";

export default function Search() {
  return (
    <div class={tw`flex flex-col min-h-screen`}>
      <Header />
      <LiveSearch />
      <Footer />
    </div>
  );
}

console.log(Search);