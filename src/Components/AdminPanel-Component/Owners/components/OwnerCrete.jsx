import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { $api } from '../../../../utils';
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Select,
    Option
} from "@material-tailwind/react";

export default function OwnerCreate({ isOpen, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        full_name: '',
        username: '',
        phone_number: '',
        password: '',
        role: 'owner'
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setShow(true);
            setFormData({
                full_name: '',
                username: '',
                phone_number: '',
                password: '',
                role: 'owner'
            });
            setErrors({});
        } else {
            const timeout = setTimeout(() => setShow(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // faqat raqamlar
        if (value.length > 9) value = value.slice(0, 9);
        setFormData({ ...formData, phone_number: '+998' + value });
    };

    const validateForm = () => {
        const newErrors = {};
        const phoneRegex = /^\+998[0-9]{9}$/;
        if (!phoneRegex.test(formData.phone_number)) {
            newErrors.phone_number = "Iltimos, +998 bilan boshlanuvchi 9 xonali raqam kiriting (masalan, +998901234567)";
        }

        if (formData.full_name.trim().length < 3) {
            newErrors.full_name = "Ism familiya kamida 3 ta belgidan iborat bo'lishi kerak";
        }

        if (formData.username.trim().length < 3) {
            newErrors.username = "Username kamida 3 ta belgidan iborat bo'lishi kerak";
        }

        if (formData.password.length < 6) {
            newErrors.password = "Parol kamida 6 ta belgidan iborat bo'lishi kerak";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            const response = await $api.post('/admin', formData);
            if (response.data.success || response.status === 201) {
                setFormData({
                    full_name: '',
                    username: '',
                    phone_number: '',
                    password: '',
                    role: 'owner'
                });
                setErrors({});
                onSuccess && onSuccess();
                onClose && onClose();
                Swal.fire({
                    icon: 'success',
                    title: 'Muvaffaqiyatli!',
                    text: 'Yangi foydalanuvchi yaratildi',
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Xatolik!',
                    text: response.data.message || 'Foydalanuvchi yaratishda xatolik',
                    confirmButtonText: 'OK'
                });
            }
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else if (err.response?.data?.message) {
                setErrors({ general: err.response.data.message });
            }
            Swal.fire({
                icon: 'error',
                title: 'Xatolik!',
                text: err.response?.data?.message || 'Serverda xatolik yuz berdi',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    return (
        <Dialog
            open={isOpen}
            handler={onClose}
            size="sm"
            className="z-50"
            animate={{
                mount: { scale: 1, opacity: 1 },
                unmount: { scale: 0.95, opacity: 0 }
            }}
        >
            <DialogHeader>Yangi ega qo'shish</DialogHeader>
            <form onSubmit={handleSubmit}>
                <DialogBody className="space-y-4">
                    {/* To'liq ismi */}
                    <div>
                        <Input
                            label="To‘liq ismi"
                            name="full_name"
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            error={!!errors.full_name}
                            required
                        />
                        {errors.full_name && <p className="text-sm text-red-600 mt-1">{errors.full_name}</p>}
                    </div>
                    {/* Telefon raqami */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefon raqami</label>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-lg select-none">+998</span>
                            <input
                                type="tel"
                                name="phone_number"
                                value={formData.phone_number.replace('+998', '')}
                                onChange={handlePhoneChange}
                                maxLength={9}
                                className={`w-full px-3 py-2 border ${errors.phone_number ? 'border-red-500' : 'border-gray-300'} rounded-r-lg focus:outline-none`}
                                placeholder="901234567"
                                required
                            />
                        </div>
                        {errors.phone_number && <p className="text-sm text-red-600 mt-1">{errors.phone_number}</p>}
                        <p className="text-xs text-gray-500">Format: 901234567 (faqat raqamlar, +998 avtomatik qo'shiladi)</p>
                    </div>
                    {/* Username */}
                    <div>
                        <Input
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            error={!!errors.username}
                            required
                        />
                        {errors.username && <p className="text-sm text-red-600 mt-1">{errors.username}</p>}
                    </div>
                    {/* Parol */}
                    <div>
                        <Input
                            label="Parol"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            error={!!errors.password}
                            required
                        />
                        {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
                    </div>
                    {/* Rol */}
                    <div>
                        <Select
                            label="Rol"
                            name="role"
                            value={formData.role}
                            onChange={val => setFormData({ ...formData, role: val })}
                            required
                        >
                            <Option value="owner">Ega</Option>
                            <Option value="admin">Admin</Option>
                            <Option value="super_admin">Super Admin</Option>
                        </Select>
                        {errors.role && <p className="text-sm text-red-600 mt-1">{errors.role}</p>}
                    </div>
                    {errors.general && <p className="text-sm text-red-600 mt-1">{errors.general}</p>}
                </DialogBody>
                <DialogFooter className="space-x-3">
                    <Button
                        variant="text"
                        color="gray"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Bekor qilish
                    </Button>
                    <Button
                        type="submit"
                        color="blue"
                        disabled={loading}
                    >
                        {loading ? 'Saqlanmoqda...' : 'Saqlash'}
                    </Button>
                </DialogFooter>
            </form>
        </Dialog>
    );
}
