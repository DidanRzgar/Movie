import { useEffect, useState } from "react";

import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";
import card4 from "../assets/card4.png";
import card5 from "../assets/card5.png";

const movies = [card1, card2, card3, card4, card5];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex items-center justify-center overflow-hidden py-16 md:py-24 lg:py-30">
      <div className="relative w-full max-w-6xl h-[260px] sm:h-[320px] md:h-[420px] lg:h-[500px] flex items-center justify-center">
        {movies.map((movie, i) => {
          const position =
            i === index
              ? "center"
              : i === (index - 1 + movies.length) % movies.length
                ? "left"
                : "right";

          return (
            <div
              key={i}
              className={`absolute transition-all duration-700 ease-in-out
              
              ${
                position === "center"
                  ? "z-30 scale-100 opacity-100 blur-0"
                  : "z-10 scale-75 opacity-40 blur-sm"
              }
              
              ${
                position === "left"
                  ? "-translate-x-[55%] sm:-translate-x-[60%]"
                  : position === "right"
                    ? "translate-x-[55%] sm:translate-x-[60%]"
                    : "translate-x-0"
              }
              `}
            >
              <img
                src={movie}
                alt="movie"
                className="w-[160px] sm:w-[200px] md:w-[260px] lg:w-[350px] rounded-2xl shadow-lg"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
