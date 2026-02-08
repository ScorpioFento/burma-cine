// Detail.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { sampleMovies } from "../data/sampleMovies"; // Your sample data
import type { Movie } from "../services/interface/movie";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  // GSAP animations
  useGSAP(() => {
    if (movie) {
      gsap.from(".hero-image", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });

      gsap.from(".movie-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        stagger: 0.1,
        ease: "power3.out",
      });
    }
  }, [movie]);

  useEffect(() => {
    // Simulate API fetch
    const fetchMovie = async () => {
      setLoading(true);
      
      // Simulate network delay
      setTimeout(() => {
        const foundMovie = sampleMovies.find(m => m.id === parseInt(id || "0"));
        if (foundMovie) {
          setMovie(foundMovie);
        } else {
          // Movie not found, redirect to movies page
          navigate("/movies", { replace: true });
        }
        setLoading(false);
      }, 500);
    };

    if (id) {
      fetchMovie();
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-amber-500 mb-4"></div>
          <p className="text-white">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl mb-4">Movie not found</h2>
          <button 
            onClick={() => navigate("/movies")}
            className="px-6 py-2 bg-amber-500 rounded-full hover:bg-amber-600 transition-colors"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  const releaseYear = new Date(movie.release_date).getFullYear();
  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div 
          className="hero-image absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 30%, transparent 70%), url(${movie.album_url || movie.cover_url})` 
          }}
        />
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-10 p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Hero Content */}
        <div className="container mx-auto px-4 md:px-6 relative h-full flex items-end pb-12">
          <div className="movie-content max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {movie.title} <span className="text-amber-500">({releaseYear})</span>
            </h1>
            
            {/* Rating and Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-xl font-bold">{movie.IMDB?.toFixed(1)}</span>
                </div>
                <span className="text-gray-400">IMDb</span>
              </div>

              <div className="flex items-center gap-2 text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{hours}h {minutes}m</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Now
              </button>
              <button className="px-8 py-3 bg-gray-800 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Synopsis</h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-8">
              {movie.description}
            </p>

            {/* Cast Section */}
            {movie.artist_titles && movie.artist_titles.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {movie.artist_titles.map((artist) => (
                    <div key={artist.id} className="bg-gray-900/30 rounded-xl p-4 hover:bg-gray-800/50 transition-colors duration-300">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-gray-700">
                        {artist.artist.image_url ? (
                          <img 
                            src={artist.artist.image_url} 
                            alt={artist.artist.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl text-gray-400">
                            {artist.artist.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <h3 className="text-center font-semibold">{artist.artist.name}</h3>
                      <p className="text-center text-sm text-gray-400">{artist.role.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Additional Info */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6">Movie Information</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400">Release Date</div>
                  <div className="font-semibold">
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400">Genres</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {movie.genre_titles?.map((genre) => (
                      <span key={genre.id} className="px-3 py-1 bg-amber-900/30 rounded-full text-sm">
                        {genre.genre.name}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400">Production</div>
                  <div className="font-semibold">{movie.brand}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400">Country</div>
                  <div className="font-semibold">{movie.country?.name}</div>
                </div>

                {/* Content Guide */}
                <div className="pt-4 border-t border-gray-800">
                  <h4 className="font-semibold mb-3">Content Guide</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Violence</span>
                      <span className="text-amber-500">{movie.guide_violence_and_gore || "Moderate"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profanity</span>
                      <span className="text-amber-500">{movie.guide_profanity || "Mild"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}