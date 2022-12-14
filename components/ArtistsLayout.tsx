import { ArtistRow } from "@utils/types.tsx";
import { css, tw } from "@twind";

type Artists = Array<ArtistRow>;

export default function ArtistsLayout(
  props: { artists: Artists; grid: string },
) {
  return (
    <div class={tw`max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12`}>
      {props.artists &&
        (
          <div
            class={tw`${props.grid}`}
          >
            {props.artists.map((p) => (
              <div
                class={tw`${
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
                        "font-size": "calc(0.8em + 0.2vw)",
                      },
                    )
                  }`}
                >
                  {p.first_name} {p.last_name}
                </p>
                {p.signature &&
                  (
                    <img
                      class={tw`w-8 z-10 ${
                        css(
                          {
                            "position": "absolute",
                            "top": "86.0303%",
                            "bottom": "3.0303%",
                            "left": "76.5%",
                            "right": "1%",
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
                      alt={p.first_name}
                    />
                    <div
                      class={tw`absolute bg-black w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-60`}
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
