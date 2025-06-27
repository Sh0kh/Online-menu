import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Clients() {
    useEffect(() => {
        AOS.init({ once: true, duration: 1000 });
    }, []);

    return (
        <section id="mijozlar" className="bg-black py-24">
            <div className="Container max-w-6xl mx-auto px-4 text-center">
                <h2
                    className="text-3xl md:text-4xl font-semibold text-white mb-12 tracking-wide"
                    data-aos="fade-up"
                >
                    Bizga ishonadigan mijozlar
                </h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {/* Client 1 */}
                    <div
                        className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-white transition-all duration-300 shadow-md"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <h3 className="text-xl font-bold text-white mb-2">Darxon Cafe</h3>
                        <p className="text-gray-400 text-sm">
                            Onlayn menyu orqali mijozlarga tez va qulay xizmat ko‘rsatish.
                        </p>
                    </div>

                    {/* Client 2 */}
                    <div
                        className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-white transition-all duration-300 shadow-md"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <h3 className="text-xl font-bold text-white mb-2">Mondi</h3>
                        <p className="text-gray-400 text-sm">
                            Buyurtmalarni boshqarish uchun zamonaviy CRM tizimi joriy etilgan.
                        </p>
                    </div>

                    {/* Client 3 */}
                    <div
                        className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-white transition-all duration-300 shadow-md"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <h3 className="text-xl font-bold text-white mb-2">Huzur Cafe</h3>
                        <p className="text-gray-400 text-sm">
                            Interaktiv menyu va onlayn band qilish tizimi bilan jihozlangan.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
