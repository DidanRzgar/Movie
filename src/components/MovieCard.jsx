import React from "react";

export default function MovieCard({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) {
  return (
    <div className="movie-card w-full max-w-[220px] sm:max-w-[240px] md:max-w-[260px]">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "./Poster1.png"
        }
        alt={title}
        className="w-full h-[240px] sm:h-[340px] md:h-[250px] object-cover rounded-xl"
      />

      <div>
        <h3 className="mt-3 text-sm sm:text-base md:text-lg font-semibold">
          {title}
        </h3>

        <div className="content flex items-center gap-2 text-xs sm:text-sm text-gray-300 mt-2">
          <div className="rating flex items-center">
            <img src="./star.svg" alt="Star icon" className="w-4 h-4" />
            <p className="pl-1">
              {vote_average ? vote_average.toFixed(1) : "N/A"}
            </p>
          </div>

          <span>•</span>

          <div className="lang uppercase">{original_language}</div>

          <span>•</span>

          <div className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
}
