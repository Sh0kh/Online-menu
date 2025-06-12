import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { $api } from '../../../../utils';
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
    Button
} from "@material-tailwind/react";

export default function OwnerEdit({ isOpen, onClose, owner, onSuccess }) {
    const roles = [
        { value: 'owner', label: 'Owner' },
        { value: 'admin', label: 'Admin' },
        { value: 'super_admin', label: 'Super Admin' }
    ];

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
        if (isOpen) setShow(true);
        else {
            const timeout = setTimeout(() => setShow(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    useEffect(() => {
        if (owner) {
            setFormData({
                full_name: owner.full_name || '',
                username: owner.username || '',
                phone_number: owner.phone_number || '',
                password: '',
                role: owner.role || 'owner'
            });
            setErrors({});
        }
    }, [owner]);

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('998')) {
            value = '+' + value;
        } else if (value.length > 0 && !value.startsWith('+998')) {
            value = '+998' + value;
        }
        if (value.length > 13) {
            value = value.substring(0, 13);
        }
        setFormData({ ...formData, phone_number: value });
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
        if (formData.password && formData.password.length > 0 && formData.password.length < 6) {
            newErrors.password = "Parol kamida 6 ta belgidan iborat bo'lishi kerak";
        }
        if (!roles.map(r => r.value).includes(formData.role)) {
            newErrors.role = "Rol noto'g'ri tanlangan";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            const submitData = { ...formData };
            if (!submitData.password) {
                delete submitData.password;
            }
            await $api.put(`/admin/${owner.id}`, submitData);
            onSuccess && onSuccess();
            onClose && onClose();
            Swal.fire({
                icon: 'success',
                title: 'Muvaffaqiyat!',
                text: 'Ega maʼlumotlari yangilandi',
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
            Swal.fire({
                icon: 'error',
                title: 'Xatolik!',
                text: err.response?.data?.message || 'Yangilashda xatolik yuz berdi',
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
            animate={{ mount: { scale: 1, opacity: 1 }, unmount: { scale: 0.95, opacity: 0 } }}
            className="z-50"
        >
            <DialogHeader>Ega ma'lumotlarini tahrirlash</DialogHeader>
            <form onSubmit={handleSubmit}>
                <DialogBody className="space-y-4">
                    <Input
                        label="To‘liq ism"
                        name="full_name"
                        value={formData.full_name}
                        onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                        error={!!errors.full_name}
                        required
                    />
                    {errors.full_name && <p className="text-sm text-red-600">{errors.full_name}</p>}
                    <Input
                        label="Telefon raqami"
                        name="phone_number"
                        type="tel"
                        value={formData.phone_number}
                        onChange={handlePhoneChange}
                        error={!!errors.phone_number}
                        required
                        placeholder="+998901234567"
                    />
                    {errors.phone_number && <p className="text-sm text-red-600">{errors.phone_number}</p>}
                    <Input
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={e => setFormData({ ...formData, username: e.target.value })}
                        error={!!errors.username}
                        required
                    />
                    {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
                    <Input
                        label="Parol (agar yangilamoqchi bo'lsangiz)"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                        error={!!errors.password}
                        placeholder="Yangi parol"
                    />
                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                    <Select
                        label="Rol"
                        name="role"
                        value={formData.role}
                        onChange={val => setFormData({ ...formData, role: val })}
                        error={!!errors.role}
                        required
                    >
                        {roles.map(role => (
                            <Option key={role.value} value={role.value}>{role.label}</Option>
                        ))}
                    </Select>
                    {errors.role && <p className="text-sm text-red-600">{errors.role}</p>}
                </DialogBody>
                <DialogFooter className="space-x-3">
                    <Button
                        type="button"
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
                        {loading ? 'Yangilanmoqda...' : 'Yangilash'}
                    </Button>
                </DialogFooter>
            </form>
        </Dialog>
    );
}
