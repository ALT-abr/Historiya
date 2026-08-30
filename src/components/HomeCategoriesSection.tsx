"use client";

import { useState } from "react";
import CategoryCard from "@/components/CategoryCard";

type Category = {
  category_name: string;
  slug: string;
  image_url: string;
};

type HomeCategoriesSectionProps = {
  categories: Category[];
};

const visibleCategoryCount = 8;

export default function HomeCategoriesSection({ categories }: HomeCategoriesSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const hasHiddenCategories = categories.length > visibleCategoryCount;
  const displayedCategories = showAll ? categories : categories.slice(0, visibleCategoryCount);

  return (
    <section className="bg-transparent py-12 sm:py-16" aria-labelledby="categories-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-7 flex items-center justify-between gap-4">
          <h2 id="categories-title" className="text-2xl font-bold tracking-tight text-[#10243a]">
            Catégories populaires
          </h2>
          {hasHiddenCategories && (
            <button
              type="button"
              aria-expanded={showAll}
              aria-controls="home-categories-list"
              onClick={() => setShowAll((currentValue) => !currentValue)}
              className="cursor-pointer text-sm font-semibold text-[#315e78] transition hover:text-[#0d2338]"
            >
              {showAll ? "Voir moins" : "Voir toutes"}
            </button>
          )}
        </div>

        <div id="home-categories-list" className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {displayedCategories.map((category) => (
            <CategoryCard
              key={category.slug}
              href={`/biblioteque?categorie=${category.slug}`}
              imageSrc={category.image_url}
              imageAlt={`Illustration de la catégorie ${category.category_name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
