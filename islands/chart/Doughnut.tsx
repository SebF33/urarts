import { Chart, defaults, registerables } from "chartjs";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { DELAY_CHART_REACH_HREF } from "@utils/constants.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
import { useEffect, useLayoutEffect, useRef } from "preact/hooks";


export default function Doughnut(
  props: {
    readonly countResult: number[];
    readonly nationalityResult: string[];
    readonly totalArtistCountResult: number[];
    readonly valueResult: string[];
  },
) {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const lng = i18next.language;


  // Options
  defaults.font.family = "Caveat Brush";
  const options = {
    layout: {
      padding: { bottom: 16 }
    },
    plugins: {
      legend: {
        labels: {
          font: { size: 13 }
        },
        position: "top",
      },
      title: {
        display: true,
        font: { size: 21 },
        fullSize: false,
        text: props.totalArtistCountResult + " " + i18next.t("indicator.doughnut_title", { ns: "translation" }),
      },
      tooltip: {
        bodyFont: { size: 16 },
        titleFont: { size: 16 }
      },
    },
    onClick: (event: MouseEvent) => {
      if (chartInstanceRef.current) {
        const elements = chartInstanceRef.current.getElementsAtEventForMode(
          event,
          'nearest',
          { intersect: true },
          false
        );

        if (elements.length > 0) {
          const customDataValue = chartInstanceRef.current.data.datasets[elements[0].datasetIndex].customData[elements[0].index];
          const href = '/artists?nationality=' + customDataValue;
          setTimeout(() => { window.location.href = href; }, DELAY_CHART_REACH_HREF);
        }
      }
    }
  };


  useEffect(() => {
    if (!canvasRef.current) return;

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

    chartInstanceRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      options: options,
      data: {
        labels: props.nationalityResult,
        datasets: [
          {
            data: props.countResult,
            backgroundColor: backgroundColor,
            borderColor: `${colorScheme[currentColorScheme].white}`,
            customData: props.valueResult,
            hoverOffset: 12,
          }
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


  return <canvas ref={canvasRef} class="mb-8"></canvas>;
}
