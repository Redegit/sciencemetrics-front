import React, { useEffect, useState } from "react";
import styles from "./GraphComponent.module.css";

interface ZoomControlsProps {
  chartRef: React.RefObject<any>;
}

export const GraphZoomControls = React.memo<ZoomControlsProps>(
  ({ chartRef }) => {
    const [sliderValue, setSliderValue] = useState(50);

    const zoomFromSlider = (value: number) => Math.pow(10, (value - 50) / 25);
    const sliderFromZoom = (zoom: number) => 25 * Math.log10(zoom) + 50;

    const applyZoom = (zoom: number) => {
      const chart = chartRef.current?.getEchartsInstance();
      chart?.setOption({
        series: [{ zoom }],
      });
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      setSliderValue(value);
      applyZoom(zoomFromSlider(value));
    };

    const zoomStep = 1.1;

    const handleZoomIn = () => {
      const newZoom = zoomFromSlider(sliderValue) * zoomStep;
      const newSlider = sliderFromZoom(newZoom);
      setSliderValue(newSlider);
      applyZoom(newZoom);
    };

    const handleZoomOut = () => {
      const newZoom = zoomFromSlider(sliderValue) / zoomStep;
      const newSlider = sliderFromZoom(newZoom);
      setSliderValue(newSlider);
      applyZoom(newZoom);
    };

    useEffect(() => {
      const chart = chartRef.current?.getEchartsInstance();

      chart.on("graphRoam", () => {
        const zoom = chart.getOption().series?.[0]?.zoom;
        const newSlider = sliderFromZoom(zoom);
        setSliderValue(newSlider);
      });

      chart.on("restore", () => {
        setSliderValue(50);
      });
    }, [chartRef]);

    return (
      <div className={styles.graph_controls__container}>
        <button
          onClick={handleZoomIn}
          className={styles.graph_controls__button}
        >
          <ZoomInSvg />
        </button>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={sliderValue}
          onChange={handleSliderChange}
          className={styles.graph_controls__slider}
        />
        <button
          onClick={handleZoomOut}
          className={styles.graph_controls__button}
        >
          <ZoomOutSvg />
        </button>
      </div>
    );
  }
);

const ZoomOutSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="3.808 3.769 16.18 16.19">
      <path
        d="m 9.038 10 h -1.384 q -0.213 0 -0.356 -0.144 q -0.144 -0.144 -0.144 -0.357 t 0.144 -0.356 q 0.142 -0.143 0.356 -0.143 h 1.384 t 1 0 v 0 h 1.385 q 0.213 0 0.356 0.144 q 0.144 0.144 0.144 0.357 t -0.144 0.356 q -0.143 0.143 -0.356 0.143 h -1.385 v 0 z m 0.5 5.23 q -2.402 0 -4.066 -1.662 q -1.664 -1.664 -1.664 -4.065 t 1.662 -4.067 q 1.663 -1.667 4.064 -1.667 q 2.402 0 4.068 1.664 q 1.666 1.664 1.666 4.067 q 0 1.042 -0.369 2.017 q -0.37 0.975 -0.97 1.668 l 5.908 5.907 q 0.14 0.14 0.15 0.345 q 0.01 0.203 -0.15 0.363 q -0.16 0.16 -0.353 0.16 q -0.195 0 -0.354 -0.16 l -5.908 -5.908 q -0.75 0.639 -1.725 0.989 q -0.975 0.35 -1.96 0.35 z m 0 -1 q 1.99 0 3.361 -1.37 q 1.37 -1.37 1.37 -3.36 q 0 -1.99 -1.37 -3.36 q -1.37 -1.37 -3.36 -1.37 q -1.99 0 -3.361 1.37 q -1.37 1.37 -1.37 3.36 q 0 1.99 1.37 3.36 q 1.37 1.37 3.36 1.37 z"
        fill="#000000"
      />
    </svg>
  );
};

const ZoomInSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="3.808 3.769 16.18 16.19">
      <path
        d="M9.038 10H7.654q-.213 0-.356-.144q-.144-.144-.144-.357t.144-.356Q7.44 9 7.654 9h1.384V7.615q0-.212.144-.356t.357-.144q.213 0 .356.144t.143.356V9h1.385q.213 0 .356.144q.144.144.144.357t-.144.356q-.143.143-.356.143h-1.385v1.385q0 .212-.143.356t-.357.144q-.213 0-.356-.144q-.144-.144-.144-.356V10Zm.5 5.23q-2.402 0-4.066-1.662q-1.664-1.664-1.664-4.065T5.47 5.436q1.663-1.667 4.064-1.667q2.402 0 4.068 1.664q1.666 1.664 1.666 4.067q0 1.042-.369 2.017q-.37.975-.97 1.668l5.908 5.907q.14.14.15.345q.01.203-.15.363q-.16.16-.353.16q-.195 0-.354-.16l-5.908-5.908q-.75.639-1.725.989q-.975.35-1.96.35Zm0-1q1.99 0 3.361-1.37q1.37-1.37 1.37-3.36q0-1.99-1.37-3.36q-1.37-1.37-3.36-1.37q-1.99 0-3.361 1.37q-1.37 1.37-1.37 3.36q0 1.99 1.37 3.36q1.37 1.37 3.36 1.37Z"
        fill="#000000"
      />
    </svg>
  );
};
