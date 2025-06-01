import { Button, Card, Typography } from "@material-tailwind/react";

export default function Price() {
    // Пример данных
    const prices = [50000, 55000, 60000, 45000];

    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);

    return (
        <div className="p-6 space-y-6">
            {/* Заголовок и кнопка */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Typography variant="h4" color="blue-gray" className="font-bold">
                    Narxlar Statistkasi
                </Typography>
                <Button
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition"
                >
                    Yangilash
                </Button>
            </div>

            {/* Карточки */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-green-50 p-6 shadow-md rounded-xl">
                    <Typography variant="h6" color="green" className="mb-2">
                        Maksimal summa
                    </Typography>
                    <Typography variant="h3" color="green" className="font-bold">
                        {maxPrice.toLocaleString("uz-UZ")} so'm
                    </Typography>
                </Card>

                <Card className="bg-red-50 p-6 shadow-md rounded-xl">
                    <Typography variant="h6" color="red" className="mb-2">
                        Minimal summa
                    </Typography>
                    <Typography variant="h3" color="red" className="font-bold">
                        {minPrice.toLocaleString("uz-UZ")} so'm
                    </Typography>
                </Card>
            </div>
        </div>
    );
}
