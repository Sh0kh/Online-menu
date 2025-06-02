import CONFIG from "../../utils/Config";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ReactLoading from 'react-loading';

export default function CategoryCard() {
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const staticData = [
            {
                id: 27,
                name: "ХОЛОДНЫЕ ЗАКУСКИ",
                image: "50881132-354e-4e37-8384-f8b9cf12e7c2.jpg",
            },
            {
                id: 28,
                name: "ГОРЯЧИЕ ЗАКУСКИ",
                image: "06eb722e-dafd-4dbf-89a3-43fa548df299.jpg",
            },
            {
                id: 29,
                name: "САЛАТЫ",
                image: "03f31db6-f8e7-49c2-9e6a-af0c53568ad5.JPG",
            },
            {
                id: 30,
                name: "ГАРНИРЫ",
                image: "4be2ecb4-7302-4f0b-aebc-bcc3bc34e7d0.jpg",
            },
            {
                id: 34,
                name: "СУПЫ",
                image: "d79757f7-f936-478a-9e26-64e9b32581b4.jpg",
            },
            {
                id: 31,
                name: "ОСНОВНЫЕ БЛЮДО",
                image: "05d51d1a-0953-4d65-9517-9b5615db8e0f.jpg",
            },
            {
                id: 32,
                name: "БЛЮДА НА МАНГАЛЕ",
                image: "37654c78-ebf2-40ee-b80d-b9a882da96ca.jpg",
            },
            {
                id: 33,
                name: "ДЕСЕРТЫ",
                image: "0ffb47b3-c3a2-4dbc-952f-0a14fa876240.jpg",
            }
        ];

        setCategoryData(staticData);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen w-full'>
                <ReactLoading type="spinningBubbles" color="white" height={100} width={100} />
            </div>
        );
    }

    return (
        <div className="Category__Wrapper mt-[50px] grid md:grid-cols-3 gap-5">
            {categoryData.map((i, index) => (
                <NavLink key={index} to={`/category/${i?.id}`}>
                    <div className="Category__Card h-[310px] relative border-[4px] border-[#A79684] rounded-[30px] bg-cover bg-no-repeat bg-center"
                        style={{ backgroundImage: `url(${CONFIG.API_URL + i.image})` }} >
                        <div className="flex items-center justify-center h-full">
                            <h2 className="text-[30px] relative z-20 text-white">
                                {i.name}
                            </h2>
                        </div>
                        <div className="absolute z-10 inset-0 bg-black/60 hover:bg-black/70 cursor-pointer rounded-[25px]"></div>
                    </div>
                </NavLink>
            ))}
        </div>
    );
}
