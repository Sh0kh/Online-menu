import axios from 'axios';
import { useEffect, useState } from 'react';
import CONFIG from "../../../utils/Config";

import { NavLink } from 'react-router-dom';
import MenuCard from '../../Menu/MenuCard';

export default function Menu() {
    const [bg, setBg] = useState('');

    const getBg = async () => {
        try {
            const response = await axios.get(`/background`);
            setBg(response?.data[0]?.image);
        } catch (error) {
            console.error('Failed to fetch background:', error);
        }
    };

    useEffect(() => {
        getBg();
    }, [])

    const backgroundStyle = bg ? { backgroundImage: `url(${CONFIG.API_URL + bg})` } : {};

    return (
        <div className="pb-[50px] relative min-h-[1000px] h-[100%] bg-cover bg-center bg-no-repeat" style={backgroundStyle}>
            <div className='absolute  z-10 inset-0 bg-[#fffffff]'>

            </div>
            <div className="Header relative z-20 flex items-center justify-between bg-[#A79684] p-[20px] rounded-b-[30px]">
                <img src="" alt="Logo" />
                <NavLink to={'/'}>
                    <button className='bg-white text-[black] px-[30px] py-[10px] rounded-[10px] duration-500 border-[2px] border-[white] hover:bg-transparent hover:text-[white]'>
                        Ortga
                    </button>
                </NavLink>
            </div>
            <MenuCard/>
        </div>
    );
}
