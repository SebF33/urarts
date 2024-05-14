// SPDX-FileCopyrightText: 2021 Luca Casonato
// SPDX-License-Identifier: MIT
// Modifié par Sébastien Flouriot le 06/01/2024

import { DELAY_DISPLAY_WATERDROP } from "@utils/constants.ts";
import tippy from "tippyjs";
import { useEffect, useRef, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";

import WaveTank from "@components/WaveTank.tsx";

function easeInCirc(x: number) {
  return 1 - Math.sqrt(1 - Math.pow(x, 2));
}

const waveTank = new WaveTank();

export default function WaterDrop(
  props: { color: string; isDropy: boolean; pencilColor: string },
) {
  const [display, setDisplay] = useState<boolean>(false);
  const SVG_WIDTH = 170;
  const counter = useSignal(0);
  const dropy = useSignal(60);
  const width = useSignal(SVG_WIDTH);
  const widthRef = useRef(width.value);
  const springs = useSignal(waveTank.springs);
  const requestIdRef = useRef<number>();
  const grid = SVG_WIDTH / waveTank.waveLength;
  const points = [
    [0, 100],
    [0, 0],
    ...springs.value.map((x, i) => [i * grid, x.p]),
    [width.value, 0],
    [width.value, 100],
  ];
  const springsPath = `${points.map((x) => x.join(",")).join(" ")}`;
  const juice = `M18 ${63 + counter.value} C15 ${63 + counter.value} 16 ${
    63 + counter.value
  } 12 61L11 55C14 33 26 33 28 27C36 40 26 43 25 51C25 57 24 59 23 61C20 ${
    63 + counter.value
  } 21 ${63 + counter.value} 18 ${63 + counter.value}Z`;

  function updateJuice(timestamp: number) {
    const amp = 40;
    const x = timestamp / 2000;
    const saw = x - Math.floor(x);
    if (saw < 0.6) {
      counter.value = easeInCirc(saw) * amp;
      dropy.value = -100;
    } else {
      counter.value = easeInCirc(1 - saw) * amp * 0.1;
      dropy.value = 70 + Math.pow(saw - 0.6, 2) * 10000;
    }
  }

  function update(timestamp: number) {
    updateJuice(timestamp);
    waveTank.update(waveTank.springs);
    springs.value = [...waveTank.springs];

    const offset = 500;
    const saw = (timestamp + offset) / 2000 -
      Math.floor((timestamp + offset) / 2000);
    if (saw < 0.01) {
      drop();
    }
    requestIdRef.current = globalThis.requestAnimationFrame(update);
  }

  function resize() {
    width.value = document.body.clientWidth;
  }

  function drop() {
    const dropPosition = Math.round(
      ((widthRef.current / 2 - 65) / widthRef.current) * 100,
    );
    waveTank.springs[dropPosition].p = -50;
  }

  useEffect(() => {
    widthRef.current = width.value;
  }, [width.value]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    if (props.isDropy) {
      requestIdRef.current = requestAnimationFrame(update);
    }

    globalThis.addEventListener("resize", resize);
    resize();

    return () => {
      globalThis.removeEventListener("resize", resize);
      if (requestIdRef.current !== undefined) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, []);

  // Délai d'affichage initial
  useEffect(() => {
    const timeoutId = setTimeout(() => { setDisplay(true); }, DELAY_DISPLAY_WATERDROP);
    return () => clearTimeout(timeoutId);
  }, []);

  // Infobulle
  useEffect(() => {
    const logo = document.querySelector("#Urarts");
    if (logo) {
      tippy(logo, {
        allowHTML: true,
        content:
          `<p><strong style="font-size:1.3em;text-decoration:underline">Politique de droit d'auteur :</strong></p>
          <p style="margin-top:6px;line-height:1.1">Urarts montre des œuvres d'art du domaine public et tente d'obtenir l'autorisation pour celles protégées par le droit d'auteur.<br>
          Le but de ce site est d'utiliser ces œuvres historiques à des fins d'information et d'éducation.<br>
          Les visuels sont des images à faible résolution non adaptées à un usage commercial.</p>
          <p style="margin-top:8px;line-height:1.1">Veuillez vous adresser au créateur du site via son adresse email
          <a href="mailto:sebastien.flouriot@urarts.art" style="text-decoration:underline">sebastien.flouriot@urarts.art</a>
          en cas de demande ou de litige liés à l'exploitation de ces visuels.</p>`,
        interactive: true,
        offset: [0, -20],
        placement: "top",
        theme: "urarts",
      });
    }
  }, [display]);

  return (
    <>
      {display && (
        <section
          id="dropy-section"
          class={`relative bottom-[-6px] flex justify-center items-center flex-col w-full`}
        >
          <svg
            id="Urarts"
            width="170"
            height="273.41"
            viewBox="0 0 170 273.41"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Urarts logo"
          >
            <g id="A">
              <path
                d="M399.32,327.48c-2.43-7.69-4.76-15-6.36-19.81-2.64-8-8.11-12.82-15-13.35h-.06a18.71,18.71,0,0,0-11.44,3.14,25.54,25.54,0,0,0-8.93,10.21c-6.28,12.64-13,27-15.47,32.35l-.85,1.82A63.45,63.45,0,0,0,330.54,345c-8.5,3.37-15,8.34-18.86,14.35a22.74,22.74,0,0,0-1,23.45,16.84,16.84,0,0,0,14.13,9.53,18.76,18.76,0,0,0,3.18,0,30.16,30.16,0,0,0,16.85-7.54,40.38,40.38,0,0,0,12-18.21,1.5,1.5,0,0,0,0-.3q4.79.25,10.27,1A148.89,148.89,0,0,0,382,368.78c1,2.88,5.28,14.91,10,22.74a17.39,17.39,0,0,0,10.29,8.11,16,16,0,0,0,3,.52,11.93,11.93,0,0,0,6.59-1.22c7.18-4,8.11-11.9,2.94-24.78C411.69,366.23,404.84,344.73,399.32,327.48Zm-31.57,13.19a44.64,44.64,0,0,0,4.36-8.4c.29-.73.56-1.42.79-2a109.09,109.09,0,0,0,2.77,11.1C373.16,341.07,370.52,340.84,367.75,340.67Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #6cbfbf"
              />
              <path
                d="M398.67,368.67l.14-1.78H383.73s2.43,22.22,17.23,29C394,390.46,388.54,374.21,398.67,368.67Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #ef8200"
              />
              <path
                d="M363.15,303.29c-12.41,25.42-7.69,33.63,4.86,34.06-1.95,4-2.05,3.78-2.05,3.78l-24.69.73Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #428e8a"
              />
              <path
                d="M327.44,372.53c10.93-3.32,21.17,5.17,10.44,13.88,2.65.41,16.4-5.33,16.33-21.19C344.28,365.72,332.13,365.75,327.44,372.53Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #428e8a"
              />
              <path
                d="M359.4,343.23c-47.26,6.92-47.34,44.67-31.56,46C305.84,398.57,290.23,338.23,359.4,343.23Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #428e8a"
              />
              <path
                d="M375,348.79c-17-1.78-34.05-2.64-35.92,1.92s3.81,5,15.23,4.69,26.82,2.26,27.92-1.78S378.87,349.18,375,348.79Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #8ad6d4"
              />
              <path
                d="M392.71,388.59l-2.81-6.84h0L413.53,372h0l2.82,6.84a12.78,12.78,0,0,1-7,16.69h0A12.78,12.78,0,0,1,392.71,388.59Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #e57474"
              />
              <rect
                x="386.67"
                y="365.41"
                width="25.57"
                height="11.93"
                transform="translate(-362.05 -57.57) rotate(-22.4)"
                style="fill: #67b0e8"
              />
              <path
                d="M398.1,382.77c3.35,4.28,7.66,9.39,12.83,12.13l-7.28,3a6.55,6.55,0,0,1-8.5-3.56L390,381.77l5.68-2.34C396.44,380.56,397.29,381.66,398.1,382.77Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #c15d5d"
              />
              <path
                d="M395.6,379.43l-5.68,2.34-4.54-11,3.24-1.34Q391.93,374.53,395.6,379.43Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #4f94bf"
              />
              <path
                d="M407.27,356.53,388.09,342s-16.8,12.69-2.81,27.92C400.31,363.49,407.27,356.53,407.27,356.53Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #dadada"
              />
              <path
                d="M379.89,359.71c.76,4.09,3.18,8.5,5.38,10.14,15-6.36,22-13.35,22-13.35S387,360.26,379.89,359.71Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #b3b9b8"
              />
              <path
                d="M405.62,357.19,398.33,350a18.73,18.73,0,0,0-.7,12.14C404.51,358.69,405.62,357.19,405.62,357.19Z"
                transform="translate(-250.67 -237.81)"
                style={`fill: ${props.pencilColor}`}
              />
              <path
                d="M417.53,374.34a2.93,2.93,0,0,0,.26-1.8,2.82,2.82,0,0,0-1.87-2.18c-1-2.33-2-4.64-2.67-6.24a2.84,2.84,0,0,0-1.92-4.71h-.21c-2.72-8.5-7-22.77-9.56-31.13-2.52-8.08-4.85-15.72-6.71-21.19-2.89-8.73-9-14.06-16.68-14.64h-.07a20.54,20.54,0,0,0-12.6,3.45,27.47,27.47,0,0,0-9.61,10.92c-6.34,12.78-13.14,27.1-15.7,32.47l-.44.94a64.7,64.7,0,0,0-9.82,3c-8.84,3.52-15.67,8.74-19.75,15.09a24.58,24.58,0,0,0-1.13,25.33,18.64,18.64,0,0,0,15.66,10.56,22.85,22.85,0,0,0,3.51,0,32,32,0,0,0,17.88-8A41.94,41.94,0,0,0,358,369q3.26.25,6.81.71c1.84.24,3.94.55,6.16.88,3.23.48,6.53,1,9.33,1.28a2.81,2.81,0,0,0,.46,2.3,2.84,2.84,0,0,0,2.09,1.22,3.22,3.22,0,0,0,.76,0c.8,2.17,1.95,5.25,3.19,8.37l-.11.15a2.83,2.83,0,0,0,.39,4h0a2.84,2.84,0,0,0,1.59.63h.07l.09.23c2.7,6.41,4.65,11,9,12.77a8.94,8.94,0,0,0,2.79.65c2.61.19,5.73-.55,9.71-2.26,7.91-3.4,9.58-7.4,10.14-10.12.82-4-.41-8.5-2.64-14.57A3.66,3.66,0,0,1,417.53,374.34Zm-19.18-14.21c-1.68-2.69-.37-5.75.41-7.14,1.83,1.5,3.34,2.91,4.43,4-1.3.88-2.95,2-4.9,3.15Zm-5,2.75a54.33,54.33,0,0,1-8.22,3.36c-2.8-2.9-4.39-8.25-2.08-14.67,1.28-3.52,3.21-5.48,4.65-5.78a51.37,51.37,0,0,1,6.46,3.77,17.14,17.14,0,0,0-1.71,3.78,11.58,11.58,0,0,0,.84,9.6Zm14.13,2.26c.52,1.21,1.55,3.53,2.6,6.07a52.27,52.27,0,0,0-18.77,8.5c-1.12-2.89-2.13-5.59-2.76-7.29,4.31-2.67,11.85-6.59,18.87-7.28ZM361,309.37c3.57-7.19,10.3-11.71,16.72-11.26h0c5.39.41,9.54,4.22,11.7,10.75,1.8,5.43,4.16,13,6.69,21.1,1.87,6,3.83,12.3,5.72,18.21-3.28-2.64-10.58-7.69-14.67-8-1.72-.12-6.21-.51-8.12-.64-1.21-3.94-2.63-10.83-3.13-13.48a2.83,2.83,0,0,0-5.51-.27,53.28,53.28,0,0,1-5.82,12.81l-2.83-.13a89.33,89.33,0,0,0-15.16.6c3.12-6.59,8.91-18.7,14.35-29.69ZM373,339.09l-2-.14c.47-.83.9-1.68,1.32-2.52.15.9.38,1.8.61,2.66Zm-7.54,25.07c-18.3-2.43-31.33-.49-39.89,5.8a2.84,2.84,0,0,0,1.48,5.12,2.74,2.74,0,0,0,1.89-.55c5.28-3.88,12.85-5.76,22.93-5.69a35.83,35.83,0,0,1-9.56,13.09,26.47,26.47,0,0,1-14.66,6.63,13.27,13.27,0,0,1-13.63-7.41,18.85,18.85,0,0,1,.84-19.68c3.44-5.34,9.35-9.79,17.08-12.88a72,72,0,0,1,29.5-4.4c6.19.26,12.65.71,18.35,1.14a20.67,20.67,0,0,0-2.16,4.37A21.73,21.73,0,0,0,378,366c-2-.27-4.21-.6-6.26-.9C369.5,364.69,367.38,364.37,365.5,364.16Zm49.37,24.47c-.33,1.6-1.4,3.73-6.8,6.07-3.95,1.7-6.62,2.21-8.17,1.58-2.14-.87-4.86-7.29-6.43-11a34.91,34.91,0,0,1,3.27-2.37,49.29,49.29,0,0,1,15.47-6.31c.08.25.18.49.27.72,1.83,4.86,2.93,8.74,2.39,11.33Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #141b1e"
              />
            </g>
            <g id="U">
              <path
                d="M346.33,305.7a11.46,11.46,0,0,0-4.32-8.33,17,17,0,0,0-10.93-3.49c-.11-.45-.2-.84-.3-1.21A17.87,17.87,0,0,0,323,281.74a20.1,20.1,0,0,0-12.14-3,19.31,19.31,0,0,0-11.15,4.44,17.24,17.24,0,0,0-5.86,11.46c-.6,5.66-.15,13.6,5.43,19.35a17.75,17.75,0,0,0,6.65,4.35c-.31,10.15-2.24,17-5.77,20.64a10.27,10.27,0,0,1-8.87,2.79,10,10,0,0,1-7.64-4.36,27.87,27.87,0,0,1-4.37-19.13l-23.77-2.55c-1.16,11.53-3.65,26.22.59,33.79C262,360,272.83,366.1,288.39,367.77s27.15-2.07,35-11.09c6.45-7.44,10.05-18.21,10.72-32.05.11-2.35.13-4.66.09-6.91C342.86,316.81,346.57,310.91,346.33,305.7Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #e57474"
              />
              <path
                d="M265.52,316.81l-9.62-1c-14.84,40.62,27.6,60.52,57.15,45.16C275,371.63,260.32,345.22,265.52,316.81Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #b73e3e"
              />
              <path
                d="M296.63,295.47c.72,6.46,6.93,5.35,7.62,3.39s1.53,18.45,1.53,18.45S292.38,312.1,296.63,295.47Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #b73e3e"
              />
              <path
                d="M336.93,296c-3,11.3,7.23,12.41,7.23,12.41s-3,7.67-10,8.66c-.8-9.83-2.2-22-2.2-22Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #b73e3e"
              />
              <path
                d="M321.36,333c-12,34.55-45.32,19.66-52,15.63s-6.42-.28-2.28,4,23.06,13.09,40.35,7.95,19-23.95,19-28.92S323.29,327.46,321.36,333Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #ef8989"
              />
              <path
                d="M316.36,284.74c-15.06-2.25-18.21,9.12-17.52,13.16s1.78,1.41,2.59-1.14,4.78-7.7,14.31-6.37C324.72,291.64,322.67,285.67,316.36,284.74Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #ef8989"
              />
              <path
                d="M343.12,296a18.13,18.13,0,0,0-10.67-3.85A19.57,19.57,0,0,0,324,280.32a21.8,21.8,0,0,0-13.21-3.23A21,21,0,0,0,298.61,282a18.92,18.92,0,0,0-6.45,12.6c-1.21,10.92,2.56,17.31,5.91,20.76a20.19,20.19,0,0,0,6.07,4.28c-.08,1.88-.23,3.64-.43,5.28-.77,6.16-2.43,10.5-4.86,12.92a8.57,8.57,0,0,1-7.44,2.29,11.34,11.34,0,0,1-8.82-6.45c-2.13-4-2.94-9.53-2.29-15.53a2.63,2.63,0,1,0-5.22-.57h0c-1.64,15.17,4.86,26.6,15.78,27.76a13.64,13.64,0,0,0,11.72-3.8c6.41-6.42,8.29-20.71,5.76-43.7a2.63,2.63,0,0,0-5.22.57q.93,8.5,1.05,15.27a14.37,14.37,0,0,1-2.6-2.2c-3.64-3.82-5.05-9.32-4.28-16.35.93-8.77,8-12.37,13.76-12.78,6.54-.47,14.11,2.82,16.26,11.23.12.47.25,1,.41,1.67a1.13,1.13,0,0,0,0,.26,113.9,113.9,0,0,1,2.78,21.05,2.81,2.81,0,0,0,0,.58,2.54,2.54,0,0,0,0,.39c.06,2.26,0,4.59-.07,7a66.78,66.78,0,0,1-2.7,16.42,37.29,37.29,0,0,1-7,13.57c-7,8.1-17.76,11.44-32,9.91a47.53,47.53,0,0,1-18.37-5.4A27.63,27.63,0,0,1,260,349c-5.48-9.29-5.33-22.46.41-36.14a2.64,2.64,0,1,0-4.86-2,59.42,59.42,0,0,0-4.85,21.29,36.24,36.24,0,0,0,4.73,19.55,32.83,32.83,0,0,0,12.34,11.89,52.45,52.45,0,0,0,20.38,6.07c16,1.73,28.28-2.21,36.49-11.69,6.7-7.74,10.45-18.87,11.14-33.1.09-1.86.12-3.64.11-5.49a15.71,15.71,0,0,0,8.5-4.3,12.38,12.38,0,0,0,3.64-9.32A13.33,13.33,0,0,0,343.12,296Zm-7.34,17.88a119.73,119.73,0,0,0-2.11-16.34c6.07.86,9,4.67,9.16,8.3.21,4.4-3.08,7-7.05,8Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #141b1e"
              />
              <path
                d="M278.62,317.47c-3,2.7-20.4-.22-22.46-5.06A229,229,0,0,1,274.46,280,164.41,164.41,0,0,1,278.62,317.47Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #e5c76b"
              />
              <path
                d="M268.54,318c4.48.71,8.73.64,10.08-.57a164.56,164.56,0,0,0-4.16-37.53S270.46,312.88,268.54,318Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #c6a554"
              />
              <path
                d="M262.51,297.39c-8.5-14.4,10.56-23,14.56-35.62,11.69,13.28,13,29,1.58,38.48C275.5,303,266.57,304.3,262.51,297.39Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #dadada"
              />
              <path
                d="M264.8,282.24c5,9.61,16.78,8.23,19.42-5.51,3.85,15.69-6.89,26.4-15.36,23.73S261,287.57,264.8,282.24Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #b3b9b8"
              />
              <path
                d="M270.36,320.93a43.11,43.11,0,0,1-4.66-.77c-3.74-.82-10.28-2.8-12-6.73a2.64,2.64,0,0,1,0-2.1c2-4.45,4.35-9.16,7-14a2.62,2.62,0,1,1,4.6,2.53h0c-2.32,4.22-4.39,8.31-6.19,12.2a15.08,15.08,0,0,0,4.6,2.18,30.36,30.36,0,0,0,12.22,1.5,136.44,136.44,0,0,0-.74-14.57,2.62,2.62,0,0,1,5.22-.53,139.88,139.88,0,0,1,.74,17,2.6,2.6,0,0,1-.86,1.89C278.29,321.3,273.87,321.3,270.36,320.93Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #141b1e"
              />
              <path
                d="M270,305l-.89-.12a12.57,12.57,0,0,1-8.88-6.07h0a15.62,15.62,0,0,1-1.3-14.57c1.66-4.11,4.86-7.82,7.85-11.4s6.49-7.63,7.79-11.71a2.63,2.63,0,0,1,3.31-1.71,2.59,2.59,0,0,1,1.16.76c7.14,8.12,10.72,17.24,10.06,25.65a23.61,23.61,0,0,1-8.77,16.5A14.57,14.57,0,0,1,270,305Zm-5.26-8.9a7.29,7.29,0,0,0,5.27,3.64,9.6,9.6,0,0,0,7-1.41,18.37,18.37,0,0,0,6.89-13c.48-5.92-1.7-12.38-6.14-18.5a59.06,59.06,0,0,1-6.94,9.32c-6.52,7.69-10.31,12.75-6.07,19.95Z"
                transform="translate(-250.67 -237.81)"
                style="fill: #141b1e"
              />
            </g>
            <path
              d={juice}
              fill={props.color}
            />
            <circle
              cx="18"
              cy={dropy.value}
              r="4"
              fill={props.color}
            >
            </circle>
          </svg>

          <svg
            width="100%"
            height="30px"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon
              points={springsPath}
              fill={props.color}
              transform="translate(0, 50)"
            >
            </polygon>
          </svg>
        </section>
      )}
    </>
  );
}
