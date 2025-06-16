import CONFIG from "../../utils/Config";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ReactLoading from 'react-loading';
import axios from "axios";

export default function CategoryCard() {
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllCategory = async () => {
        setLoading(true)
        try {
            const response = await axios(`category/${localStorage.getItem('restaurant_id1')}/page?page=${1}`)
            setCategoryData(response?.data?.data?.records)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

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
