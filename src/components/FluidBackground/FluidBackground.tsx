import React from "react";
import { useEffect, useRef } from "react";
import "./FluidBackground.scss";

export const FluidBackground = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/fluid.js";
    script.async = true;

    script.onload = () => {
      // @ts-ignore
      window.initFluidSimulation?.(canvasRef.current);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <canvas ref={canvasRef} id="fluid-canvas" />;
});
