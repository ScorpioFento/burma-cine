import type { Movie } from "../services/interface/movie";
import { useGetMoviesQuery } from "../services/movieApi";

export default function Movie() {
  const { data, error, isLoading } = useGetMoviesQuery();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error Loading movies</div>;

  return (
    <div>
      <h1>Movies</h1>
      {data?.data.length === 0 ? (
        <div>No movies found</div>
      ) : (
        <ul>
          {data?.data.map((movie: Movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
      <p>Total movies: {data?.total}</p>
    </div>
  );
}
