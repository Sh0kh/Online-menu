import React, { useEffect, useState } from "react";
import { Card, CardBody, Input, Button, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { $api } from "../../../utils";

export default function EmployeeEdit({ id, onClose, onSuccess }) {
    const [form, setForm] = useState({
        full_name: "",
        phone_number: "",
        username: "",
        password: "",
        role: "",
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [errors, setErrors] = useState({});

    // Eski ma'lumotlarni olish
    useEffect(() => {
        const fetchEmployee = async () => {
            setFetching(true);
            try {
                const res = await $api.get(`/employee/${id}`);
                // Telefon raqamdan +998 ni olib tashlash
                let phone = res.data.phone_number || "";
                if (phone.startsWith("+998")) phone = phone.slice(4);
                setForm({
                    full_name: res.data.full_name || "",
                    phone_number: phone,
                    username: res.data.username || "",
                    password: "",
                    role: res.data.role || "",
                });
            } catch (error) {
                Swal.fire("Xatolik", "Xodim ma'lumotlarini olishda xatolik!", "error");
                if (onClose) onClose();
            } finally {
                setFetching(false);
            }
        };
        if (id) fetchEmployee();
    }, [id, onClose]);

    // Validatsiya
    const validate = () => {
        const errs = {};
        if (!/^\d{9}$/.test(form.phone_number)) {
            errs.phone_number = "Faqat 9 ta raqam kiriting (masalan: 901234567)";
        }
        if (form.password && !/^.{8,}$/.test(form.password)) {
            errs.password = "Parol kamida 8 ta belgidan iborat bo‘lishi kerak";
        }
        return errs;
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === "phone_number") {
            value = value.replace(/\D/g, "").slice(0, 9);
        }
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: undefined });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            Swal.fire("Xatolik", "Ma'lumotlarni to'g'ri kiriting!", "error");
            return;
        }
        setLoading(true);
        try {
            await $api.put(`/employee/${id}`, {
                ...form,
                phone_number: "+998" + form.phone_number,
                ...(form.password ? { password: form.password } : {}),
            });
            Swal.fire({
                icon: "success",
                title: "Xodim yangilandi!",
                showConfirmButton: false,
                timer: 1500,
            });
            if (onSuccess) onSuccess();
            if (onClose) onClose();
        } catch (error) {
            Swal.fire("Xatolik", "Xodimni yangilashda xatolik yuz berdi!", "error");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex justify-center items-center py-10">
                <Typography color="blue" className="animate-pulse">Yuklanmoqda...</Typography>
            </div>
        );
    }

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg border border-blue-100">
            <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-6 text-center font-bold">
                    Xodimni tahrirlash
                </Typography>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        label="F.I.Sh."
                        name="full_name"
                        value={form.full_name}
                        onChange={handleChange}
                        required
                        autoFocus
                        error={!!errors.full_name}
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-2 bg-blue-50 border border-blue-100 rounded text-blue-700 select-none">+998</span>
                            <Input
                                label="Telefon raqam (901234567)"
                                name="phone_number"
                                value={form.phone_number}
                                onChange={handleChange}
                                required
                                error={!!errors.phone_number}
                                maxLength={9}
                                className="flex-1"
                                containerProps={{ className: "flex-1" }}
                            />
                        </div>
                        {errors.phone_number && (
                            <Typography variant="small" color="red">{errors.phone_number}</Typography>
                        )}
                    </div>
                    <Input
                        label="Username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        error={!!errors.username}
                    />
                    <Input
                        label="Yangi parol (ixtiyoriy)"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Agar o'zgartirmoqchi bo'lsangiz"
                        error={!!errors.password}
                    />
                    {errors.password && (
                        <Typography variant="small" color="red">{errors.password}</Typography>
                    )}
                    <Input
                        label="Lavozim (masalan: manager)"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        required
                        error={!!errors.role}
                    />
                    <div className="flex gap-2 mt-4">
                        <Button
                            type="submit"
                            color="blue"
                            loading={loading}
                            disabled={loading}
                            className="flex-1"
                        >
                            {loading ? "Yuklanmoqda..." : "Saqlash"}
                        </Button>
                        <Button
                            type="button"
                            color="red"
                            variant="outlined"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Bekor qilish
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}