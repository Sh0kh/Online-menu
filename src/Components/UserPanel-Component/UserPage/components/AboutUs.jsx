import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AboutUs() {
    useEffect(() => {
        AOS.init({ once: true, duration: 1000 });
    }, []);

    return (
        <section id="biz-haqimizda" className="py-24 bg-black text-white">
            <div className="Container max-w-3xl mx-auto px-4 text-center">
                <h2
                    className="text-3xl md:text-4xl font-semibold mb-8 tracking-wide"
                    data-aos="fade-up"
                >
                    Biz nima qilamiz?
                </h2>

                <p
                    className="text-base md:text-lg text-gray-300 leading-relaxed mb-6"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Biz siz uchun zamonaviy va qulay <span className="text-white font-medium">onlayn menyu</span> platformasini yaratamiz.
                    Bu menyu mijozlaringiz uchun planshet yoki telefon orqali osongina foydalanish imkonini beradi —
                    dizayn chiroyli, tezkor va interaktiv.
                </p>

                <p
                    className="text-base md:text-lg text-gray-300 leading-relaxed mb-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Shuningdek, biz sizning biznesingiz uchun <span className="text-white font-medium">CRM tizimi</span> ishlab chiqamiz.
                    Bu orqali siz mijozlar, buyurtmalar, xodimlar va hisobotlarni bitta joydan samarali boshqarishingiz mumkin.
                </p>

                <p
                    className="text-base md:text-lg text-gray-300 leading-relaxed mb-6"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    Bizning maqsad — sizning restoraningiz sifati va darajasini yangi bosqichga olib chiqish. Texnologiyalar yordamida
                    xizmatni avtomatlashtirib, mijozlar tajribasini yuksaltirishga yordam beramiz. Har bir tafsilot — menyudan tortib buyurtmagacha —
                    qulay, tezkor va intuitiv bo‘lishi kerak.
                </p>

                <p
                    className="text-base md:text-lg text-gray-300 leading-relaxed"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    Biz bilan birga siz o‘z restoraningizni zamonaviy, raqamli va foydalanuvchiga qulay platformaga aylantirasiz.
                    Bu esa nafaqat mijozlar sonini oshiradi, balki sizning brendingizga professional yondashuv olib kiradi.
                </p>
            </div>
        </section>
    );
}
