// sampleMovies.ts
import type { Movie } from "../services/interface/movie";

export const sampleMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    cover_url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop",
    album_url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&auto=format&fit=crop",
    IMDB: 8.8,
    TMDB: 8.3,
    rating: 8.5,
    duration: 148,
    release_date: "2010-07-16T00:00:00.000Z",
    brand: "Warner Bros. Pictures",
    category_id: 1,
    country_id: 1,
    season_count: 0,
    is_published: true,
    genre_titles: [
      {
        id: 101,
        genre: {
          id: 1,
          name: "Action"
        }
      },
      {
        id: 102,
        genre: {
          id: 2,
          name: "Sci-Fi"
        }
      },
      {
        id: 103,
        genre: {
          id: 3,
          name: "Thriller"
        }
      }
    ],
    artist_titles: [
      {
        id: 1001,
        artist: {
          id: 1,
          name: "Leonardo DiCaprio",
          image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
        },
        role: {
          id: 1,
          name: "Actor"
        }
      },
      {
        id: 1002,
        artist: {
          id: 2,
          name: "Christopher Nolan",
          image_url: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w-400&auto=format&fit=crop"
        },
        role: {
          id: 2,
          name: "Director"
        }
      }
    ],
    country: {
      id: 1,
      name: "United States"
    },
    guide_violence_and_gore: "MODERATE",
    guide_profanity: "MILD",
    guide_frightening_and_intense_sences: "HIGH"
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    cover_url: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=400&auto=format&fit=crop",
    album_url: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=1600&auto=format&fit=crop",
    IMDB: 9.3,
    TMDB: 8.7,
    rating: 9.0,
    duration: 142,
    release_date: "1994-09-23T00:00:00.000Z",
    brand: "Columbia Pictures",
    category_id: 1,
    country_id: 1,
    season_count: 0,
    is_published: true,
    genre_titles: [
      {
        id: 201,
        genre: {
          id: 4,
          name: "Drama"
        }
      }
    ],
    artist_titles: [
      {
        id: 2001,
        artist: {
          id: 3,
          name: "Tim Robbins",
          image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop"
        },
        role: {
          id: 1,
          name: "Actor"
        }
      },
      {
        id: 2002,
        artist: {
          id: 4,
          name: "Morgan Freeman",
          image_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop"
        },
        role: {
          id: 1,
          name: "Actor"
        }
      }
    ],
    country: {
      id: 1,
      name: "United States"
    },
    guide_violence_and_gore: "MODERATE",
    guide_profanity: "STRONG",
    guide_frightening_and_intense_sences: "MODERATE"
  },
  {
    id: 3,
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    cover_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&auto=format&fit=crop",
    album_url: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1600&auto=format&fit=crop",
    IMDB: 9.0,
    TMDB: 8.5,
    rating: 8.8,
    duration: 152,
    release_date: "2008-07-18T00:00:00.000Z",
    brand: "Warner Bros. Pictures",
    category_id: 1,
    country_id: 1,
    season_count: 0,
    is_published: true,
    genre_titles: [
      {
        id: 301,
        genre: {
          id: 1,
          name: "Action"
        }
      },
      {
        id: 302,
        genre: {
          id: 4,
          name: "Drama"
        }
      },
      {
        id: 303,
        genre: {
          id: 3,
          name: "Thriller"
        }
      }
    ],
    artist_titles: [
      {
        id: 3001,
        artist: {
          id: 5,
          name: "Christian Bale",
          image_url: "https://images.unsplash.com/photo-1526512340740-9217d0159da9?w=400&auto=format&fit=crop"
        },
        role: {
          id: 1,
          name: "Actor"
        }
      },
      {
        id: 3002,
        artist: {
          id: 6,
          name: "Heath Ledger",
          image_url: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&auto=format&fit=crop"
        },
        role: {
          id: 1,
          name: "Actor"
        }
      }
    ],
    country: {
      id: 1,
      name: "United States"
    },
    guide_violence_and_gore: "HIGH",
    guide_profanity: "MODERATE",
    guide_frightening_and_intense_sences: "HIGH"
  },
  {
    id: 4,
    title: "Parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    cover_url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&auto=format&fit=crop",
    album_url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1600&auto=format&fit=crop",
    IMDB: 8.6,
    TMDB: 8.5,
    rating: 8.5,
    duration: 132,
    release_date: "2019-05-30T00:00:00.000Z",
    brand: "CJ Entertainment",
    category_id: 1,
    country_id: 2,
    season_count: 0,
    is_published: true,
    genre_titles: [
      {
        id: 401,
        genre: {
          id: 5,
          name: "Comedy"
        }
      },
      {
        id: 402,
        genre: {
          id: 4,
          name: "Drama"
        }
      },
      {
        id: 403,
        genre: {
          id: 6,
          name: "Thriller"
        }
      }
    ],
    artist_titles: [
      {
        id: 4001,
        artist: {
          id: 7,
          name: "Song Kang-ho",
          image_url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop"
        },
        role: {
          id: 1,
          name: "Actor"
        }
      },
      {
        id: 4002,
        artist: {
          id: 8,
          name: "Bong Joon-ho",
          image_url: "https://images.unsplash.com/photo-1544168190-79c17527004f?w=400&auto=format&fit=crop"
        },
        role: {
          id: 2,
          name: "Director"
        }
      }
    ],
    country: {
      id: 2,
      name: "South Korea"
    },
    guide_violence_and_gore: "HIGH",
    guide_profanity: "STRONG",
    guide_frightening_and_intense_sences: "HIGH"
  },
  {
    id: 5,
    title: "Spirited Away",
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    cover_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&auto=format&fit=crop",
    album_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&auto=format&fit=crop",
    IMDB: 8.6,
    TMDB: 8.6,
    rating: 8.6,
    duration: 125,
    release_date: "2001-07-20T00:00:00.000Z",
    brand: "Studio Ghibli",
    category_id: 1,
    country_id: 3,
    season_count: 0,
    is_published: true,
    genre_titles: [
      {
        id: 501,
        genre: {
          id: 7,
          name: "Animation"
        }
      },
      {
        id: 502,
        genre: {
          id: 8,
          name: "Adventure"
        }
      },
      {
        id: 503,
        genre: {
          id: 9,
          name: "Family"
        }
      }
    ],
    artist_titles: [
      {
        id: 5001,
        artist: {
          id: 9,
          name: "Hayao Miyazaki",
          image_url: "https://images.unsplash.com/photo-1546820389-44d77e1f3b31?w=400&auto=format&fit=crop"
        },
        role: {
          id: 2,
          name: "Director"
        }
      }
    ],
    country: {
      id: 3,
      name: "Japan"
    },
    guide_violence_and_gore: "MILD",
    guide_profanity: "NONE",
    guide_frightening_and_intense_sences: "MODERATE"
  },
  {
    id: 6,
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    cover_url: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=400&auto=format&fit=crop",
    album_url: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=1600&auto=format&fit=crop",
    IMDB: 8.9,
    TMDB: 8.5,
    rating: 8.7,
    duration: 154,
    release_date: "1994-10-14T00:00:00.000Z",
    brand: "Miramax Films",
    category_id: 1,
    country_id: 1,
    season_count: 0,
    is_published: true,
    genre_titles: [
      {
        id: 601,
        genre: {
          id: 10,
          name: "Crime"
        }
      },
      {
        id: 602,
        genre: {
          id: 5,
          name: "Comedy"
        }
      },
      {
        id: 603,
        genre: {
          id: 4,
          name: "Drama"
        }
      }
    ],
    artist_titles: [
      {
        id: 6001,
        artist: {
          id: 10,
          name: "John Travolta",
          image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
        },
        role: {
          id: 1,
          name: "Actor"
        }
      },
      {
        id: 6002,
        artist: {
          id: 11,
          name: "Samuel L. Jackson",
          image_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop"
        },
        role: {
          id: 1,
          name: "Actor"
        }
      },
      {
        id: 6003,
        artist: {
          id: 12,
          name: "Quentin Tarantino",
          image_url: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&auto=format&fit=crop"
        },
        role: {
          id: 2,
          name: "Director"
        }
      }
    ],
    country: {
      id: 1,
      name: "United States"
    },
    guide_violence_and_gore: "HIGH",
    guide_profanity: "STRONG",
    guide_frightening_and_intense_sences: "HIGH"
  }
];
