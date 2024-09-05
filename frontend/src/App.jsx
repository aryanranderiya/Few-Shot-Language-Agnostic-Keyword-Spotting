import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import OutputPage from "./pages/Output";
import AudioTable from "./pages/AllData";
import SpeechDictation from "./pages/SpeechDictation"

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Footer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/output" element={<OutputPage />} />
        <Route path="/all" element={<AudioTable />} />
        <Route path="/dictate" element={<SpeechDictation />} />
      </Routes>
    </BrowserRouter>
  );
}
