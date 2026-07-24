// src/components/LoadingScreen.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, FileText, ListChecks, Gavel, CheckCircle2 } from "lucide-react";

const messages = [
  { text: "Analyzing discussion...", icon: FileText },
  { text: "Extracting action items...", icon: ListChecks },
  { text: "Identifying decisions...", icon: Gavel },
  { text: "Organizing meeting notes...", icon: Sparkles },
  { text: "Almost ready...", icon: CheckCircle2 },
];

const LoadingScreen = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = messages[index].icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0A14] overflow-hidden">
      {/* Ambient glow background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[350px] h-[350px] bg-purple-600/10 blur-[100px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex flex-col items-center text-center px-6"
      >
        {/* Animated loader ring */}
        <div className="relative w-20 h-20 mb-8">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/5"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-400 border-r-purple-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-white/5"
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-transparent border-b-indigo-400/60"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-400/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-300" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-50 font-[Sora] tracking-tight">
          Preparing Your Meeting Notes
        </h1>

        {/* Animated cycling subtitle */}
        <div className="mt-4 h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-center gap-2 text-sm sm:text-base text-slate-400"
            >
              <CurrentIcon className="w-4 h-4 text-indigo-300" />
              <span>{messages[index].text}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="mt-8 flex items-center gap-1.5">
          {messages.map((_, i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              animate={{
                backgroundColor:
                  i === index ? "rgb(165 180 252)" : "rgba(255,255,255,0.15)",
                scale: i === index ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;