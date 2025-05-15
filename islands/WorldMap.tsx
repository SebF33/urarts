import { Any } from "any";
import { ArtistRow, ArtRow } from "@utils/types.d.ts";
import { colorScheme, currentColorScheme, extraColors, tagColorsEN, tagColorsFR, worldColors } from "@utils/colors.ts";
import { feature } from "topojson-client";
import { geoMercator, geoPath } from "d3-geo";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import iso from "iso-3166-1";
import isoCountries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json" with { type: "json" };
import fr from "i18n-iso-countries/langs/fr.json" with { type: "json" };
import ky from "ky";
import { NATIONALITIES } from "@utils/constants.ts";
import tippy from "tippyjs";
import { UrlBasePath } from "@/env.ts";
import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import worldData from "world-atlas/countries-110m.json" with { type: "json" };

import { WorldArtistsPanel } from "./panel/WorldArtistsPanel.tsx";
import { WorldArtsPanel } from "./panel/WorldArtsPanel.tsx";

isoCountries.registerLocale(en);
isoCountries.registerLocale(fr);


export default function WorldMap({ artsTagsCountries }: { readonly artsTagsCountries: string[] }) {
  const [artists, setArtists] = useState<ArtistRow[]>([]);
  const [arts, setArts] = useState<ArtRow[]>([]);
  const [countries, setCountries] = useState<Any[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState(() => ({
    width: typeof globalThis !== "undefined" ? globalThis.innerWidth : 800,
    height: typeof globalThis !== "undefined" ? globalThis.innerHeight : 600,
  }));
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const lng = i18next.language;


  // Convertir TopoJSON en GeoJSON
  useEffect(() => {
    const geo = feature(
      worldData as Any,
      (worldData as Any).objects.countries,
    ) as Any;
    setCountries(geo.features);
  }, []);


  // Infobulles
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    // basées sur le centroïde de chaque path
    svgEl.querySelectorAll("path").forEach((path) => {
      tippy(path, {
        arrow: true,
        content: path.getAttribute("data-tippy-content") || "",
        offset: [0, 8],
        placement: "top",
        popperOptions: { strategy: "fixed" },
        theme: "urarts",
        getReferenceClientRect: () => {
          const cx = parseFloat(path.getAttribute("data-centroid-x") || "0");
          const cy = parseFloat(path.getAttribute("data-centroid-y") || "0");
          const pt = svgEl.createSVGPoint();
          pt.x = cx;
          pt.y = cy;
          const ctm = svgEl.getScreenCTM();
          if (!ctm) {
            return path.getBoundingClientRect();
          }
          const screenPt = pt.matrixTransform(ctm);
          return {
            width: 0,
            height: 0,
            x: screenPt.x,
            y: screenPt.y,
            top: screenPt.y,
            bottom: screenPt.y,
            left: screenPt.x,
            right: screenPt.x,
          };
        },
      });
    });
  }, [countries]);


  // Background pour la page de la carte du Monde
  useLayoutEffect(() => {
    const body = document.querySelector("body");
    const main = document.querySelector<HTMLElement>('[data-name="worldmap"]');
    if (body) {
      body.style.backgroundColor = extraColors.water;
    }
    if (main) {
      [
        "background",
        "background-attachment",
        "background-position",
        "background-size",
      ].forEach((prop) => main.style.removeProperty(prop));
    }
  }, []);


  // Dimensions pour projection et viewBox en fonction du viewport
  useLayoutEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: globalThis.innerWidth,
        height: globalThis.innerHeight,
      });
    };
    updateDimensions();
    globalThis.addEventListener("resize", updateDimensions);
    return () => globalThis.removeEventListener("resize", updateDimensions);
  }, []);

  const internalWidth = dimensions.width * 0.72;
  const internalHeight = dimensions.height;


  // Couleur pour chaque pays
  const allCountries = Array.from(new Set([...NATIONALITIES, ...artsTagsCountries]))
  //console.log(allCountries);
  const tagColors = lng === "fr" ? tagColorsFR : tagColorsEN;
  const allColors = [...worldColors, ...tagColors];
  //console.log(allColors);
  const colorMap: Record<string, string> = {};
  allCountries.forEach((name, i) => {
    colorMap[name] = allColors[i % allColors.length];
  });


  // Projection D3
  const projection = geoMercator().fitSize(
    [internalWidth, internalHeight],
    { type: "FeatureCollection", features: countries },
  );
  const pathGenerator = geoPath().projection(projection);


  // Ouverture des panels au click d'un pays
  const handleCountryClick = async (name: string) => {
    setSelectedCountry(name);

    const [artistsResp, artsResp] = await Promise.all([

      ky.get(`${UrlBasePath}/api/artists`, {
        searchParams: { lng: lng, nationality: name },
      }).json<ArtistRow[]>(),

      ky.get(`${UrlBasePath}/api/arts`, {
        searchParams: { lng: lng, tag: name },
      }).json<ArtRow[]>(),
    ]);

    setArtists(artistsResp);
    setArts(artsResp);
  };


  return (
    <>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${internalWidth} ${internalHeight}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <filter id="brush">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <pattern
            id="brushPattern"
            patternUnits="userSpaceOnUse"
            width="200"
            height="200"
          >
            <image
              href="/textures/brush-strokes.png"
              x="0"
              y="0"
              width="200"
              height="200"
            />
          </pattern>
        </defs>
        {countries.map((c) => {
          // noms de pays selon la langue
          const alpha2 = iso.whereNumeric(String(c.id))?.alpha2;
          const name = alpha2
            ? isoCountries.getName(alpha2, lng) || c.properties.name
            : c.properties.name;
          // pays actifs
          const isActive = artsTagsCountries.includes(name) || NATIONALITIES.includes(name);
          const fillColor = isActive ? colorMap[name] : "url(#brushPattern)";
          const cursorClass = isActive ? "cursor-pointer" : "cursor-auto";
          // centroïde pour infobulle
          const [cx, cy] = pathGenerator.centroid(c);

          return (
            <path
              key={c.id || name}
              d={pathGenerator(c) || undefined}
              fill={fillColor}
              stroke={colorScheme[currentColorScheme].dark}
              strokeWidth={0.5}
              filter="url(#brush)"
              class={cursorClass}
              data-tippy-content={name}
              data-centroid-x={cx.toString()}
              data-centroid-y={cy.toString()}
              onClick={() => isActive && handleCountryClick(name)}
            />
          );
        })}
      </svg>

      {/* Panneau des artistes */}
      <WorldArtistsPanel
        country={selectedCountry!}
        artists={artists}
        onClose={() => {
          setSelectedCountry(null);
          setArtists([]);
        }}
      />

      {/* Panneau des œuvres */}
      <WorldArtsPanel
        country={selectedCountry!}
        artworks={arts}
        onClose={() => {
          setSelectedCountry(null);
          setArts([]);
        }}
      />
    </>
  );
}
