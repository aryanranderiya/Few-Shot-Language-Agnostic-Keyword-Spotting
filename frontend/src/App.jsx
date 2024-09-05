import * as React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <Navbar />
      <Footer />
      <Home />
    </>
  );
}
