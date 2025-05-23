import { Chart, defaults, registerables } from "chartjs";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { DELAY_CHART_REACH_HREF } from "@utils/constants.ts";
import i18next from "i18next";
import "@utils/i18n/config.ts";
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
        text: props.totalArtCountResult + " " + i18next.t("indicator.polararea_title", { ns: "translation" }),
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
          let href;
          if (customDataValue === 'movements')  href = '/' + customDataValue;
          else  href = '/movement/' + customDataValue;
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
            hoverOffset: 2,
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


  return <canvas ref={canvasRef}></canvas>;
}
