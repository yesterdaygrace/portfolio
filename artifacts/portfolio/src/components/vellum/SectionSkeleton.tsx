import React from "react";

interface SectionSkeletonProps {
  sectionId: string;
  className?: string;
}

export function SectionSkeleton({ sectionId, className = "" }: SectionSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none w-full vellum-skeleton-container ${className}`}
    >
      {/* Chapter Bar Wireframe */}
      <div className="flex items-baseline justify-between border-b border-[var(--c-border)] pb-3 mb-10 opacity-70">
        <div className="flex items-center gap-3">
          <div className="h-3 w-10 vellum-skeleton-bar" />
          <div className="h-3 w-32 vellum-skeleton-bar" />
        </div>
        <div className="h-3 w-24 vellum-skeleton-bar hidden sm:block" />
      </div>

      {/* Top Kicker & Title Wireframe */}
      <div className="mb-10 max-w-2xl space-y-3">
        <div className="h-2.5 w-36 vellum-skeleton-bar opacity-80" />
        <div className="h-8 sm:h-12 w-3/4 vellum-skeleton-bar" />
        <div className="h-4 w-full vellum-skeleton-bar opacity-60" />
        <div className="h-4 w-2/3 vellum-skeleton-bar opacity-50" />
      </div>

      {/* Section-specific blueprint wireframes */}
      {sectionId === "about" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-7 space-y-4">
            <div className="h-20 w-full vellum-skeleton-box p-4 space-y-2">
              <div className="h-3 w-5/6 vellum-skeleton-bar" />
              <div className="h-3 w-4/6 vellum-skeleton-bar" />
            </div>
            <div className="h-3 w-full vellum-skeleton-bar opacity-60" />
            <div className="h-3 w-4/5 vellum-skeleton-bar opacity-60" />
          </div>
          <div className="lg:col-span-5 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 w-full vellum-skeleton-box flex items-center px-4 justify-between">
                <div className="h-3 w-20 vellum-skeleton-bar opacity-75" />
                <div className="h-3 w-32 vellum-skeleton-bar" />
              </div>
            ))}
          </div>
        </div>
      )}

      {sectionId === "experience" && (
        <div className="space-y-8 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 vellum-skeleton-box">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-6 w-24 vellum-skeleton-bar" />
                <div className="h-2.5 w-32 vellum-skeleton-bar opacity-70" />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-5 vellum-skeleton-box space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 w-40 vellum-skeleton-bar" />
                  <div className="h-3 w-24 vellum-skeleton-bar opacity-60" />
                </div>
                <div className="h-3 w-full vellum-skeleton-bar opacity-70" />
                <div className="h-3 w-3/4 vellum-skeleton-bar opacity-50" />
              </div>
            ))}
          </div>
        </div>
      )}

      {sectionId === "systems" && (
        <div className="space-y-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-40 vellum-skeleton-box p-4 space-y-2">
              <div className="h-3 w-28 vellum-skeleton-bar opacity-80" />
              <div className="h-5 w-48 vellum-skeleton-bar" />
              <div className="h-3 w-full vellum-skeleton-bar opacity-60" />
            </div>
            <div className="h-40 vellum-skeleton-box p-4 space-y-2">
              <div className="h-3 w-28 vellum-skeleton-bar opacity-80" />
              <div className="h-5 w-48 vellum-skeleton-bar" />
              <div className="h-3 w-full vellum-skeleton-bar opacity-60" />
            </div>
          </div>
          <div className="p-4 vellum-skeleton-box space-y-3">
            <div className="h-3 w-36 vellum-skeleton-bar opacity-70" />
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-14 vellum-skeleton-bar opacity-80" />
              ))}
            </div>
          </div>
        </div>
      )}

      {sectionId === "stack" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-5 vellum-skeleton-box space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-32 vellum-skeleton-bar" />
                <div className="h-3 w-16 vellum-skeleton-bar opacity-60" />
              </div>
              <div className="space-y-2 pt-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-3 w-full vellum-skeleton-bar opacity-50" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {sectionId === "projects" && (
        <div className="space-y-6 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 vellum-skeleton-box items-center">
            <div className="lg:col-span-6 space-y-3">
              <div className="h-5 w-48 vellum-skeleton-bar" />
              <div className="h-3 w-full vellum-skeleton-bar opacity-70" />
              <div className="h-3 w-3/4 vellum-skeleton-bar opacity-60" />
              <div className="h-7 w-28 vellum-skeleton-bar pt-2" />
            </div>
            <div className="lg:col-span-6 h-36 vellum-skeleton-bar opacity-80" />
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 vellum-skeleton-box flex items-center px-4 justify-between">
                <div className="h-3 w-32 vellum-skeleton-bar" />
                <div className="h-3 w-16 vellum-skeleton-bar opacity-50" />
              </div>
            ))}
          </div>
        </div>
      )}

      {sectionId === "contact" && (
        <div className="space-y-6 mb-12 max-w-2xl">
          <div className="h-10 w-3/4 vellum-skeleton-bar" />
          <div className="flex gap-4 pt-2">
            <div className="h-8 w-32 vellum-skeleton-bar" />
            <div className="h-8 w-32 vellum-skeleton-bar opacity-80" />
          </div>
          <div className="h-16 w-full vellum-skeleton-box mt-6" />
        </div>
      )}

      {/* Pin Annotation Footprint */}
      <div className="border-t border-[var(--c-border)] pt-4 flex justify-between">
        <div className="h-3 w-48 vellum-skeleton-bar opacity-50" />
        <div className="h-3 w-20 vellum-skeleton-bar opacity-40" />
      </div>
    </div>
  );
}
