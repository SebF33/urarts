import {
  Chart,
  ChartDataset,
  ChartOptions,
  defaults,
  registerables,
} from "chartjs";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { languageSignal } from "@utils/signals.ts";
import { useEffect, useLayoutEffect, useRef } from "preact/hooks";

export default function Doughnut(
  props: {
    readonly countResult: number[];
    readonly nationalityResult: string[];
    readonly totalArtistCountResult: number[];
  },
) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const lng = languageSignal.value;

  // Options
  defaults.font.family = "Caveat Brush";
  const options: ChartOptions = {
    plugins: {
      legend: {
        onHover: (event, legendItem, legend) => {
          (event?.native?.target as HTMLElement).style.cursor = "pointer";
        },
        position: "top",
      },
      title: {
        display: true,
        font: { size: 19 },
        fullSize: false,
        text: props.totalArtistCountResult + " " + i18next.t("indicator.doughnut_title", { ns: "translation" }),
      },
    },
  };

  useEffect(() => {
    if (!canvas.current) return;

    let backgroundColor: string[] = [];
  
    if (lng === 'en') {
      backgroundColor = [
        `${colorScheme[currentColorScheme].yellow}`,
        `${colorScheme[currentColorScheme].blue}`,
        `${colorScheme[currentColorScheme].lighterdark}`,
        `${colorScheme[currentColorScheme].green}`,
        `${colorScheme[currentColorScheme].gray}`,
        `${colorScheme[currentColorScheme].red}`,
      ]
    }
    if (lng === 'fr') {
      backgroundColor = [
        `${colorScheme[currentColorScheme].lighterdark}`,
        `${colorScheme[currentColorScheme].gray}`,
        `${colorScheme[currentColorScheme].yellow}`,
        `${colorScheme[currentColorScheme].red}`,
        `${colorScheme[currentColorScheme].blue}`,
        `${colorScheme[currentColorScheme].green}`,
      ]
    }

    Chart.register(...registerables);
    new Chart(canvas.current, {
      type: "doughnut",
      options: options,
      data: {
        labels: props.nationalityResult,
        datasets: [
          {
            data: props.countResult,
            backgroundColor: backgroundColor,
            borderColor: `${colorScheme[currentColorScheme].white}`,
            hoverOffset: 1,
          } as ChartDataset,
        ],
      },
    });
  }, []);

  // Background pour la page des indicateurs
  useLayoutEffect(() => {
    const body = document.querySelector("body");
    const main = document.querySelector<HTMLElement>('[data-name="indicators"]');

    if (body) {
      body.style.backgroundColor = colorScheme[currentColorScheme].white;
    }

    if (main) {
      main.style.background = `url(/background/gray)`;
      main.style.backgroundAttachment = "local";
      main.style.backgroundPosition = "center";
      main.style.backgroundSize = "2800px";
    }
  }, []);

  return <canvas ref={canvas}></canvas>;
}
