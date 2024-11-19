import React from "react";
import { Analytics } from "@vercel/analytics/react"
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Resume from "./components/Resume/Resume";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <Resume />
      <Projects />
      <Contact />
      <Analytics />
    </>
  );
}

export default App;
