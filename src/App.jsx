import { useEffect, useState } from "react";
import Search from "./components/Search";
import HeroCarousel from "./components/HeroCarousel";
import { Spinner } from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search input
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.response === "False") {
        setErrorMessage(data.Error || "failed to fetch movie");
        setMovieList([]);
        return;
      }

      // Remove Romance movies (genre id 10749)
      // Remove Romance (10749) + Adult movies
      const filteredMovies = (data.results || []).filter(
        (movie) => !movie.genre_ids?.includes(10749) && movie.adult !== true,
      );

      setMovieList(filteredMovies);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main className="min-h-screen">
      <div className="wrapper px-4 sm:px-6 lg:px-10">
        <div className="pattern" />

        {/* Header */}
        <header className="flex flex-col items-center text-center">
          {/* Logo */}
          <img
            src="./logo1.png"
            alt="logo"
            className="w-36 sm:w-48 md:w-56 lg:w-64 mb-4"
          />

          {/* Carousel */}
          <HeroCarousel />

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Find <span className="text-blue-400">Movies</span> You'll Enjoy
            <br />
            Without the Hassel
          </h1>

          {/* Search */}
          <div className="w-full max-w-xl">
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </header>

        {/* Movies Section */}
        <section className="all-movies mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">
            All Movies
          </h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
