import axios from 'axios';
import { useEffect, useState } from 'react';
import CategoryCard from '../../Category/CategoryCard';
import CONFIG from "../../../utils/Config";

export default function Home() {
    const [bg, setBg] = useState('');

    const [color, setColor] = useState('')

    const getBg = async () => {
        try {
            const response = await axios.get(`/background/getResId/${localStorage.getItem('restaurant_id1')}`);
            setBg(response?.data[0]?.image);
            setColor(response?.data[0]?.color || '')
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
            <div className='absolute  h-[100%] z-10 inset-0 bg-[#0000008e]'>

            </div>
            <div
                style={{ backgroundColor: color }}
                className={`Header relative z-20 flex items-center justify-center p-[20px] rounded-b-[30px]`}>
                <img src="" alt="Logo" />
            </div>
            <div className='Container relative z-20'>
                <CategoryCard />
            </div>
        </div>
    );
}
