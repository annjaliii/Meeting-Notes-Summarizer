import { motion } from "framer-motion";
import {
  Sparkle,
  ArrowRight,
  PlayCircle,
  FileText,
  CheckCircle2,
  Clock,
  ListTodo,
} from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const floatCard = (delay) => ({
  animate: {
    y: [0, -10, 0],
  },
  transition: {
    duration: 4,
    delay,
    repeat: Infinity,
    ease: "easeInOut",
  },
});

const transcriptLines = [
  { width: "92%" },
  { width: "76%" },
  { width: "84%" },
  { width: "60%" },
];

const checklist = [
  { label: "Finalize Q3 roadmap", done: true },
  { label: "Share pricing doc with sales", done: true },
  { label: "Schedule design review", done: false },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#0B0A14]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0B0A14]" />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-600/40 to-fuchsia-600/30 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-32 -right-32 h-96 w-96 rounded-full bg-purple-700/30 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.32, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-700/25 blur-[100px]"
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0B0A14_75%)]" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 pt-20 pb-24 sm:pt-28 lg:grid-cols-2 lg:gap-10 lg:pb-32">
        {/* Left column: copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.span
            variants={item}
            className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-violet-300 backdrop-blur-sm"
          >
            <Sparkle className="h-3.5 w-3.5" strokeWidth={2} />
            Meeting summarization, made effortless
          </motion.span>

          <motion.h1
            variants={item}
            className="text-[2.75rem] font-bold leading-[1.08] tracking-tight text-slate-50 sm:text-6xl"
            style={{
              fontFamily: '"Sora", ui-sans-serif, system-ui, sans-serif',
            }}
          >
            Turn Conversations
            <br />
            Into{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
              Clear Action
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-balance text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            Paste in your meeting transcripts and get organized summaries, key
            discussion points, decisions, deadlines, and action items —
            structured and ready to share in seconds.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center gap-3.5 sm:flex-row"
          >
            <motion.button
              whileHover={{
                y: -2,
                boxShadow: "0 0 40px -6px rgba(168,85,247,0.8)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_-6px_rgba(168,85,247,0.7)]"
            >
              Get Started Free
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={2.25}
              />
            </motion.button>

            <motion.button
              whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.06)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur-sm"
            >
              <PlayCircle className="h-4 w-4 text-violet-400" strokeWidth={2} />
              See How It Works
            </motion.button>
          </motion.div>

          <motion.p variants={item} className="mt-4 text-xs text-slate-500">
            No sign-up required to try a sample summary.
          </motion.p>
        </motion.div>

        {/* Right column: decorative preview card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:mx-0"
        >
          {/* Rotating glow border */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-1 rounded-2xl opacity-60 blur-md"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, rgba(168,85,247,0.7) 20%, transparent 40%, rgba(217,70,239,0.6) 60%, transparent 80%)",
            }}
          />

          <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <FileText className="h-3.5 w-3.5" strokeWidth={2} />
                Sample transcript
              </span>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/10" />
                <span className="h-2 w-2 rounded-full bg-white/10" />
                <span className="h-2 w-2 rounded-full bg-white/10" />
              </div>
            </div>

            <div className="space-y-2.5">
              {transcriptLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + i * 0.1,
                    ease: "easeOut",
                  }}
                  style={{ width: line.width, transformOrigin: "left" }}
                  className="h-2.5 rounded-full bg-white/[0.08]"
                />
              ))}
            </div>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <ArrowRight
                className="h-3.5 w-3.5 rotate-90 text-violet-400"
                strokeWidth={2}
              />
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="space-y-3">
              {checklist.map((task, i) => (
                <motion.div
                  key={task.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 1.1 + i * 0.15,
                    ease: "easeOut",
                  }}
                  className="flex items-center gap-2.5 text-sm"
                >
                  <CheckCircle2
                    className={`h-4 w-4 shrink-0 ${task.done ? "text-violet-400" : "text-slate-600"}`}
                    strokeWidth={2}
                  />
                  <span
                    className={
                      task.done
                        ? "text-slate-500 line-through decoration-slate-600"
                        : "text-slate-200"
                    }
                  >
                    {task.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Floating badges */}
          <motion.div
            {...floatCard(0)}
            className="absolute -left-8 -top-6 hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2.5 shadow-[0_0_24px_-8px_rgba(168,85,247,0.6)] backdrop-blur-xl sm:flex"
          >
            <Clock className="h-3.5 w-3.5 text-fuchsia-400" strokeWidth={2} />
            <span className="text-xs font-medium text-slate-200">
              Due Friday
            </span>
          </motion.div>

          <motion.div
            {...floatCard(1.2)}
            className="absolute -bottom-7 -right-6 hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2.5 shadow-[0_0_24px_-8px_rgba(168,85,247,0.6)] backdrop-blur-xl sm:flex"
          >
            <ListTodo className="h-3.5 w-3.5 text-violet-400" strokeWidth={2} />
            <span className="text-xs font-medium text-slate-200">
              3 action items
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
