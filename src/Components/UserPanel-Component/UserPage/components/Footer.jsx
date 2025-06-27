import Logo from '../../../../Images/logo.png';
import { FaTelegramPlane } from 'react-icons/fa'; // Установи: npm i react-icons

export default function Footer() {
    return (
        <footer className="bg-black text-white py-8">
            <div className="Container max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Left - Logo */}
                <div className="flex items-center gap-3">
                    <img src={Logo} alt="Logo" className="w-[100px]" />
                </div>

                {/* Right - Contact Buttons */}
                <div className="flex flex-wrap gap-4 items-center">
                    {/* Phone button */}
                    <a
                        href="tel:+998970206868"
                        className="px-4 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition"
                    >
                        +998 97 020 6868
                    </a>

                    {/* Telegram button */}
                    <a
                        href="https://t.me/shoxruh_tuxtanazarov" // замените на ваш username
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition"
                    >
                        <FaTelegramPlane />
                        Telegram
                    </a>
                </div>
            </div>
        </footer>
    );
}
