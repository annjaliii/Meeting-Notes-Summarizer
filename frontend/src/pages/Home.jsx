import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TranscriptInput from "../components/TranscriptInput";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TranscriptInput />
    </div>
  );
};

export default Home;