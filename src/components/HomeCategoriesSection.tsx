"use client";

import { useEffect, useRef, useState } from "react";
import CategoryCard from "@/components/CategoryCard";

type Category = {
  category_name: string;
  slug: string;
  image_url: string;
};

type HomeCategoriesSectionProps = {
  categories: Category[];
};

export default function HomeCategoriesSection({ categories }: HomeCategoriesSectionProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const targetRef = useRef<number | null>(null);
  const [bounds, setBounds] = useState({ start: true, end: true });

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateBounds = () => {
      setBounds({
        start: viewport.scrollLeft <= 1,
        end: viewport.scrollLeft >= viewport.scrollWidth - viewport.clientWidth - 1,
      });
    };
    const cancelAnimation = () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      targetRef.current = null;
    };
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimation();
      updateBounds();
    });
    resizeObserver.observe(viewport);
    viewport.addEventListener("scroll", updateBounds, { passive: true });
    viewport.addEventListener("pointerdown", cancelAnimation, { passive: true });
    viewport.addEventListener("wheel", cancelAnimation, { passive: true });
    updateBounds();

    return () => {
      cancelAnimation();
      resizeObserver.disconnect();
      viewport.removeEventListener("scroll", updateBounds);
      viewport.removeEventListener("pointerdown", cancelAnimation);
      viewport.removeEventListener("wheel", cancelAnimation);
    };
  }, [categories.length]);

  function moveCategory(direction: number) {
    const viewport = viewportRef.current;
    const firstCard = viewport?.firstElementChild;
    if (!viewport || !firstCard) return;

    const step = firstCard.getBoundingClientRect().width + parseFloat(getComputedStyle(viewport).columnGap);
    const from = viewport.scrollLeft;
    const target = Math.max(0, Math.min(
      viewport.scrollWidth - viewport.clientWidth,
      (targetRef.current ?? Math.round(from / step) * step) + direction * step,
    ));
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    targetRef.current = target;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      viewport.scrollLeft = target;
      targetRef.current = null;
      animationRef.current = null;
      return;
    }

    const started = performance.now();
    function animate(now: number) {
      const progress = Math.min((now - started) / 350, 1);
      const eased = (1 - Math.cos(Math.PI * progress)) / 2;
      viewport!.scrollLeft = from + (target - from) * eased;
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
        targetRef.current = null;
      }
    }
    animationRef.current = requestAnimationFrame(animate);
  }

  const arrowClassName = "flex size-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#f9fbff] text-[#587b96] shadow-[0_10px_24px_rgba(102,143,190,0.22)] transition hover:bg-white hover:shadow-[0_10px_28px_rgba(102,143,190,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d2338] disabled:cursor-default disabled:text-[#587b96]/50";

  return (
    <section className="bg-transparent py-12 sm:py-16" aria-labelledby="categories-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-7">
          <h2 id="categories-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-[#10243a]">
            Choisissez votre univers
          </h2>
          <p className="mt-3 text-[#52616b]">Un raccourci vers l’histoire qui vous ressemble aujourd’hui.</p>
        </div>

        <div className="flex min-w-0 items-center gap-3" role="region" aria-roledescription="carrousel" aria-label="Catégories d’histoires">
          <button type="button" className={arrowClassName} disabled={bounds.start} onClick={() => moveCategory(-1)} aria-label="Catégorie précédente" aria-controls="home-categories-list">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>
          <div
            ref={viewportRef}
            id="home-categories-list"
            className="grid min-w-0 flex-1 auto-cols-[120px] grid-flow-col gap-[10px] overflow-x-auto overscroll-x-contain py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                href={`/biblioteque?categorie=${category.slug}`}
                imageSrc={category.image_url}
                imageAlt={`Illustration de la catégorie ${category.category_name}`}
              />
            ))}
          </div>
          <button type="button" className={arrowClassName} disabled={bounds.end} onClick={() => moveCategory(1)} aria-label="Catégorie suivante" aria-controls="home-categories-list">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
