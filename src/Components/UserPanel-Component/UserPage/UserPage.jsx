import AboutUs from "./components/AboutUs";
import Clients from "./components/Clients";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Service from "./components/Service";

export default function UserPage() {
    return (
        <div className="text-[white]">
            <Header />
            <Hero />
            <AboutUs />
            <Service />
            <Clients />
            <Contact />
            <Footer />
        </div>
    )
}