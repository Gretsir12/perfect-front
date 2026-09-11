"use client";

import { SiteImage as Image } from "@/components/site/SiteImage";
import { useEffect, useState } from "react";
import { siteImages } from "@/content/image-registry";

const slides = siteImages.home.slides;

const SLIDE_DURATION = 10_000;

export function HeroImageSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(
      () => setActiveSlide((current) => (current + 1) % slides.length),
      SLIDE_DURATION,
    );

    return () => window.clearTimeout(timer);
  }, [activeSlide]);

  return (
    <>
      <div className="hero-image-slider">
        {slides.map((slide, index) => (
          <div
            aria-hidden={index !== activeSlide}
            className={index === activeSlide ? "hero-image-slide active" : "hero-image-slide"}
            key={slide.src}
          >
            <Image src={slide.src} alt={slide.alt} fill preload={index === 0} sizes="100vw" />
          </div>
        ))}
      </div>
      <div className="slide-counter" aria-hidden="true">
        <b>{String(activeSlide + 1).padStart(2, "0")}</b>
        <i />
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
      <div className="hero-slide-dots" role="group" aria-label="Фотографии на главном экране">
        {slides.map((slide, index) => (
          <button
            aria-label={`Показать: ${slide.alt}`}
            aria-pressed={index === activeSlide}
            key={slide.src}
            onClick={() => setActiveSlide(index)}
            type="button"
          />
        ))}
      </div>
    </>
  );
}
