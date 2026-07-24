// src/components/TranscriptInput.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Sparkles, X, Clock, Lightbulb } from "lucide-react";
import LoadingScreen from "./LoadingScreen";

const MIN_WORDS = 10;

const TranscriptInput = () => {
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const trimmed = transcript.trim();
  const wordCount = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  const charCount = transcript.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // ~200 wpm reading speed
  const isValid = wordCount >= MIN_WORDS;

  const handleChange = (e) => {
    setTranscript(e.target.value);
  };

  const handleClear = () => {
    setTranscript("");
  };

  const handleSummarize = () => {
    if (!isValid) return;
    setIsLoading(true);
    setTimeout(() => {
      navigate("/results");
    }, 2800);
  };

  return (
    <>
      <section className="relative w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 flex justify-center">
          <div className="w-[600px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_-15px_rgba(99,102,241,0.35)] p-6 sm:p-8 lg:p-10">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-400/20">
                  <FileText className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-slate-50">
                    Meeting Transcript
                  </h2>
                  <p className="mt-1 text-sm sm:text-base text-slate-400 leading-relaxed">
                    Paste your meeting transcript below and get organized notes
                    — summary, key points, action items, and deadlines — in a
                    clean, structured format.
                  </p>
                </div>
              </div>

              {/* Clear button */}
              <AnimatePresence>
                {transcript.length > 0 && (
                  <motion.button
                    type="button"
                    onClick={handleClear}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-red-400/20 hover:text-red-300 px-2.5 py-1.5 text-xs text-slate-400 transition-colors duration-200"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Clear</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                value={transcript}
                onChange={handleChange}
                placeholder="Paste your meeting transcript here — e.g. 'Anjali: Let's review the launch timeline...'"
                rows={10}
                className="w-full resize-none rounded-xl bg-[#0F0E1A] border border-white/10 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-colors duration-200 p-4 sm:p-5 text-sm sm:text-base text-slate-200 placeholder:text-slate-500"
              />
            </div>

            {/* Live stats row */}
            <motion.div
              layout
              className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500"
            >
              <span className="inline-flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isValid ? "bg-emerald-400" : "bg-slate-600"
                  }`}
                />
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </span>
              <span>{charCount} characters</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {readingTime} min read
              </span>

              {!isValid && transcript.length > 0 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-amber-400/80"
                >
                  {MIN_WORDS - wordCount} more{" "}
                  {MIN_WORDS - wordCount === 1 ? "word" : "words"} needed
                </motion.span>
              )}
            </motion.div>

            {/* Helpful tip */}
            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-indigo-400/10 bg-indigo-500/[0.04] px-4 py-3">
              <Lightbulb className="w-4 h-4 text-indigo-300 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                For best results, include speaker names and keep the transcript
                as close to verbatim as possible — this helps produce more
                accurate action items and decisions.
              </p>
            </div>

            {/* Action button */}
            <div className="mt-6 flex justify-end">
              <motion.button
                type="button"
                onClick={handleSummarize}
                disabled={!isValid}
                whileHover={isValid ? { scale: 1.02 } : {}}
                whileTap={isValid ? { scale: 0.98 } : {}}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm sm:text-base font-medium transition-all duration-200
                  disabled:bg-white/5 disabled:text-slate-500 disabled:cursor-not-allowed disabled:border disabled:border-white/10
                  bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 disabled:shadow-none"
              >
                <Sparkles className="w-4 h-4" />
                Summarize Meeting
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TranscriptInput;
