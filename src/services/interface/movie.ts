
// types/movie.ts - Type definitions
export interface Movie {
  id: number;
  title: string;
  description: string;
  cover_url: string;
  album_url: string;
  IMDB?: number;
  TMDB?: number;
  rating: number;
  duration: number;
  release_date: string;
  brand: string;
  category_id: number;
  country_id: number;
  season_count: number;
  is_published: boolean;
  
  // Optional relationships
  genre_titles?: Array<{
    id: number;
    genre: {
      id: number;
      name: string;
    };
  }>;
  
  artist_titles?: Array<{
    id: number;
    artist: {
      id: number;
      name: string;
      image_url?: string;
    };
    role: {
      id: number;
      name: string;
    };
  }>;
  
  country?: {
    id: number;
    name: string;
  };
  
  // Content guides
  guide_violence_and_gore?: string;
  guide_profanity?: string;
  guide_frightening_and_intense_sences?: string;
}