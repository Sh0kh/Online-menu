import CONFIG from "../../utils/Config";


export default function MenuCard({ menuData }) {


    return (
        <div className="Container relative z-20">
            <div className="Menu__Wrapper mt-[50px]">
                {menuData.length > 0 ? (
                    menuData.map((i, index) => (
                        <div
                            key={i.id || index}
                            style={{ border: `4px solid ${i?.color?.border_color}` }}
                            className="cursor-pointer rounded-[20px] text-[white]"
                        >
                            <div
                                style={{ backgroundColor: i?.color?.text_color }}
                                className="w-full py-[5px]  rounded-t-[10px] h-[30px] text-center">
                                {i?.new === true && <span>Янгилик</span>}
                            </div>
                            <img

                                src={CONFIG.API_URL + i?.menu_images[0]?.image}
                                alt={i?.name}
                                className="object-cover h-[300px] w-full rounded-b-[10px]"
                            />
                            <div className="w-full pt-[10px]">
                                <h2
                                    style={{ color: i?.color?.text_color }}
                                    className="text-[30px] font-[800] text-center">
                                    {i?.name}
                                </h2>
                                <div
                                    style={{ backgroundColor: i?.color?.text_color }}
                                    className="w-[80%] h-[3px] mx-auto my-[15px] rounded-3xl"></div>
                                <h2
                                    style={{ color: i?.color?.text_color }}
                                    className="text-[30px] font-[800] text-center mb-[10px]">
                                    {i.price
                                        ? Number(i.price).toLocaleString("ru-RU")
                                        : "N/A"}{" "}
                                    Сум
                                </h2>
                                <div
                                    style={{ backgroundColor: i?.color?.text_color }}
                                    className="w-full py-[5px]  rounded-b-[10px] h-[30px] text-center">
                                    <span
                                        style={{ color: i?.color?.text_color }}
                                    >
                                        {i?.discount && i?.discount !== "" && Number(i?.discount) > 0
                                            ? `Скидка ${i?.discount} %`
                                            : ""}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <p>Нет данных</p>
                    </div>
                )}
            </div>
        </div>
    );
}