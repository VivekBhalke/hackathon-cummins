import { Button } from "../ui/button";
import { motion } from "framer-motion";

export const Hero = () => {
  // Generate random position for leaf elements
  const getRandomPosition = () => ({
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    size: Math.floor(Math.random() * 20) + 10,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
  });

  // Create array of leaf elements
  const leaves = Array.from({ length: 8 }, () => getRandomPosition());

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center space-y-6 py-12 overflow-hidden">
      {/* Enhanced animated background - dark mode compatible */}
      <div className="absolute inset-0 -z-10">
        {/* Animated circles - dark mode compatible */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-green-200/40 dark:bg-green-700/30"
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-green-300/30 dark:bg-green-600/25"
          animate={{
            x: [0, -15, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-32 w-24 h-24 rounded-full bg-green-100/50 dark:bg-green-500/20"
          animate={{
            x: [0, -10, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated wave - dark mode compatible */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-16 bg-green-100/20 dark:bg-green-800/30"
          animate={{
            y: [0, -5, 0],
            scaleX: [0.97, 1.03, 0.97],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ borderTopLeftRadius: "50%", borderTopRightRadius: "50%" }}
        />

        {/* Falling leaves - dark mode compatible */}
        {leaves.map((leaf, index) => (
          <motion.div
            key={index}
            className="absolute bg-green-500/20 dark:bg-green-400/15"
            style={{
              left: `${leaf.x}%`,
              top: "-30px",
              width: `${leaf.size}px`,
              height: `${leaf.size}px`,
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              rotate: "45deg",
            }}
            animate={{
              y: ["0vh", "100vh"],
              x: [0, leaf.x > 50 ? -50 : 50],
              rotate: ["45deg", "405deg"],
            }}
            transition={{
              duration: leaf.duration,
              repeat: Infinity,
              delay: leaf.delay,
              ease: "linear",
            }}
          />
        ))}

        {/* Subtle gradient overlay - dark mode compatible */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30 dark:to-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Particle effect - dark mode compatible */}
      <ParticleField />

      {/* Hero content with animations */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-primary dark:text-primary max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Live Sustainably, Track Effortlessly 🌱
      </motion.h1>

      <motion.p
        className="text-lg text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Start your journey to reduce waste, save energy, and build eco-friendly
        habits.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-8 py-6 text-lg">
          Get Started
        </Button>
      </motion.div>
    </div>
  );
};

// Particle field component for subtle background animation - dark mode compatible
const ParticleField = () => {
  // Generate random particles
  const particles = Array.from({ length: 20 }, () => ({
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    size: Math.floor(Math.random() * 4) + 2,
    duration: Math.random() * 30 + 20,
  }));

  return (
    <div className="absolute inset-0 -z-10">
      {particles.map((particle, index) => (
        <motion.div
          key={particle.x}
          className="absolute rounded-full bg-green-400/20 dark:bg-green-300/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: 0.2,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Hero;
