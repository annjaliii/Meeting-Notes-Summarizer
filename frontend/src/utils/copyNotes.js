// src/utils/copyNotes.js

export const copyMeetingNotes = async (results) => {
  if (!results) return false;

  const {
    summary,
    keyPoints = [],
    decisions = [],
    actionItems = [],
    importantDates = [],
  } = results;

  const lines = [];

  lines.push("MEETING NOTES");
  lines.push("");

  if (summary) {
    lines.push("Summary");
    lines.push(summary);
    lines.push("");
  }

  if (keyPoints.length > 0) {
    lines.push("Key Discussion Points");
    keyPoints.forEach((point) => {
      lines.push(`• ${point}`);
    });
    lines.push("");
  }

  if (decisions.length > 0) {
    lines.push("Decisions");
    decisions.forEach((decision) => {
      lines.push(`• ${decision}`);
    });
    lines.push("");
  }

  if (actionItems.length > 0) {
    lines.push("Action Items");
    actionItems.forEach((item) => {
      const person = item.person || "Unassigned";
      const task = item.task || "";
      const deadline = item.deadline || "—";
      const status = item.status || "Pending";
      lines.push(`• ${person}: ${task} (Deadline: ${deadline}, Status: ${status})`);
    });
    lines.push("");
  }

  if (importantDates.length > 0) {
    lines.push("Important Dates");
    importantDates.forEach((date) => {
      lines.push(`• ${date}`);
    });
    lines.push("");
  }

  const formattedText = lines.join("\n").trim();

  try {
    await navigator.clipboard.writeText(formattedText);
    return true;
  } catch (err) {
    console.error("Failed to copy meeting notes:", err);
    return false;
  }
};