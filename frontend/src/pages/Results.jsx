// src/pages/Results.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Copy, FileSearch } from "lucide-react";
import MeetingResults from "../components/MeetingResults";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const results = location.state?.results ?? null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-[#0B0A14]"
    >
      {/* Sticky top navigation */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#0B0A14]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors duration-200 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </motion.button>

          <h1 className="text-sm sm:text-base font-semibold text-slate-100 font-[Sora] absolute left-1/2 -translate-x-1/2 hidden sm:block">
            Meeting Results
          </h1>

          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-3 py-2 text-xs sm:text-sm text-slate-300 transition-colors duration-200"
            >
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Copy Notes</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-2 text-xs sm:text-sm font-medium text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-shadow duration-200"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export PDF</span>
            </motion.button>
          </div>
        </div>
      </div>

      {results ? (
        <MeetingResults results={results} />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28"
        >
          <div className="flex flex-col items-center text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center mb-6">
              <FileSearch className="w-7 h-7 text-indigo-300" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-50 font-[Sora] tracking-tight">
              No meeting summary available.
            </h2>
            <motion.button
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm sm:text-base font-medium text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-shadow duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Results;
