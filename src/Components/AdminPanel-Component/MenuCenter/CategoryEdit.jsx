import React, { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Typography,
} from "@material-tailwind/react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function CategoryEdit({ open, setOpen, initialData, refresh, id }) {
    const [name, setName] = useState(initialData?.name || "");
    const [sort, setSort] = useState(initialData?.sort || "");
    const [colorId, setColorId] = useState(initialData?.color_id || "");
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState(
        initialData?.image
            ? initialData.image.startsWith('http')
                ? initialData.image
                : (import.meta.env.VITE_API_URL || '') + initialData.image
            : null
    );

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
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
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const removeFile = () => {
        setFile(null);
        setPreview(
            initialData?.image
                ? initialData.image.startsWith('http')
                    ? initialData.image
                    : (import.meta.env.VITE_API_URL || '') + initialData.image
                : null
        );
        const fileInput = document.getElementById("file-edit-upload");
        if (fileInput) fileInput.value = "";
    };

    const handleEdit = async () => {
        if (!name || !sort) {
            Alert("Barcha majburiy maydonlarni to'ldiring", "error");
            return;
        }
        if (isNaN(sort) || parseInt(sort) <= 0) {
            Alert("Tartib raqami musbat son bo'lishi kerak", "error");
            return;
        }
        const restaurant_id = localStorage.getItem("restaurant_id1");
        if (!restaurant_id) {
            Alert("Restoran aniqlanmadi. Iltimos, qayta kiring.", "error");
            return;
        }
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("restaurant_id", restaurant_id);
            formData.append("name", name);
            formData.append("sort", sort);
            if (colorId) formData.append("color_id", colorId);
            if (file) formData.append("image", file);
            await $api.put(`/category/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            Alert("Kategoriya muvaffaqiyatli yangilandi", "success");
            refresh && refresh();
            setOpen(false);
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error.message || "Noma'lum xatolik";
            Alert(`Xatolik: ${errorMessage}`, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            handler={() => setOpen(false)}
            size="md"
            className="p-6 max-h-[90vh] overflow-y-auto"
            style={{ zIndex: 9000 }}
        >
            <DialogHeader className="text-gray-800 font-bold text-xl">
                Kategoriyani tahrirlash
            </DialogHeader>
            <DialogBody className="space-y-4">
                <Typography variant="small" color="gray" className="mb-2">
                    Kategoriya ma'lumotlarini o'zgartiring.
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
                    <Input
                        label="Color ID"
                        value={colorId}
                        onChange={(e) => setColorId(e.target.value)}
                        crossOrigin={undefined}
                        placeholder="Masalan: #FF5733 yoki 1"
                    />
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Kategoriya rasmi
                        </label>
                        <div className="flex items-center gap-3 w-full">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                id="file-edit-upload"
                                accept="image/*"
                            />
                            <label
                                htmlFor="file-edit-upload"
                                className="cursor-pointer bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
                            >
                                <CloudUploadIcon style={{ fontSize: 18 }} />
                                Rasm tanlash
                            </label>
                            {(file || preview) && (
                                <div className="flex items-center gap-2 flex-1">
                                    <span className="text-sm text-gray-700 truncate">
                                        {file ? file.name : (preview ? 'Yuklangan rasm' : '')}
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
                        {(file || preview) && (
                            <img
                                src={file ? URL.createObjectURL(file) : preview}
                                alt="preview"
                                className="mt-2 w-32 h-20 object-cover rounded"
                            />
                        )}
                    </div>
                </div>
            </DialogBody>
            <DialogFooter className="flex justify-end gap-3">
                <Button
                    variant="outlined"
                    color="blue-gray"
                    onClick={() => setOpen(false)}
                    disabled={isLoading}
                >
                    Bekor qilish
                </Button>
                <Button
                    onClick={handleEdit}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                >
                    {isLoading ? "Saqlanmoqda..." : "Saqlash"}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}