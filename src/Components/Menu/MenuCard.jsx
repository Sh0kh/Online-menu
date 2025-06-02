import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CONFIG from "../../utils/Config";
import ReactLoading from "react-loading";

// Static data
const staticData = {
    "status": 200,
    "message": "Menus retrieved successfully",
    "data": {
        "category": {
            "id": 27,
            "name": "ХОЛОДНЫЕ ЗАКУСКИ",
            "image": "50881132-354e-4e37-8384-f8b9cf12e7c2.jpg",
            "sort": 1,
            "createdAt": "2024-11-28T16:33:03.012Z",
            "updatedAt": "2024-11-28T16:33:03.012Z"
        },
        "records": [
            {
                "id": 10,
                "name": "Сырная марелка",
                "price": "99000",
                "discount": "",
                "type": false,
                "new": false,
                "description": "",
                "image": "c1adb4ac-e828-49ad-91c0-e4a2749253d8.jpg",
                "sort": 2,
                "category_id": 27,
                "createdAt": "2024-11-28T17:21:59.272Z",
                "updatedAt": "2024-11-28T17:21:59.272Z"
            },
            {
                "id": 14,
                "name": "Селедка по крестьянский",
                "price": "42000",
                "discount": "",
                "type": false,
                "new": false,
                "description": "",
                "image": "556cee9e-d2c7-4292-bd1b-a5de867b61cd.jpg",
                "sort": 6,
                "category_id": 27,
                "createdAt": "2024-11-28T17:27:23.693Z",
                "updatedAt": "2024-11-28T17:27:23.693Z"
            },
            {
                "id": 11,
                "name": "Свежий нарезка",
                "price": "25000",
                "discount": "",
                "type": false,
                "new": false,
                "description": "",
                "image": "5ad409e6-1b9f-48e8-b519-603ae14747cd.jpg",
                "sort": 3,
                "category_id": 27,
                "createdAt": "2024-11-28T17:23:39.651Z",
                "updatedAt": "2025-03-31T21:09:22.453Z"
            },
            {
                "id": 12,
                "name": "Овощное ассорти",
                "price": "39000",
                "discount": "",
                "type": false,
                "new": false,
                "description": "",
                "image": "619b1812-e3b1-4f3f-9a43-6a4f83cf3504.jpg",
                "sort": 4,
                "category_id": 27,
                "createdAt": "2024-11-28T17:24:46.518Z",
                "updatedAt": "2025-03-31T21:26:50.997Z"
            },
            {
                "id": 13,
                "name": "Закуска под водочку",
                "price": "79000",
                "discount": "",
                "type": false,
                "new": false,
                "description": "",
                "image": "772b3865-3a86-4e79-9649-e1d93ed359bb.jpg",
                "sort": 5,
                "category_id": 27,
                "createdAt": "2024-11-28T17:25:41.840Z",
                "updatedAt": "2025-03-31T21:33:33.461Z"
            },
            {
                "id": 15,
                "name": "Мутабель",
                "price": "36000",
                "discount": "",
                "type": false,
                "new": false,
                "description": "",
                "image": "02e15c29-ce23-4365-86dd-a95083070d8b.jpg",
                "sort": 7,
                "category_id": 27,
                "createdAt": "2024-11-28T17:28:32.498Z",
                "updatedAt": "2025-03-31T21:34:11.668Z"
            },
            {
                "id": 16,
                "name": "Сузьма",
                "price": "12000",
                "discount": "",
                "type": false,
                "new": false,
                "description": "",
                "image": "78262e20-e69b-4485-8190-f88735b6f819.jpg",
                "sort": 8,
                "category_id": 27,
                "createdAt": "2024-11-28T17:30:31.713Z",
                "updatedAt": "2025-03-31T21:34:23.242Z"
            },
            {
                "id": 17,
                "name": "Ачиле эзме",
                "price": "69000",
                "discount": "",
                "type": false,
                "new": false,
                "description": "",
                "image": "7ae637b6-dc55-4c56-8b9d-a3662045cbc4.jpg",
                "sort": 9,
                "category_id": 27,
                "createdAt": "2024-11-28T17:31:04.856Z",
                "updatedAt": "2025-03-31T21:34:46.104Z"
            },
            {
                "id": 18,
                "name": "Икра красная",
                "price": "190000",
                "discount": "",
                "type": false,
                "new": false,
                "description": "",
                "image": "83e86f50-74f1-48cd-a79e-a80dae3d520a.jpg",
                "sort": 10,
                "category_id": 27,
                "createdAt": "2024-11-28T17:32:56.267Z",
                "updatedAt": "2025-03-31T21:35:14.308Z"
            },
            {
                "id": 9,
                "name": "Мясное ассорти",
                "price": "175000",
                "discount": "",
                "type": false,
                "new": false,
                "description": "",
                "image": "51a4e912-8560-4d7a-b1bc-227e9c3657c1.jpg",
                "sort": 1,
                "category_id": 27,
                "createdAt": "2024-11-28T17:21:05.632Z",
                "updatedAt": "2024-12-18T17:23:43.056Z"
            }
        ],
        "pagination": {
            "currentPage": 1,
            "total_pages": 1,
            "total_count": 10
        }
    }
};

export default function MenuCard() {
    const { ID } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for better UX
        const timer = setTimeout(() => {
            setData(staticData.data.records);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen w-full">
                <ReactLoading type="spinningBubbles" color="white" height={100} width={100} />
            </div>
        );
    }

    return (
        <div className="Container relative z-20">
            <div className="Menu__Wrapper mt-[50px]">
                {data.length > 0 ? (
                    data.map((i, index) => (
                        <div
                            key={i.id || index}
                            className="border-[3px] border-[#A79684] cursor-pointer rounded-[20px] text-[white]"
                        >
                            <div className="w-full py-[5px] bg-[#A79684] rounded-t-[10px] h-[30px] text-center">
                                {i?.new === true && <span>Янгилик</span>}
                            </div>
                            <img
                                src={CONFIG.API_URL + i?.image}
                                alt={i?.name}
                                className="object-cover rounded-b-[10px]"
                            />
                            <div className="w-full pt-[10px]">
                                <h2 className="text-[30px] font-[800] text-center">
                                    {i?.name}
                                </h2>
                                <div className="w-[80%] h-[3px] bg-[#A79684] mx-auto my-[15px] rounded-3xl"></div>
                                <h2 className="text-[30px] font-[800] text-center mb-[10px]">
                                    {i.price
                                        ? Number(i.price).toLocaleString("ru-RU")
                                        : "N/A"}{" "}
                                    Сум
                                </h2>
                                <div className="w-full py-[5px] bg-[#A79684] rounded-b-[10px] h-[30px] text-center">
                                    <span>
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