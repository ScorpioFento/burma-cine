import Banner from "../components/Banner/Banner";
import FeaturedCarousels from "../components/FeaturedCarousels";
import MovieGrid from "../components/MovieGrid";
import MovieSection from "../components/MovieSection";
import { sampleMovies } from "../data/sampleMovies";

export default function Home() {
  return (
    <>
      <Banner />
        {/* <MovieGrid movies={sampleMovies} title="Featured Movies" showFilters /> */}

      <MovieSection />

      <FeaturedCarousels />
    </>
  );
}
