import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Typography,
    Textarea,
    Select,
    Option,
} from "@material-tailwind/react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { $api } from "../../../../utils";
import { Alert } from "../../../../utils/Alert";

export default function ExamCreate({ refresh }) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [language, setlanguage] = React.useState("");
    const [price, setprice] = React.useState("");
    const [selectedType, setSelectedType] = React.useState("");
    const [info, setInfo] = React.useState("");
    const [file, setFile] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [typeData, setTypeData] = useState([]);

    const createStudyCenter = async () => {
        // Валидация обязательных полей
        if (!name || !language || !price || !selectedType) {
            Alert("Barcha majburiy maydonlarni to'ldiring", "error");
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("language", language);
            formData.append("price", price);
            formData.append("type_id", selectedType);
            formData.append("center_id", localStorage.getItem('StId'));

            if (file) {
                formData.append("logo", file);
            }
            const response = await $api.post(`/study-center/exams`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Alert("Muvaffaqiyatli qo'shildi", "success");
            refresh();
            setName("");
            setlanguage("");
            setprice("");
            setSelectedType("");
            setInfo("");
            setFile(null);
            setOpen(false);

        } catch (error) {
            const errorMessage = error?.response?.data?.message || error.message || "Noma'lum xatolik";
            Alert(`Xatolik: ${errorMessage}`, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const getExamType = async () => {
        try {
            const response = await $api.get(`/study-center/exam-types`);
            setTypeData(response?.data || []);
        } catch (error) {
            console.log(error);
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

            const maxSize = 5 * 1024 * 1024; // 5MB
            if (selectedFile.size > maxSize) {
                Alert("Fayl hajmi 5MB dan oshmasligi kerak", "error");
                return;
            }

            setFile(selectedFile);
        }
    };

    const removeFile = () => {
        setFile(null);
        // Очищаем input
        const fileInput = document.getElementById("file-upload");
        if (fileInput) {
            fileInput.value = "";
        }
    };

    useEffect(() => {
        getExamType();
    }, []);

    return (
        <>
            <Button
                onClick={handleOpen}
                className="bg-blue-600 text-white text-[15px] font-semibold normal-case px-[25px] py-[8px] rounded-[8px] hover:bg-blue-600 shadow-none"
            >
                Yaratish
            </Button>

            <Dialog
                open={open}
                handler={handleOpen}
                size="xl"
                className="p-6 max-h-[90vh] overflow-y-auto"
                style={{ zIndex: 9000 }}
            >
                <DialogHeader className="text-gray-800 font-bold text-xl">
                    Yangi Imtihon yaratish
                </DialogHeader>

                <DialogBody className="space-y-4">
                    <Typography variant="small" color="gray" className="mb-2">
                        Barcha majburiy maydonlarni to'ldiring va saqlang.
                    </Typography>

                    <div className="grid grid-cols-1 gap-4">
                        <Input
                            label="Imtihon nomi"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            crossOrigin={undefined}
                            required
                        />

                        <Input
                            label="Til"
                            type="text"
                            value={language}
                            onChange={(e) => setlanguage(e.target.value)}
                            crossOrigin={undefined}
                            required
                        />

                        <Input
                            label="Narx"
                            type="number"
                            value={price}
                            onChange={(e) => setprice(e.target.value)}
                            crossOrigin={undefined}
                            required
                        />

                        {/* Select для типа экзамена */}
                        <div className="w-full">
                            <Select
                                label="Imtihon turi *"
                                value={String(selectedType)} // 👈 приводим к строке
                                onChange={(value) => setSelectedType(value)} // value уже строка
                                required
                            >
                                {typeData.map((type) => (
                                    <Option key={type.id} value={String(type.id)}> {/* 👈 тоже строка */}
                                        {type.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>

                        {/* Загрузка файла */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Logo yuklash
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
                                    Fayl tanlash
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
                        onClick={createStudyCenter}
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