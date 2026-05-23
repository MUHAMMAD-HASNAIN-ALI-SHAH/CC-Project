import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Scanner from "./pages/Scanner";
import ScannerOutput from "./pages/ScannerOutput";
import Parser from "./pages/Parser";
import ParserOutput from "./pages/ParserOutput";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/parser" element={<Parser />} />
        <Route path="/scanner-output" element={<ScannerOutput />} />
        <Route path="/parser-output" element={<ParserOutput />} />
      </Routes>
    </>
  );
}

export default App;
