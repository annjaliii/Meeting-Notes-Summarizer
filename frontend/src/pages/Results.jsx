// src/pages/Results.jsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Copy } from "lucide-react";
import MeetingResults from "../components/MeetingResults";

// TEMPORARY sample data — replace once backend integration is connected.
const sampleResults = {
  summary:
    "The team discussed the upcoming product launch, frontend progress, and remaining backend issues.",
  keyPoints: [
    "Frontend development is nearly complete.",
    "Backend endpoints require additional testing.",
    "The team reviewed the launch timeline.",
  ],
  actionItems: [
    {
      task: "Complete frontend testing",
      person: "Anjali",
      deadline: "Friday",
      status: "In Progress",
    },
    {
      task: "Fix backend issues",
      person: "Rahul",
      deadline: "Friday",
      status: "Pending",
    },
  ],
  decisions: ["Product launch moved to next Monday."],
  importantDates: [
    "Frontend testing deadline: Friday",
    "Product launch: Next Monday",
  ],
};

const Results = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0A14]">
      {/* Sticky top navigation */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#0B0A14]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
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
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-3 py-2 text-xs sm:text-sm text-slate-300 transition-colors duration-200"
            >
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Copy Notes</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-2 text-xs sm:text-sm font-medium text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-shadow duration-200"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export PDF</span>
            </motion.button>
          </div>
        </div>
      </div>

      <MeetingResults results={sampleResults} />
    </div>
  );
};

export default Results;
