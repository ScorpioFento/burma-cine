import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MovieCard from "./MovieCard";
import type { Movie } from "../services/interface/movie";
import { useViewportWidth } from "../hooks/useViewPortWidth";
import { calculateCardSize } from "../lib/cardLayout";

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  showFilters?: boolean;
}

export default function MovieGrid({
  movies,
  title,
  showFilters = false,
}: MovieGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>("all");

  const { width: viewportWidth } = useViewportWidth();

  const { width: cardWidth, height : cardHeight } = calculateCardSize(viewportWidth, {
    responsiveRules: [
      { maxWidth: 640, columns: 2 },
      { maxWidth: 768, columns: 3 },
      { maxWidth: 1024, columns: 4 },
      { maxWidth: 1280, columns: 5 },
      { maxWidth: Infinity, columns: 6 },
    ],
    columnGap: 24, 
    aspectRatio: 1.5, 
  });

  useGSAP(() => {
    if (gridRef.current) {
      gsap.from(".movie-card", {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
      });
    }
  }, [movies]);

  return (
    <section className="py-12 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-0">
              {title}
              <span className="text-amber-500 ml-2">
                ({movies.length})
              </span>
            </h2>
          )}

          {showFilters && (
            <div className="flex gap-2">
              {["all", "movie", "series", "popular"].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    filter === filterType
                      ? "bg-amber-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() +
                    filterType.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Flexible Grid */}
        <div
          ref={gridRef}
          className="flex gap-4 flex-wrap bg-amber-700"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
                style={{
    width: `${cardWidth}px`,
    height: `${cardHeight}px`
  }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Load More */}
        {movies.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
              Load More Movies
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
