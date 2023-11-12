import {
  Chart,
  ChartDataset,
  ChartOptions,
  defaults,
  registerables,
} from "chartjs";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { useEffect, useRef } from "preact/hooks";

export default function PolarArea(
  props: {
    countResult: number[];
    nameResult: string[];
    totalArtCountResult: number[];
  },
) {
  const canvas = useRef<HTMLCanvasElement>(null);

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
        text: props.totalArtCountResult +
          " œuvres d’art disponibles par mouvement",
      },
    },
  };

  useEffect(() => {
    if (!canvas.current) return;

    Chart.register(...registerables);
    new Chart(canvas.current, {
      type: "polarArea",
      options: options,
      data: {
        labels: props.nameResult,
        datasets: [
          {
            data: props.countResult,
            backgroundColor: [
              `${colorScheme[currentColorScheme].lighterdark}`,
              `${colorScheme[currentColorScheme].gray}`,
              `${colorScheme[currentColorScheme].red}`,
              `${colorScheme[currentColorScheme].green}`,
              `${colorScheme[currentColorScheme].yellow}`,
              `${colorScheme[currentColorScheme].blue}`,
              `${colorScheme[currentColorScheme].magenta}`,
              `${colorScheme[currentColorScheme].cyan}`,
            ],
            borderColor: `${colorScheme[currentColorScheme].white}`,
          } as ChartDataset,
        ],
      },
    });
  }, []);

  return <canvas ref={canvas}></canvas>;
}
