import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <section className="components-container">
        <About />
        <Skills />
        <Projects />
        <Contact />
      </section>
    </>
  );
}

export default App;