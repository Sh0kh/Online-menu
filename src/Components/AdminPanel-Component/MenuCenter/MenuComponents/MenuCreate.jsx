import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input, Checkbox, Typography } from "@material-tailwind/react";
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
                <Input 
                    label="Color ID" 
                    value={colorId} 
                    onChange={e => setColorId(e.target.value)}
                    disabled={isLoading}
                />
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
                    />
                    {images.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {images.map((img, idx) => (
                                img && img instanceof File ? (
                                    <div key={idx} className="relative">
                                        <img 
                                            src={URL.createObjectURL(img)} 
                                            alt="preview" 
                                            className="w-16 h-16 object-cover rounded" 
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center"
                                            disabled={isLoading}
                                        >
                                            ×
                                        </button>
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