// MovieCard.tsx
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
      className="group relative block rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900/20 to-gray-900/80 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl"
    >
      {/* Poster Image */}
      <div className="relative overflow-hidden w-full h-full">
 


    <Image
      src={movie.cover_url || "/placeholder-poster.jpg"}
      alt={movie.title}
      ratio="2/3"
      fit="cover"
      
      className="transition-transform duration-700 group-hover:scale-110"
    />

        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1.5 rounded-full shadow-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-bold text-sm">{movie.IMDB?.toFixed(1) || "N/A"}</span>
          </div>
        </div>

        {/* Year Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
            <span className="text-sm font-semibold">{releaseYear}</span>
          </div>
        </div>
      </div>

      {/* Movie Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500 group-hover:-translate-y-2">
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{movie.title}</h3>
        
        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-3">
          {movie.genre_titles?.slice(0, 2).map((genre) => (
            <span 
              key={genre.genre.id} 
              className="text-xs px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full"
            >
              {genre.genre.name}
            </span>
          ))}
          {movie.genre_titles && movie.genre_titles.length > 2 && (
            <span className="text-xs px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full">
              +{movie.genre_titles.length - 2}
            </span>
          )}
        </div>

        {/* Duration */}
        {movie.duration > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
          </div>
        )}
      </div>

      {/* Hover Effect Ring */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-amber-500/30 transition-all duration-500" />
    </Link>
  );
}