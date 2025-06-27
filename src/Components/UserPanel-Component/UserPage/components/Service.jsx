import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Service() {
    useEffect(() => {
        AOS.init({ once: true, duration: 1000 });
    }, []);

    return (
        <section id="xizmatlar" className="relative Service bg-fixed bg-center bg-cover text-white py-24">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 z-10" />

            {/* Content */}
            <div className="relative z-20 Container max-w-6xl mx-auto px-4">
                <h2
                    className="text-3xl md:text-4xl font-semibold text-center mb-12"
                    data-aos="fade-up"
                >
                    Bizning xizmatlar
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div
                        className="bg-white text-black p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <h3 className="text-xl font-bold mb-2">Onlayn menyu</h3>
                        <p className="text-sm text-gray-700">
                            Restoran va kafelar uchun raqamli menyu. Telefon yoki planshet orqali qulay va interaktiv ko‘rinishda.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div
                        className="bg-white text-black p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <h3 className="text-xl font-bold mb-2">CRM tizimi</h3>
                        <p className="text-sm text-gray-700">
                            Mijozlar, buyurtmalar va xodimlarni boshqarish uchun to‘liq avtomatlashtirilgan CRM yechimi.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div
                        className="bg-white text-black p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <h3 className="text-xl font-bold mb-2">Onlayn bron qilish</h3>
                        <p className="text-sm text-gray-700">
                            Mijozlar uchun joy band qilish tizimi. Jadval asosida boshqarish va SMS orqali xabarnoma.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
