import { jsPDF } from "jspdf";

export const exportMeetingPdf = (results) => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text("Meeting Notes", 20, y);

  y += 15;

  doc.setFontSize(14);
  doc.text("Summary", 20, y);

  y += 8;

  doc.setFontSize(11);

  const summary = doc.splitTextToSize(results.summary || "", 170);
  doc.text(summary, 20, y);

  y += summary.length * 7 + 8;

  doc.setFontSize(14);
  doc.text("Key Discussion Points", 20, y);

  y += 8;

  doc.setFontSize(11);

  results.keyPoints?.forEach((point) => {
    doc.text(`• ${point}`, 25, y);
    y += 7;
  });

  y += 6;

  doc.setFontSize(14);
  doc.text("Decisions Made", 20, y);

  y += 8;

  doc.setFontSize(11);

  results.decisions?.forEach((decision) => {
    doc.text(`• ${decision}`, 25, y);
    y += 7;
  });

  y += 6;

  doc.setFontSize(14);
  doc.text("Action Items", 20, y);

  y += 8;

  doc.setFontSize(11);

  results.actionItems?.forEach((item) => {
    doc.text(
      `• ${item.person}: ${item.task} (${item.deadline})`,
      25,
      y
    );
    y += 7;
  });

  y += 6;

  doc.setFontSize(14);
  doc.text("Important Dates", 20, y);

  y += 8;

  doc.setFontSize(11);

  results.importantDates?.forEach((date) => {
    doc.text(`• ${date}`, 25, y);
    y += 7;
  });

  y += 10;

  doc.setFontSize(10);
  doc.text(
    `Generated on ${new Date().toLocaleString()}`,
    20,
    y
  );

  doc.save("Meeting-Notes.pdf");
};