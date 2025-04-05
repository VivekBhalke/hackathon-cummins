import React, { useEffect, useState } from "react";

const quotes = [
  "The Earth is what we all have in common. 🌍",
  "Sustainability is not a trend, it's a responsibility. 🌱",
  "Small acts, when multiplied by millions, can transform the world. 🌟",
  "Reduce, Reuse, Recycle. ♻️",
  "Live simply so others may simply live. 🌿",
];

const LoadingScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [quote, setQuote] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Select a random quote
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    // Increment the counter to 100 over 3 seconds
    const counterInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(counterInterval);
        return 100;
      });
    }, 30); // 30ms interval for smooth increment

    // Wait for 3 seconds, then call onFinish
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearTimeout(timer); // Cleanup timer
      clearInterval(counterInterval); // Cleanup counter interval
    };
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-200 dark:bg-gray-800 text-center relative">
      {/* Quote */}
      <h1 className="text-xl md:text-3xl font-semibold text-primary dark:text-green-300 animate-fade-in">
        {quote}
      </h1>

      {/* Loading Counter at Bottom-Right */}
      <div className="absolute bottom-4 right-4 text-4xl text-gray-700 dark:text-gray-300">
        {counter}%
      </div>
    </div>
  );
};

export default LoadingScreen;
