"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/images/Промышленное остекление балконов/IMG_1862.jpg", alt: "Здание со стеклянными балконными ограждениями" },
  { src: "/images/Фото Новгород/IMG_1334.jpg", alt: "Стеклянное ограждение в Новгородской технической школе" },
  { src: "/images/Фото Новгород/IMG-1279.jpg", alt: "Стеклянное лестничное ограждение в современном интерьере" },
  { src: "/images/Промышленное остекление балконов/IMG_1865.jpg", alt: "Фасад со стеклянными ограждениями балконов" },
];

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
            <Image src={slide.src} alt={slide.alt} fill priority={index === 0} sizes="100vw" />
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
