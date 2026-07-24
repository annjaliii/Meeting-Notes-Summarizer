// src/components/TranscriptInput.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";

const TranscriptInput = () => {
  const [transcript, setTranscript] = useState("");
  const navigate = useNavigate();

  const wordCount = transcript.trim() === "" ? 0 : transcript.trim().split(/\s+/).length;

  const handleChange = (e) => {
    setTranscript(e.target.value);
  };

  const handleSummarize = () => {
    if (transcript.trim() === "") return;
    navigate("/results");
  };

  return (
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
          <div className="flex items-start gap-4 mb-6">
            <div className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-400/20">
              <FileText className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-50">
                Meeting Transcript
              </h2>
              <p className="mt-1 text-sm sm:text-base text-slate-400 leading-relaxed">
                Paste your meeting transcript below and get organized notes —
                summary, key points, action items, and deadlines — in a clean,
                structured format.
              </p>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={transcript}
              onChange={handleChange}
              placeholder="Paste your meeting transcript here..."
              rows={10}
              className="w-full resize-none rounded-xl bg-[#0F0E1A] border border-white/10 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-colors duration-200 p-4 sm:p-5 text-sm sm:text-base text-slate-200 placeholder:text-slate-500"
            />
            <div className="absolute bottom-3 right-4 text-xs text-slate-500 select-none">
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <motion.button
              type="button"
              onClick={handleSummarize}
              disabled={transcript.trim() === ""}
              whileHover={transcript.trim() !== "" ? { scale: 1.02 } : {}}
              whileTap={transcript.trim() !== "" ? { scale: 0.98 } : {}}
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
  );
};

export default TranscriptInput;