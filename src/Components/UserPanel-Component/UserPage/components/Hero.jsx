import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Hero() {
    useEffect(() => {
        AOS.init({ once: true, duration: 1000 });
    }, []);

    return (
        <section className="w-full relative h-[700px] bg-cover bg-center UserHero">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 z-10" />

            {/* Content */}
            <div className="Container relative z-20 h-full flex flex-col justify-center items-center text-center text-white px-4">
                <h1
                    className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
                    data-aos="fade-up"
                >
                    Zamonaviy Onlayn Menu
                </h1>

                <p
                    className="text-lg md:text-xl max-w-2xl mb-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Mijozlaringiz uchun qulay, tez va chiroyli interfeysga ega raqamli menyu yaratish — endi juda oson!
                </p>

                <a
                    href="#aloqa"
                    data-aos="zoom-in"
                    data-aos-delay="400"
                    className="bg-white text-black border border-white hover:bg-black hover:text-white transition px-6 py-3 rounded-full font-medium text-sm md:text-base"
                >
                    Biz bilan bog'lanish
                </a>
            </div>
        </section>
    );
}
