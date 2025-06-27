import axios from 'axios';
import { useEffect, useState } from 'react';
import CONFIG from "../../../utils/Config";
import ReactLoading from 'react-loading';
import { NavLink, useParams } from 'react-router-dom';
import MenuCard from '../../Menu/MenuCard';

export default function Menu() {
    const { ID } = useParams()
    const [bg, setBg] = useState('');
    const [logo, setLogo] = useState('');
    const [color, setColor] = useState('');
    const [menuData, setmenuData] = useState([]);

    const [loadingBg, setLoadingBg] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingRest, setLoadingRest] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                // 1. Получаем ресторан
                const restRes = await axios.get('restaurant/domen/mazza.umenu.uz');
                const restData = restRes.data;
                const restId = restData?.balance?.[0]?.restaurant_id;
                setLogo(restData?.logo_img || '');
                setLoadingRest(false); // ресторан успешно загружен

                if (!restId) throw new Error('Нет restaurant_id');

                // 2. Получаем background
                axios.get(`/background/getResId/${restId}`)
                    .then((res) => {
                        const bgData = res.data?.[0];
                        setBg(bgData?.image || '');
                        setColor(bgData?.color || '');
                    })
                    .catch(err => console.error('Ошибка фона:', err))
                    .finally(() => setLoadingBg(false));

                // 3. Получаем категории
                axios.get(`menu/${restId}/${ID}/page?page=1`)
                    .then(res => {
                        setmenuData(res.data?.data?.records || []);
                    })
                    .catch(err => console.error('Ошибка категорий:', err))
                    .finally(() => setLoadingCategories(false));

            } catch (error) {
                console.error('Ошибка при загрузке ресторана:', error);
                setLoadingRest(false);
                setLoadingBg(false);
                setLoadingCategories(false);
            }
        };

        fetchAll();
    }, []);

    const loading = loadingRest || loadingBg || loadingCategories;
    const backgroundStyle = bg ? { backgroundImage: `url(${CONFIG.API_URL + bg})` } : {};

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen w-full'>
                <ReactLoading type="spinningBubbles" color="white" height={100} width={100} />
            </div>
        );
    }


    return (
        <div className="pb-[50px] relative min-h-[1000px] h-[100%] bg-cover bg-center bg-no-repeat" style={backgroundStyle}>
            <div className='absolute  z-10 inset-0 bg-[#fffffff]'>

            </div>
            <div
                style={{ backgroundColor: color }}
                className="Header relative z-20 flex items-center justify-between  p-[10px] rounded-b-[30px]">
                <img className='w-[80px]' src={CONFIG?.API_URL + logo} alt="Logo" />
                <NavLink to={'/menu'}>
                    <button className='bg-white text-[black] px-[30px] py-[10px] rounded-[10px] duration-500 border-[2px] border-[white] hover:bg-transparent hover:text-[white]'>
                        Ortga
                    </button>
                </NavLink>
            </div>
            <MenuCard menuData={menuData} />
        </div>
    );
}
