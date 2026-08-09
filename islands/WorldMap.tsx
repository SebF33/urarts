import {
  colorScheme,
  currentColorScheme,
  worldColors,
} from "@utils/colors.ts";
import { createPortal } from "react-dom";
import {
  COUNTRY_ALPHA2_TO_SLUG,
  COUNTRY_CAPITALS,
  DELAY_DEBOUNCE,
  NATIONALITIES_LABELS,
} from "@utils/constants.ts";
import { feature } from "topojson-client";
import { geoMercator, geoPath } from "d3-geo";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { IS_BROWSER } from "fresh/runtime"; // typeof document !== "undefined"
import iso from "iso-3166-1";
import isoCountries from "i18n-iso-countries/index.js";
import en from "i18n-iso-countries/langs/en.json" with { type: "json" };
import fr from "i18n-iso-countries/langs/fr.json" with { type: "json" };
import { isTouchDevice } from "@utils/helpers.ts";
import ky from "ky";
import tippy, { hideAll } from "tippyjs";
import { UrlBasePath } from "@/env.ts";
import { useEffect, useRef, useState } from "preact/hooks";
import { usePageBackground } from "@utils/background.ts";
import worldData from "world-atlas/countries-110m.json" with { type: "json" };

import { WorldArtistsPanel } from "./panel/WorldArtistsPanel.tsx";
import { WorldArtsPanel } from "./panel/WorldArtsPanel.tsx";

import type { Any } from "any";
import type { ArtistRow, ArtRow } from "@utils/types.d.ts";
import type { Instance } from "tippyjs";

isoCountries.registerLocale(en);
isoCountries.registerLocale(fr);


export default function WorldMap(
  { artsTagsCountries }: { readonly artsTagsCountries: string[] },
) {
  const [artists, setArtists] = useState<ArtistRow[]>([]);
  const [arts, setArts] = useState<ArtRow[]>([]);
  const [countries, setCountries] = useState<Any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedArtistsCountry, setSelectedArtistsCountry] = useState<string | null>(null);
  const [selectedArtsCountry, setSelectedArtsCountry] = useState<string | null>(null);
  const [selectedCountrySlug, setSelectedCountrySlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [lastClickTime, setLastClickTime] = useState(0);

  // Contexte
  const lng = i18next.language;

  // Position de la carte du Monde
  const TOP_OFFSET = 0; // si besoin : décalage vertical de la carte
  const WIDTH_COEF = 1; // si besoin : largeur de la carte


  // Convertir TopoJSON en GeoJSON
  useEffect(() => {
    const geo = feature(
      worldData as Any,
      (worldData as Any).objects.countries,
    ) as Any;
    // sans l'Antarctique
    const filtered = geo.features.filter((f: Any) => {
      const alpha2 = iso.whereNumeric(String(f.id))?.alpha2;
      return alpha2 !== "AQ";
    });
    setCountries(filtered);
  }, []);


  // Infobulles de la carte du Monde
  //
  // - afficher une infobulle au survol d'un pays (desktop uniquement)
  // - éviter toute infobulle sur mobile / tactile
  // - positionner l'infobulle sur le centroïde du pays (et non sur la souris)
  // - lire la capitale depuis la constante COUNTRY_CAPITALS
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const isTouch = isTouchDevice();
    if (isTouch) return;

    const labelCapital = lng === "fr" ? "Capitale" : "Capital";

    const escapeHtml = (s: string) =>
      s.replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    const renderContent = (countryName: string, capital?: string) => {
      const safeName = escapeHtml(countryName);
      const safeCapital = escapeHtml(capital ?? "—");
      return `
        <div style="line-height:1.1">
          <div style="font-size:17px;font-weight:500">${safeName}</div>
          <div style="font-size:14px;opacity:.9;margin-top:4px">${labelCapital} : ${safeCapital}</div>
        </div>
      `;
    };

    // éviter de recréer des infobulles à l'infini -> on détruit celles existantes avant de recréer
    const instances: Instance[] = [];

    const frame = requestAnimationFrame(() => {
      // infobulles basées sur le centroïde de chaque path
      svgEl.querySelectorAll("path").forEach((path) => {
        const countryName = path.getAttribute("data-country-name") || "";
        const alpha2 = path.getAttribute("data-alpha2") || "";

        const capitalEntry = alpha2 ? COUNTRY_CAPITALS[alpha2] : undefined;
        const capital = capitalEntry
          ? (capitalEntry[lng as "en" | "fr"] || capitalEntry.en || "—")
          : "—";

        const instance = tippy(path, {
          arrow: true,
          allowHTML: true,
          content: renderContent(countryName, capital),
          offset: [0, 8],
          placement: "top",
          popperOptions: { strategy: "fixed" },
          theme: "urarts",
          getReferenceClientRect: () => {
            const cx = Number.parseFloat(path.getAttribute("data-centroid-x") || "0");
            const cy = Number.parseFloat(path.getAttribute("data-centroid-y") || "0");
            const pt = svgEl.createSVGPoint();
            pt.x = cx;
            pt.y = cy;
            const ctm = svgEl.getScreenCTM();
            if (!ctm) {
              return path.getBoundingClientRect();
            }
            const screenPt = pt.matrixTransform(ctm);
            return DOMRect.fromRect({
              x: screenPt.x,
              y: screenPt.y,
              width: 0,
              height: 0,
            });
          },
        });

        instances.push(instance);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      instances.forEach((i) => i?.destroy?.());
    };
  }, [countries, lng]);


  // Background pour la page de la carte du Monde
  usePageBackground("worldmap");


  // Dimensions pour projection
  useEffect(() => {
    if (!containerRef.current) return;
    let frame = 0;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setContainerSize({ width, height });
      });
    });
    ro.observe(containerRef.current);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, []);

  const internalWidth = containerSize.width / WIDTH_COEF;
  const internalHeight = containerSize.height;


  // Couleur pour chaque pays
  const allCountries = Array.from(
    new Set([...NATIONALITIES_LABELS, ...artsTagsCountries]),
  );
  //console.log(allCountries);
  const colorMap: Record<string, string> = {};
  allCountries.forEach((name, i) => {
    colorMap[name] = worldColors[i % worldColors.length];
  });


  // Projection D3
  const projection = geoMercator().fitSize(
    [internalWidth, internalHeight],
    { type: "FeatureCollection", features: countries },
  );
  const pathGenerator = geoPath().projection(projection);


  // Afficher l'overlay
  useEffect(() => {
    if (selectedArtistsCountry || selectedArtsCountry) {
      setIsOverlayVisible(false);
      requestAnimationFrame(() => setIsOverlayVisible(true));
    } else {
      setIsOverlayVisible(false);
    }
  }, [selectedArtistsCountry, selectedArtsCountry]);

  useEffect(() => {
    if (IS_BROWSER) {
      setPortalRoot(document.body);
    }
  }, []);


  // Ouverture des panels au click d'un pays
  const handleCountryClick = async (name: string, slug: string) => {
    // anti-spam
    const now = Date.now();
    if (now - lastClickTime < DELAY_DEBOUNCE) return;
    setLastClickTime(now);

    // fermer toute infobulle avant
    hideAll();

    // nettoyage des données précédentes
    setSelectedArtistsCountry(null);
    setSelectedArtsCountry(null);
    setArtists([]);
    setArts([]);

    setLoading(true);

    try {
      const [artistsResp, artsResp] = await Promise.all([
        ky.get(`${UrlBasePath}/api/artists`, { searchParams: { lng, nationality: slug } }).json<ArtistRow[]>(),
        ky.get(`${UrlBasePath}/api/arts?lng=${lng}&tag=${name}&geolocation`).json<ArtRow[]>()
      ]);

      setArtists(artistsResp);
      setArts(artsResp);
      setSelectedArtistsCountry(name);
      setSelectedArtsCountry(name);
      setSelectedCountrySlug(slug);
    } catch (error) {
      console.error("World map panels error:", error);
    } finally {
      setLoading(false);
    }
  };


  // Fermeture des panels
  const closeAllPanels = () => {
    setSelectedArtistsCountry(null);
    setSelectedArtsCountry(null);
    setSelectedCountrySlug(null);
  };


  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        paddingTop: `${TOP_OFFSET}px`,
        overflow: "hidden",
      }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${internalWidth} ${internalHeight}`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "100%",
          display: "block",
        }}
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
          const alpha2 = iso.whereNumeric(String(c.id))?.alpha2;
          // slugs de pays
          const slug = alpha2 ? COUNTRY_ALPHA2_TO_SLUG[alpha2] || "" : "";
          // noms de pays selon la langue
          const name = alpha2 ? isoCountries.getName(alpha2, lng) || c.properties.name : c.properties.name;
          // pays actifs
          const isActive = artsTagsCountries.includes(name) || NATIONALITIES_LABELS.includes(name);
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
              data-country-name={name}
              data-alpha2={alpha2 || ""}
              data-centroid-x={cx.toString()}
              data-centroid-y={cy.toString()}
              onClick={() => isActive && handleCountryClick(name, slug)}
            />
          );
        })}
      </svg>

      {/* Overlay */}
      {portalRoot &&
        createPortal(
          (selectedArtistsCountry || selectedArtsCountry) && (
            <div
              className={`fixed inset-0 bg-black/70 z-[99999] overlay-transition ${
                isOverlayVisible ? "visible" : ""
              }`}
              onClick={closeAllPanels}
            />
          ),
          portalRoot,
        )}

      {/* Panneau des artistes */}
      {!loading && (
        <WorldArtistsPanel
          country={selectedArtistsCountry}
          slug={selectedCountrySlug}
          artists={artists}
          onClose={() => setSelectedArtistsCountry(null)}
        />
      )}

      {/* Panneau des œuvres */}
      {!loading && (
        <WorldArtsPanel
          country={selectedArtsCountry}
          slug={selectedCountrySlug}
          artworks={arts}
          onClose={() => setSelectedArtsCountry(null)}
        />
      )}
    </div>
  );
}
