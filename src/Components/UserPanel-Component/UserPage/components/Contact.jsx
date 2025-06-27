import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

export default function Contact() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        AOS.init({ once: true, duration: 1000 });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Минимальная валидация
        if (!name.trim() || !phone.trim()) {
            alert("Iltimos, ismingiz va telefon raqamingizni kiriting.");
            return;
        }

        try {
            const response = await axios.post('/message', {
                full_name: name,
                phone_number: phone
            });
            console.log("Yuborildi:", response.data);
            alert("Xabaringiz yuborildi!"); // или Toastify
            setName('');
            setPhone('');
        } catch (error) {
            console.error("Xatolik:", error);
            alert("Xatolik yuz berdi. Qaytadan urinib ko‘ring.");
        }
    };

    return (
        <section
            id="aloqa"
            className="relative bg-fixed bg-center bg-cover py-24 Contact"
        >
            <div className="absolute inset-0 bg-black/70 z-10" />

            <div className="relative z-20 Container max-w-md mx-auto px-4">
                <h2
                    className="text-3xl md:text-4xl font-semibold text-center text-white mb-10"
                    data-aos="fade-up"
                >
                    Bog‘lanish
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-900/90 p-6 rounded-lg max-w-[700px] mx-auto shadow-xl space-y-4"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                            Ismingiz
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ismingizni kiriting"
                            className="w-full px-3 py-2 bg-black border border-gray-700 text-white rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                            Telefon raqamingiz
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+998 90 123 45 67"
                            className="w-full px-3 py-2 bg-black border border-gray-700 text-white rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black py-2.5 rounded-md font-semibold hover:bg-gray-200 transition"
                    >
                        Yuborish
                    </button>
                </form>
            </div>
        </section>
    );
}
