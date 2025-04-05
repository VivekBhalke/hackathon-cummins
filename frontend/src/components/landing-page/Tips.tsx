import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Leaf, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Tips = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const environmentalQuotes = [
    {
      quote: "The Earth does not belong to us: we belong to the Earth.",
      author: "Marlee Matlin",
      category: "Sustainability",
    },
    {
      quote:
        "What we are doing to the forests of the world is but a mirror reflection of what we are doing to ourselves and to one another.",
      author: "Chris Maser",
      category: "Conservation",
    },
    {
      quote:
        "The environment is where we all meet; where we all have a mutual interest; it is the one thing all of us share.",
      author: "Lady Bird Johnson",
      category: "Unity",
    },
    {
      quote:
        "Nature provides a free lunch, but only if we control our appetites.",
      author: "William Ruckelshaus",
      category: "Moderation",
    },
    {
      quote: "We won't have a society if we destroy the environment.",
      author: "Margaret Mead",
      category: "Preservation",
    },
    {
      quote:
        "The greatest threat to our planet is the belief that someone else will save it.",
      author: "Robert Swan",
      category: "Action",
    },
    {
      quote: "The Earth is what we all have in common.",
      author: "Wendell Berry",
      category: "Unity",
    },
    {
      quote:
        "We do not inherit the Earth from our ancestors; we borrow it from our children.",
      author: "Native American Proverb",
      category: "Stewardship",
    },
  ];

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        goToNext();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? environmentalQuotes.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === environmentalQuotes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="relative w-full mx-auto p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Green Gradient Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-green-600 opacity-30"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />

        {/* Floating Particles */}
        {Array.from({ length: 15 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-green-300 dark:bg-green-700 opacity-20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["0%", "-100%"],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          Eco Wisdom
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Discover inspiring environmental quotes to guide our journey toward a
          sustainable future.
        </p>
      </div>

      <Card className="border-2 max-w-3xl mx-auto border-opacity-50 dark:border-opacity-20 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-500" />
              <span>Daily Inspiration</span>
            </CardTitle>
            <Button
              variant={isAutoPlaying ? "secondary" : "outline"}
              size="sm"
              onClick={toggleAutoPlay}
              className="flex items-center gap-1"
            >
              <RefreshCw
                className={`h-4 w-4 ${isAutoPlaying ? "animate-spin" : ""}`}
              />
              {isAutoPlaying ? "Auto-playing" : "Auto-play"}
            </Button>
          </div>
          <CardDescription>
            {environmentalQuotes[currentIndex].category}
          </CardDescription>
        </CardHeader>

        <CardContent className="py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="min-h-40 flex items-center justify-center text-center px-6"
            >
              <blockquote className="italic text-xl">
                "{environmentalQuotes[currentIndex].quote}"
                <footer className="mt-4 font-medium text-green-600 dark:text-green-400">
                  — {environmentalQuotes[currentIndex].author}
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pt-2">
          <div className="flex justify-center gap-1 w-full">
            {environmentalQuotes.map((_, index) => (
              <motion.button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-6 bg-green-500 dark:bg-green-400"
                    : "w-2 bg-gray-200 dark:bg-gray-700"
                }`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          <div className="flex justify-between items-center w-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="hover:bg-green-100 dark:hover:bg-green-900"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="text-sm text-muted-foreground">
              {currentIndex + 1} / {environmentalQuotes.length}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="hover:bg-green-100 dark:hover:bg-green-900"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
