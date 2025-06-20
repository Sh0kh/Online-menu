import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import Swal from 'sweetalert2';
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Button,
    Select,
    Option
} from "@material-tailwind/react";
import { $api } from '../../../utils';

export default function RestaurantCreate({ refresh }) {
    const [createModal, setCreateModal] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [owners, setOwners] = useState([]);
    const [formData, setFormData] = useState({
        owner_id: '',
        name: '',
        logo_img: null,
        logo_img_binary: null,
        logo_img_name: '',
        logo_img_type: '',
        address: '',
        domen_name: '',
        monthlyFee: ''
    });
    const [previewImage, setPreviewImage] = useState(null);

    // Ownerlarni olish
    useEffect(() => {
        if (createModal) {
            $api.get("/admin")
                .then(res => setOwners(res.data || []))
                .catch(() => setOwners([]));
        }
    }, [createModal]);

    // Convert file to binary (ArrayBuffer)
    const fileToArrayBuffer = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    };

    // Convert file to base64 for preview and storage
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleInputChange = async (e) => {
        const { name, value, files } = e.target;

        if (name === 'logo_img' && files && files[0]) {
            const file = files[0];
            if (!file.type.startsWith('image/')) {
                Swal.fire({
                    title: 'Iltimos, faqat rasm fayl tanlang!',
                    icon: 'warning',
                    position: "top-end",
                    timer: 3000,
                    timerProgressBar: true,
                    showCloseButton: true,
                    toast: true,
                    showConfirmButton: false,
                });
                return;
            }
            try {
                const binaryData = await fileToArrayBuffer(file);
                const base64Preview = await fileToBase64(file);
                setFormData(prev => ({
                    ...prev,
                    logo_img: file,
                    logo_img_binary: binaryData,
                    logo_img_name: file.name,
                    logo_img_type: file.type
                }));
                setPreviewImage(base64Preview);
            } catch (error) {
                Swal.fire({
                    title: 'Xatolik yuz berdi!',
                    text: 'Fayl yuklanishida xatolik',
                    icon: 'error',
                    position: "top-end",
                    timer: 3000,
                    timerProgressBar: true,
                    showCloseButton: true,
                    toast: true,
                    showConfirmButton: false,
                });
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleOwnerChange = (val) => {
        setFormData(prev => ({ ...prev, owner_id: val }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.address || !formData.domen_name) {
            Swal.fire({
                title: `Iltimos, majburiy maydonlarni to'ldiring!`,
                icon: 'warning',
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
            return;
        }

        setCreateLoading(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('address', formData.address);
            formDataToSend.append('domen_name', formData.domen_name);
            formDataToSend.append('monthlyFee', formData.monthlyFee);
            if (formData.owner_id) {
                formDataToSend.append('owner_id', formData.owner_id);
            }
            if (formData.logo_img_binary && formData.logo_img_name) {
                const imageBlob = new Blob([formData.logo_img_binary], {
                    type: formData.logo_img_type
                });
                formDataToSend.append('logo_img', imageBlob, formData.logo_img_name);
            }
            await $api.post('/restaurant', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            Swal.fire({
                title: 'Restoran muvaffaqiyatli yaratildi!',
                icon: 'success',
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
            closeModal();
            if (refresh) refresh();
        } catch (error) {
            Swal.fire({
                title: 'Xatolik yuz berdi!',
                text: error.response?.data?.message || 'Noma\'lum xatolik',
                icon: 'error',
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
        } finally {
            setCreateLoading(false);
        }
    };

    const closeModal = () => {
        setCreateModal(false);
        setFormData({
            owner_id: '',
            name: '',
            logo_img: null,
            logo_img_binary: null,
            logo_img_name: '',
            logo_img_type: '',
            address: '',
            domen_name: '',
            monthlyFee: ''
        });
        setPreviewImage(null);
    };

    return (
        <>
            <Button
                onClick={() => setCreateModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Restoran qo'shish
            </Button>
            <Dialog
                open={createModal}
                handler={closeModal}
                size="md"
                animate={{ mount: { scale: 1, opacity: 1 }, unmount: { scale: 0.95, opacity: 0 } }}
                className="z-50"
            >
                <DialogHeader>Yangi restoran yaratish</DialogHeader>
                <form onSubmit={handleCreate}>
                    <DialogBody className="space-y-5">
                        <Select
                            label="Ega (owner) tanlang"
                            value={formData.owner_id}
                            onChange={handleOwnerChange}
                            required
                        >
                            {owners.map(owner => (
                                <Option key={owner.id} value={owner.id}>
                                    {owner.name || owner.full_name || owner.username || owner.email || owner.id}
                                </Option>
                            ))}
                        </Select>
                        <Input
                            label="Restoran nomi *"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Masalan: Darxon"
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Restoran logotipi
                                {formData.logo_img_binary && (
                                    <span className="text-green-600 text-xs ml-2">
                                        (Binary: {(formData.logo_img_binary.byteLength / 1024).toFixed(1)} KB)
                                    </span>
                                )}
                            </label>
                            <input
                                type="file"
                                name="logo_img"
                                onChange={handleInputChange}
                                accept="image/*"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            {previewImage && (
                                <div className="flex justify-center mt-2">
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-24 h-24 object-cover rounded-lg border"
                                    />
                                </div>
                            )}
                        </div>
                        <Input
                            label="Manzil *"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            placeholder="Masalan: Uzbekistan, Toshkent"
                        />
                        <Input
                            label="Domen nomi *"
                            name="domen_name"
                            value={formData.domen_name}
                            onChange={handleInputChange}
                            required
                            placeholder="Masalan: darxon.qrmenu.uz"
                        />
                        <Input
                            label="Oylik to'lov *"
                            name="monthlyFee"
                            value={formData.monthlyFee}
                            onChange={handleInputChange}
                            required
                            placeholder="Masalan: 100000"
                        />
                    </DialogBody>
                    <DialogFooter className="gap-3">
                        <Button
                            type="button"
                            variant="text"
                            color="gray"
                            onClick={closeModal}
                            disabled={createLoading}
                        >
                            Bekor qilish
                        </Button>
                        <Button
                            type="submit"
                            color="blue"
                            disabled={createLoading}
                            className="flex items-center gap-2"
                        >
                            {createLoading ? (
                                <>
                                    <ReactLoading type="spin" color="#fff" height={20} width={20} />
                                    <span>Yaratilmoqda...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Yaratish
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}