import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Logo from '../../../../Images/logo.png';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        AOS.init({ once: true, duration: 800 });
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            data-aos="fade-down"
            className={`w-full fixed top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 shadow-lg backdrop-blur-md' : 'bg-black/80'
                }`}
        >
            <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2" data-aos="fade-right" data-aos-delay="100">
                    <img className="w-[90px]" src={Logo} alt="Logo" />
                </div>

                {/* Desktop menyu */}
                <nav className="hidden md:flex gap-6 text-white font-medium">
                    <a
                        href="#biz-haqimizda"
                        data-aos="fade-down"
                        data-aos-delay="200"
                        className="hover:opacity-[0.5] transition"
                    >
                        Biz haqimizda
                    </a>
                    <a
                        href="#xizmatlar"
                        data-aos="fade-down"
                        data-aos-delay="300"
                        className="hover:opacity-[0.5] transition"
                    >
                        Xizmatlar
                    </a>

                    <a
                        href="#mijozlar"
                        data-aos="fade-down"
                        data-aos-delay="500"
                        className="hover:opacity-[0.5] transition"
                    >
                        Mijozlar
                    </a>
                    <a
                        href="#aloqa"
                        data-aos="fade-down"
                        data-aos-delay="400"
                        className="hover:opacity-[0.5] transition"
                    >
                        Aloqa
                    </a>
                </nav>

                {/* Mobil: faqat bitta "Aloqa" tugmasi */}
                <div className="md:hidden" data-aos="zoom-in" data-aos-delay="300">
                    <a
                        href="#aloqa"
                        className="text-black bg-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-70 transition"
                    >
                        Aloqa
                    </a>
                </div>
            </div>
        </header>
    );
}
