import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";
import { About, Skills, useReveal } from "./components/Sections.jsx";
import Contact from "./components/Contact.jsx";
import ChatWidget from "./components/ChatWidget.jsx";

export default function App() {
  useReveal();
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <Work />
        <About />
        <Skills />
        <Contact />
      </main>
      <ChatWidget />
    </>
  );
}
