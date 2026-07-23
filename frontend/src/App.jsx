import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TranscriptInput from "./components/TranscriptInput";

function App() {
  return (
    <div className="min-h-screen bg-[#0B0A14] font-sans antialiased">
      <Navbar />
      <Hero />
      <TranscriptInput />
    </div>
  );
}

export default App;
