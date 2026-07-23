import { motion } from "framer-motion";
import { NotebookPen, ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0B0A14]/70 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <motion.span
            whileHover={{ rotate: -6, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_0_20px_-4px_rgba(168,85,247,0.7)]"
          >
            <NotebookPen className="h-4.5 w-4.5 text-white" strokeWidth={2} />
          </motion.span>
          <span
            className="text-[15px] font-semibold tracking-tight text-slate-100"
            style={{
              fontFamily: '"Sora", ui-sans-serif, system-ui, sans-serif',
            }}
          >
            Meeting Notes Summarizer
          </span>
        </div>

        <motion.button
          whileHover={{
            y: -1.5,
            boxShadow: "0 0 32px -6px rgba(168,85,247,0.7)",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="group hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_-6px_rgba(168,85,247,0.6)] sm:inline-flex"
        >
          Get Started
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </motion.button>
      </nav>
    </motion.header>
  );
};

export default Navbar;
