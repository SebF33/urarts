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
import { useEffect, useRef } from "preact/hooks";

export default function PolarArea(
  props: {
    readonly countResult: number[];
    readonly nameResult: string[];
    readonly totalArtCountResult: number[];
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
        font: {
          size: 19,
        },
        fullSize: false,
        text: props.totalArtCountResult + " " + i18next.t("indicator.polararea_title", { ns: "translation" }),
      },
    },
  };
  
  useEffect(() => {
    if (!canvas.current) return;
    
    let backgroundColor: string[] = [];
  
    if (lng === 'en') {
      backgroundColor = [
        `${colorScheme[currentColorScheme].lighterdark}`,
        `${colorScheme[currentColorScheme].red}`,
        `${colorScheme[currentColorScheme].green}`,
        `${colorScheme[currentColorScheme].yellow}`,
        `${colorScheme[currentColorScheme].blue}`,
        `${colorScheme[currentColorScheme].gray}`,
        `${colorScheme[currentColorScheme].magenta}`,
        `${colorScheme[currentColorScheme].cyan}`,
      ]
    }
    if (lng === 'fr') {
      backgroundColor = [
        `${colorScheme[currentColorScheme].lighterdark}`,
        `${colorScheme[currentColorScheme].gray}`,
        `${colorScheme[currentColorScheme].red}`,
        `${colorScheme[currentColorScheme].green}`,
        `${colorScheme[currentColorScheme].yellow}`,
        `${colorScheme[currentColorScheme].blue}`,
        `${colorScheme[currentColorScheme].magenta}`,
        `${colorScheme[currentColorScheme].cyan}`,
      ]
    }

    Chart.register(...registerables);
    new Chart(canvas.current, {
      type: "polarArea",
      options: options,
      data: {
        labels: props.nameResult,
        datasets: [
          {
            data: props.countResult,
            backgroundColor: backgroundColor,
            borderColor: `${colorScheme[currentColorScheme].white}`,
          } as ChartDataset,
        ],
      },
    });
  }, []);

  return <canvas ref={canvas}></canvas>;
}
