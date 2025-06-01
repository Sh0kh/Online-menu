import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Select,
    Option,
} from "@material-tailwind/react";
import { useState } from "react";

export default function CenterExam() {
    const [selectedType, setSelectedType] = useState("all");

    const exams = [
        {
            id: 1,
            title: "Matematika",
            type: "Fan",
            price: "50,000 so'm",
            image: "https://source.unsplash.com/400x300/?math",
        },
        {
            id: 2,
            title: "Fizika",
            type: "Fan",
            price: "60,000 so'm",
            image: "https://source.unsplash.com/400x300/?physics",
        },
        {
            id: 3,
            title: "Ingliz tili",
            type: "Til",
            price: "55,000 so'm",
            image: "https://source.unsplash.com/400x300/?english",
        },
        {
            id: 4,
            title: "Tarix",
            type: "Fan",
            price: "45,000 so'm",
            image: "https://source.unsplash.com/400x300/?history",
        },
        {
            id: 5,
            title: "Rus tili",
            type: "Til",
            price: "52,000 so'm",
            image: "https://source.unsplash.com/400x300/?russian",
        },
    ];

    const types = ["all", ...new Set(exams.map((exam) => exam.type))];
    const filteredExams = selectedType === "all"
        ? exams
        : exams.filter((exam) => exam.type === selectedType);

    return (
        <div className=" bg-gray-100 min-h-screen">
            {/* Фильтр */}
            <div className="mb-6 max-w-xs bg-[white] p-[10px] rounded-[8px]">
                <Select
                    label="Filtr bo‘yicha tanlang"
                    value={selectedType}
                    onChange={(val) => setSelectedType(val)}
                >
                    {types.map((type) => (
                        <Option key={type} value={type}>
                            {type === "all" ? "Barchasi" : type}
                        </Option>
                    ))}
                </Select>
            </div>

            {/* Карточки: один ряд, выравнены по левому краю */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredExams.map((exam) => (
                    <Card key={exam.id} className="shadow-md">
                        <CardHeader floated={false} className="h-40">
                            <img
                                src={exam.image}
                                alt={exam.title}
                                className="h-full w-full object-cover"
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                {exam.title}
                            </Typography>
                            <Typography color="gray" className="text-sm">
                                Tur: <span className="font-medium">{exam.type}</span>
                            </Typography>
                            <Typography color="gray" className="text-sm">
                                Narx: <span className="font-medium">{exam.price}</span>
                            </Typography>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}
