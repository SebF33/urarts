import {
  Chart,
  ChartDataset,
  ChartOptions,
  defaults,
  registerables,
} from "chartjs";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { useEffect, useLayoutEffect, useRef } from "preact/hooks";

export default function Doughnut(
  props: {
    countResult: number[];
    nationalityResult: string[];
    totalArtistCountResult: number[];
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
        text: props.totalArtistCountResult +
          " artistes disponibles par nationalité",
      },
    },
  };

  useEffect(() => {
    if (!canvas.current) return;

    Chart.register(...registerables);
    new Chart(canvas.current, {
      type: "doughnut",
      options: options,
      data: {
        labels: props.nationalityResult,
        datasets: [
          {
            data: props.countResult,
            backgroundColor: [
              `${colorScheme[currentColorScheme].lighterdark}`,
              `${colorScheme[currentColorScheme].gray}`,
              `${colorScheme[currentColorScheme].yellow}`,
              `${colorScheme[currentColorScheme].red}`,
              `${colorScheme[currentColorScheme].blue}`,
              `${colorScheme[currentColorScheme].green}`,
            ],
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
