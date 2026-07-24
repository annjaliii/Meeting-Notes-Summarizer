// src/components/MeetingResults.jsx
import { motion } from "framer-motion";
import {
  ClipboardList,
  MessageSquareText,
  Gavel,
  CalendarClock,
  ListChecks,
  CheckCircle2,
  BarChart3,
  Target,
  ScrollText,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const Card = ({ className = "", children }) => (
  <motion.div
    variants={itemVariants}
    className={`rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_30px_-18px_rgba(99,102,241,0.4)] transition-colors duration-200 hover:border-indigo-400/20 ${className}`}
  >
    {children}
  </motion.div>
);

const CardHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-400/20">
      <Icon className="w-4 h-4 text-indigo-300" />
    </div>
    <h3 className="text-base sm:text-lg font-semibold text-slate-50">
      {title}
    </h3>
  </div>
);

const statusStyles = {
  Completed: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
  "In Progress": "bg-amber-500/10 text-amber-300 border-amber-400/20",
  Pending: "bg-slate-500/10 text-slate-300 border-slate-400/20",
};

const StatCard = ({ icon: Icon, label, value }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -2 }}
    className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex items-center gap-3 transition-colors duration-200 hover:border-indigo-400/20"
  >
    <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-400/20">
      <Icon className="w-4 h-4 text-purple-300" />
    </div>
    <div>
      <p className="text-lg font-semibold text-slate-50 leading-tight">
        {value}
      </p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  </motion.div>
);

const MeetingResults = ({ results }) => {
  if (!results) return null;

  const {
    summary,
    keyPoints = [],
    actionItems = [],
    decisions = [],
    importantDates = [],
  } = results;

  const stats = [
    {
      icon: MessageSquareText,
      label: "Discussion Points",
      value: keyPoints.length,
    },
    { icon: ListChecks, label: "Action Items", value: actionItems.length },
    { icon: Gavel, label: "Decisions", value: decisions.length },
    { icon: CalendarClock, label: "Deadlines", value: importantDates.length },
  ];

  return (
    <section className="relative w-full">
      <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden">
        <div className="w-[700px] h-[400px] bg-indigo-600/10 blur-[130px] rounded-full mt-10" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-5"
      >
        {/* Page title */}
        <motion.div variants={itemVariants} className="mb-2">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50 font-[Sora] tracking-tight">
            Meeting Overview
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Organized notes generated from your meeting transcript.
          </p>
        </motion.div>

        {/* Meeting Summary — hero card */}
        {summary && (
          <Card className="p-6 sm:p-8">
            <CardHeader icon={ClipboardList} title="Meeting Summary" />
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
              {summary}
            </p>
          </Card>
        )}

        {/* Key Points + Decisions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {keyPoints.length > 0 && (
            <Card className="p-6 sm:p-7">
              <CardHeader
                icon={MessageSquareText}
                title="Key Discussion Points"
              />
              <ul className="space-y-2.5">
                {keyPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm sm:text-base text-slate-300"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {decisions.length > 0 && (
            <Card className="p-6 sm:p-7">
              <CardHeader icon={Gavel} title="Decisions Made" />
              <ul className="space-y-2.5">
                {decisions.map((decision, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm sm:text-base text-slate-300"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    <span className="leading-relaxed">{decision}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Action Items — table */}
        {actionItems.length > 0 && (
          <Card className="p-6 sm:p-7">
            <CardHeader icon={Target} title="Action Items" />
            <div className="overflow-x-auto -mx-2">
              <table className="w-full min-w-[500px] border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-2 py-2.5">
                      Task
                    </th>
                    <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-2 py-2.5">
                      Owner
                    </th>
                    <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-2 py-2.5">
                      Deadline
                    </th>
                    <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-2 py-2.5">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {actionItems.map((item, idx) => (
                    <motion.tr
                      key={idx}
                      variants={itemVariants}
                      className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors duration-200"
                    >
                      <td className="px-2 py-3.5 text-sm text-slate-200 font-medium">
                        {item.task}
                      </td>
                      <td className="px-2 py-3.5 text-sm text-slate-300">
                        {item.person || "—"}
                      </td>
                      <td className="px-2 py-3.5 text-sm text-slate-300">
                        {item.deadline || "—"}
                      </td>
                      <td className="px-2 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                            statusStyles[item.status] || statusStyles["Pending"]
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {item.status || "Pending"}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Important Dates + Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {importantDates.length > 0 && (
            <Card className="p-6 sm:p-7">
              <CardHeader
                icon={ScrollText}
                title="Important Dates / Deadlines"
              />
              <ul className="space-y-2.5">
                {importantDates.map((date, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm sm:text-base text-slate-300"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                    <span className="leading-relaxed">{date}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card className="p-6 sm:p-7">
            <CardHeader icon={BarChart3} title="Meeting Statistics" />
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </section>
  );
};

export default MeetingResults;
