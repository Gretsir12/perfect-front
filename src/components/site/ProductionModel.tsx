"use client";

import { useEffect, useRef } from "react";

/** Recreates the textured, animated 3D badge from the original production section. */
export function ProductionModel() {
  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const model = modelRef.current;
    if (!model) return;

    let inView = false;
    const update = () => {
      model.dataset.active = String(inView && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });

    observer.observe(model);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div className="production-model" ref={modelRef}>
      <div className="production-model-disc" role="img" aria-label="Моделирование 3D проектов">
        <div className="production-model-text" aria-hidden="true">
          <span>моделирование</span>
          <strong>3D</strong>
          <span>проектов</span>
        </div>
      </div>
    </div>
  );
}
