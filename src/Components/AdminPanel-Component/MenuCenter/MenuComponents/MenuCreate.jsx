import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Checkbox,
    Typography,
    Select,
    Option
} from "@material-tailwind/react";
import { $api } from "../../../../utils";
import { Alert } from "../../../../utils/Alert";

export default function MenuCreate({ open, setOpen, refresh, categoryId }) {
    const { id } = useParams();
    const category_id = categoryId || id;

    const [name, setName] = useState("");
    const [colorId, setColorId] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [type, setType] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [sort, setSort] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [topText, setTopText] = useState("");
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [colors, setColors] = useState([]);
    const [isLoadingColors, setIsLoadingColors] = useState(false);

    // Fayl validatsiyasi
    const validateFile = (file) => {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

        if (file.size > maxSize) {
            Alert(`Fayl hajmi 5MB dan kichik bo'lishi kerak: ${file.name}`, "error");
            return false;
        }

        if (!allowedTypes.includes(file.type)) {
            Alert(`Fayl turi qo'llab-quvvatlanmaydi: ${file.name}`, "error");
            return false;
        }

        return true;
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(validateFile);

        if (validFiles.length !== files.length) {
            // Ba'zi fayllar validatsiyadan o'tmadi
            return;
        }

        setImages(validFiles);
    };

    // Maydonlarni tozalash
    const resetForm = () => {
        setName("");
        setColorId("");
        setPrice("");
        setDiscount("");
        setType(false);
        setIsNew(false);
        setSort("");
        setBottomText("");
        setTopText("");
        setImages([]);
    };

    const getColor = async () => {
        setIsLoadingColors(true);
        try {
            const response = await $api.get(`/color/${localStorage.getItem('restaurant_id1')}`);
            setColors(response.data || []);
        } catch (error) {
            console.log(error);
            Alert("Ranglarni yuklashda xatolik yuz berdi", "error");
            setColors([]);
        } finally {
            setIsLoadingColors(false);
        }
    };

    useEffect(() => {
        if (open) {
            getColor();
        }
    }, [open]);

    const handleSubmit = async () => {
        // Validatsiya
        const restaurant_id = localStorage.getItem("restaurant_id1");

        if (!restaurant_id) {
            Alert("Restaurant ID topilmadi. Qaytadan login qiling", "error");
            return;
        }
        if (!category_id) {
            Alert("Category ID topilmadi. URL ni tekshiring yoki categoryId prop'ini uzating", "error");
            return;
        }
        if (!name.trim()) {
            Alert("Menu nomini kiriting", "error");
            return;
        }
        if (!price || isNaN(price) || parseFloat(price) <= 0) {
            Alert("To'g'ri narx kiriting", "error");
            return;
        }
        if (discount && (isNaN(discount) || parseFloat(discount) < 0)) {
            Alert("To'g'ri chegirma kiriting", "error");
            return;
        }
        if (sort && isNaN(sort)) {
            Alert("Tartib raqami son bo'lishi kerak", "error");
            return;
        }
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append("restaurant_id", restaurant_id);
            formData.append("category_id", category_id);
            formData.append("name", name.trim());
            formData.append("price", parseFloat(price).toString());

            if (colorId.trim()) formData.append("color_id", colorId.trim());
            if (discount) formData.append("discount", parseFloat(discount).toString());
            // Boolean qiymatlarni string sifatida yuborish
            formData.append("type", type ? "1" : "0");
            formData.append("new", isNew ? "1" : "0");

            if (sort) formData.append("sort", parseInt(sort).toString());
            if (bottomText.trim()) formData.append("bottom_text", bottomText.trim());
            if (topText.trim()) formData.append("top_text", topText.trim());

            // Fayllarni qo'shish
            if (images.length > 0) {
                images.forEach((img, index) => {
                    formData.append("images", img);
                });
            }

            const response = await $api.post("/menu", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });

            Alert("Menu muvaffaqiyatli yaratildi", "success");
            resetForm();
            setOpen(false);
            refresh && refresh();

        } catch (error) {
            console.error("Menu yaratishda xatolik:", error);

            let errorMessage = "Xatolik yuz berdi";
            if (error?.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error?.response?.status === 413) {
                errorMessage = "Fayl hajmi juda katta";
            } else if (error?.response?.status === 422) {
                errorMessage = "Ma'lumotlar noto'g'ri kiritilgan";
            } else if (error?.message) {
                errorMessage = error.message;
            }

            Alert(errorMessage, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            resetForm();
            setOpen(false);
        }
    };

    // Rangni tanlangan rang obyektini topish
    const getSelectedColor = () => {
        return colors.find(color => color.id === colorId);
    };

    // Rang tanlash komponenti
    const ColorOption = ({ color, isSelected }) => (
        <div className="flex items-center gap-3 p-2">
            <div className="flex items-center gap-2">
                {/* Rang namunasi */}
                <div
                    className="w-6 h-6 rounded-full border-2 flex-shrink-0"
                    style={{
                        backgroundColor: color.border_color || color.text_color,
                        borderColor: color.text_color
                    }}
                />
                <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: color.text_color }}
                />
            </div>
            <div className="flex-1">
                <Typography variant="small" className="font-medium">
                    {color.name}
                </Typography>
                <Typography variant="small" color="gray" className="text-xs">
                    Text: {color.text_color} | Border: {color.border_color}
                </Typography>
            </div>
            {isSelected && (
                <div className="text-blue-500">
                    ✓
                </div>
            )}
        </div>
    );

    return (
        <Dialog open={open} handler={handleClose} size="md">
            <DialogHeader>Yangi menu qo'shish</DialogHeader>
            <DialogBody className="space-y-4 max-h-[70vh] overflow-y-auto">
                <Input
                    label="Nomi *"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    disabled={isLoading}
                />

                {/* Rang tanlash */}
                <div className="space-y-2">
                    <Typography variant="small" color="blue-gray" className="font-medium">
                        Rang tanlash
                    </Typography>

                    {isLoadingColors ? (
                        <div className="flex items-center justify-center p-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                            <Typography variant="small" className="ml-2">Ranglar yuklanmoqda...</Typography>
                        </div>
                    ) : colors.length > 0 ? (
                        <Select
                            value={colorId}
                            onChange={(value) => setColorId(value || "")}
                            label="Rangni tanlang"
                            disabled={isLoading}
                        >
                            <Option value="">
                                <div className="flex items-center gap-2 p-1">
                                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-gray-100 flex-shrink-0"></div>
                                    <Typography variant="small">Rangsiz</Typography>
                                </div>
                            </Option>
                            {colors.map((color) => (
                                <Option key={color.id} value={color.id}>
                                    <ColorOption color={color} isSelected={colorId === color.id} />
                                </Option>
                            ))}
                        </Select>
                    ) : (
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <Typography variant="small" color="gray">
                                Ranglar topilmadi. Avval rang yarating.
                            </Typography>
                        </div>
                    )}

                    {/* Tanlangan rang ko'rsatish */}
                    {colorId && getSelectedColor() && (
                        <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                Tanlangan rang:
                            </Typography>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-8 h-8 rounded-full border-2"
                                        style={{
                                            backgroundColor: getSelectedColor().border_color,
                                            borderColor: getSelectedColor().text_color
                                        }}
                                    />
                                    <div
                                        className="w-6 h-6 rounded-full"
                                        style={{ backgroundColor: getSelectedColor().text_color }}
                                    />
                                </div>
                                <div>
                                    <Typography variant="small" className="font-medium">
                                        {getSelectedColor().name}
                                    </Typography>
                                    <Typography variant="small" color="gray" className="text-xs">
                                        {getSelectedColor().text_color} / {getSelectedColor().border_color}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <Input
                    label="Narxi *"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <Input
                    label="Chegirma (%)"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={discount}
                    onChange={e => setDiscount(e.target.value)}
                    disabled={isLoading}
                />
                <div className="flex items-center gap-4">
                    <Checkbox
                        label="Type (maxsus)"
                        checked={type}
                        onChange={e => setType(e.target.checked)}
                        disabled={isLoading}
                    />
                    <Checkbox
                        label="Yangi"
                        checked={isNew}
                        onChange={e => setIsNew(e.target.checked)}
                        disabled={isLoading}
                    />
                </div>
                <Input
                    label="Tartib raqami"
                    type="number"
                    min="0"
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    disabled={isLoading}
                />
                <Input
                    label="Pastki matn"
                    value={bottomText}
                    onChange={e => setBottomText(e.target.value)}
                    disabled={isLoading}
                />
                <Input
                    label="Yuqoridagi matn"
                    value={topText}
                    onChange={e => setTopText(e.target.value)}
                    disabled={isLoading}
                />
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rasmlar (maksimal 5MB, JPG/PNG/WEBP)
                    </label>
                    <input
                        type="file"
                        multiple
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageChange}
                        disabled={isLoading}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100
                            disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {images.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {images.map((img, idx) => (
                                img && img instanceof File ? (
                                    <div key={idx} className="relative group">
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt="preview"
                                            className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                                            disabled={isLoading}
                                            title="Rasmni o'chirish"
                                        >
                                            ×
                                        </button>
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg">
                                            {img.name.length > 15 ? `${img.name.substring(0, 12)}...` : img.name}
                                        </div>
                                    </div>
                                ) : null
                            ))}
                        </div>
                    )}
                </div>
            </DialogBody>
            <DialogFooter className="flex gap-2">
                <Button
                    variant="outlined"
                    color="blue"
                    onClick={handleClose}
                    disabled={isLoading}
                >
                    Bekor qilish
                </Button>
                <Button
                    color="blue"
                    onClick={handleSubmit}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    {isLoading ? "Yaratilmoqda..." : "Yaratish"}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}