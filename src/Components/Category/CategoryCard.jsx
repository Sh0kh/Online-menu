import CONFIG from "../../utils/Config";
import { NavLink } from "react-router-dom";

export default function CategoryCard({ categoryData }) {




    return (
        <div className="Category__Wrapper mt-[50px] grid md:grid-cols-3 gap-5">
            {categoryData.map((i, index) => (
                <NavLink key={index} to={`/category/${i?.id}`}>
                    <div
                        className="Category__Card h-[310px] relative   rounded-[30px] bg-cover bg-no-repeat bg-center"
                        style={{ backgroundImage: `url(${CONFIG.API_URL + i.image})`, border: `4px solid ${i?.color?.border_color}` }} >
                        <div className="flex items-center justify-center h-full">
                            <h2
                                style={{ color: i?.color?.text_color }}
                                className="text-[30px] relative z-20 text-white">
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
