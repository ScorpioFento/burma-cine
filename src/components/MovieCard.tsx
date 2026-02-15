import { Link } from "react-router-dom";
import type { Movie } from "../services/interface/movie";
import { Image } from "./ui/Image";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const releaseYear = new Date(movie.release_date).getFullYear();

  return (
    <Link
      to={`/detail/${movie.id}`}
      className="card bg-gray-900 shadow-xl rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl"
    >
      {/* Image Section */}
      <figure className="relative">
        <Image
          src={movie.cover_url || "/placeholder-poster.jpg"}
          alt={movie.title}
          ratio="2/3"
          fit="cover"
          className="transition-transform duration-700 hover:scale-105"
        />

        {/* Rating Badge (keep on image) */}
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1 text-white px-3 py-1.5 rounded-full shadow-lg"
          style={{
            background: "linear-gradient(45deg, #fcba03, #ffd90080)",
          }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-bold text-sm">
              {movie.IMDB?.toFixed(1) || "N/A"}
            </span>
          </div>
        </div>
      </figure>

      {/* Info Section (Below Image) */}
      <div
        className="card-body p-4 text-white"
        style={{
          background: "linear-gradient(45deg, #1f2937, #000000)",
        }}
      >
        {/* Title + Year */}
        <div className="flex justify-between items-start">
          <h3 className="card-title text-base lg:text-lg line-clamp-1">
            {movie.title}
          </h3>
        </div>

        {/* Genres */}
        <div className="flex items-center gap-2 mt-2">
          {movie.genre_titles?.slice(0, 2).map((genre) => (
            <span
              key={genre.genre.id}
              className="text-xs px-2 py-1 bg-white/10 rounded-full"
            >
              {genre.genre.name}
            </span>
          ))}

          <span className="text-sm text-gray-400">{releaseYear}</span>
        </div>
      </div>
    </Link>
  );
}
