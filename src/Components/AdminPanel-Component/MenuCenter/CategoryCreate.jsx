import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Typography,
    Select,
    Option
} from "@material-tailwind/react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function CategoryCreate({ refresh }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [sort, setSort] = useState("");
    const [colorId, setColorId] = useState("");
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [colors, setColors] = useState([]);

    const restaurant_id = localStorage.getItem("restaurant_id1");

    // Ranglarni olish
    useEffect(() => {
        if (open && restaurant_id) {
            $api.get(`/color/${restaurant_id}`)
                .then(res => {
                    if (Array.isArray(res.data)) setColors(res.data);
                    else if (res.data) setColors([res.data]);
                    else setColors([]);
                })
                .catch(() => setColors([]));
        }
    }, [open, restaurant_id]);

    const createCategory = async () => {
        if (!name || !sort) {
            Alert("Barcha majburiy maydonlarni to'ldiring", "error");
            return;
        }
        if (isNaN(sort) || parseInt(sort) <= 0) {
            Alert("Tartib raqami musbat son bo'lishi kerak", "error");
            return;
        }
        if (!restaurant_id) {
            Alert("Restoran aniqlanmadi. Iltimos, qayta kiring.", "error");
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("restaurant_id", String(restaurant_id));
            formData.append("name", name);
            formData.append("sort", sort);
            if (colorId) formData.append("color_id", String(colorId));
            if (file) formData.append("image", file);

            await $api.post(`/category`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            Alert("Kategoriya muvaffaqiyatli qo'shildi", "success");
            refresh && refresh();
            setName("");
            setSort("");
            setColorId("");
            setFile(null);
            setOpen(false);
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error.message || "Noma'lum xatolik";
            Alert(`Xatolik: ${errorMessage}`, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpen = () => setOpen(!open);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(selectedFile.type)) {
                Alert("Faqat rasm fayllari (JPEG, PNG, GIF) yuklash mumkin", "error");
                return;
            }
            const maxSize = 5 * 1024 * 1024;
            if (selectedFile.size > maxSize) {
                Alert("Fayl hajmi 5MB dan oshmasligi kerak", "error");
                return;
            }
            setFile(selectedFile);
        }
    };

    const removeFile = () => {
        setFile(null);
        const fileInput = document.getElementById("file-upload");
        if (fileInput) fileInput.value = "";
    };

    return (
        <>
            <Button
                onClick={handleOpen}
                className="bg-blue-600 text-white text-[15px] font-semibold normal-case px-[25px] py-[8px] rounded-[8px] hover:bg-blue-600 shadow-none"
            >
                Kategoriya yaratish
            </Button>

            <Dialog
                open={open}
                handler={handleOpen}
                size="md"
                className="p-6 max-h-[90vh] overflow-y-auto"
                style={{ zIndex: 9000 }}
            >
                <DialogHeader className="text-gray-800 font-bold text-xl">
                    Yangi kategoriya yaratish
                </DialogHeader>

                <DialogBody className="space-y-4">
                    <Typography variant="small" color="gray" className="mb-2">
                        Kategoriya ma'lumotlarini kiriting.
                    </Typography>

                    <div className="grid grid-cols-1 gap-4">
                        <Input
                            label="Kategoriya nomi *"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            crossOrigin={undefined}
                            required
                            placeholder="Masalan: Issiq taomlar"
                        />

                        <Input
                            label="Tartib raqami *"
                            type="number"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            crossOrigin={undefined}
                            required
                            min="1"
                            placeholder="1"
                        />

                        <Select
                            label="Rang tanlang"
                            value={colorId}
                            onChange={val => setColorId(val)}
                            required
                        >
                            {colors.map(color => (
                                <Option key={color.id} value={color.id}>
                                    <span className="flex items-center gap-2">
                                        <span
                                            className="inline-block w-5 h-5 rounded border"
                                            style={{ background: color.text_color || color.color, borderColor: "#ccc" }}
                                        ></span>
                                        {color.name || color.color}
                                    </span>
                                </Option>
                            ))}
                        </Select>

                        {/* Загрузка изображения */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kategoriya rasmi
                            </label>
                            <div className="flex items-center gap-3 w-full">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                    accept="image/*"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
                                >
                                    <CloudUploadIcon style={{ fontSize: 18 }} />
                                    Rasm tanlash
                                </label>
                                {file && (
                                    <div className="flex items-center gap-2 flex-1">
                                        <span className="text-sm text-gray-700 truncate">
                                            {file.name}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            className="text-red-600 hover:text-red-800 text-sm"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}
                            </div>
                            {file && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Fayl hajmi: {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            )}
                        </div>
                    </div>
                </DialogBody>

                <DialogFooter className="flex justify-end gap-3">
                    <Button
                        variant="outlined"
                        color="blue-gray"
                        onClick={handleOpen}
                        disabled={isLoading}
                    >
                        Bekor qilish
                    </Button>
                    <Button
                        onClick={createCategory}
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={isLoading}
                    >
                        {isLoading ? "Yaratilmoqda..." : "Yaratish"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}