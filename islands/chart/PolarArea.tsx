import { Any } from "any";
import {
  Chart,
  ChartDataset,
  ChartOptions,
  defaults,
  registerables,
} from "chartjs";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { DELAY_REACH_HREF } from "@utils/constants.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { languageSignal } from "@utils/signals.ts";
import { useEffect, useRef } from "preact/hooks";

export default function PolarArea(
  props: {
    readonly countResult: number[];
    readonly nameResult: string[];
    readonly totalArtCountResult: number[];
    readonly valueResult: string[];
  },
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const lng = languageSignal.value;

  // Options
  defaults.font.family = "Caveat Brush";
  const options: ChartOptions = {
    plugins: {
      legend: {
        onHover: (event: Any) => {
          (event?.native?.target as HTMLElement).style.cursor = "pointer";
        },
        position: "top",
      },
      title: {
        display: true,
        font: { size: 19 },
        fullSize: false,
        text: props.totalArtCountResult + " " + i18next.t("indicator.polararea_title", { ns: "translation" }),
      },
    },
    onClick: (event: Any) => {
      if (chartInstanceRef.current) {
        const elements = chartInstanceRef.current.getElementsAtEventForMode(
          event,
          'nearest',
          { intersect: true },
          false
        );

        if (elements.length > 0) {
          const customDataValue = chartInstanceRef.current.data.datasets[elements[0].datasetIndex].customData[elements[0].index];
          let href;
          if (customDataValue === 'movements')  href = '/' + customDataValue;
          else  href = '/movement/' + customDataValue;
          setTimeout(() => { window.location.href = href; }, DELAY_REACH_HREF);
        }
      }
    }
  };
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
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

    chartInstanceRef.current = new Chart(canvasRef.current, {
      type: "polarArea",
      options: options,
      data: {
        labels: props.nameResult,
        datasets: [
          {
            data: props.countResult,
            backgroundColor: backgroundColor,
            borderColor: `${colorScheme[currentColorScheme].white}`,
            customData: props.valueResult,
          } as ChartDataset,
        ],
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [lng]);

  return <canvas ref={canvasRef}></canvas>;
}
