import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Termsofservice from "./pages/Termsofservice";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<Policy />} />
        <Route path="/terms-of-service" element={<Termsofservice />} />
        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
