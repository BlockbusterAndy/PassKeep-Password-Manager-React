import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/30 to-base-100 flex flex-col">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="flex-grow container mx-auto px-4 py-6">
        <Manager />
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
