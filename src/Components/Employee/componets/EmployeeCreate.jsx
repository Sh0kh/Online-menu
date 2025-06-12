import React, { useState } from "react";
import { Card, CardBody, Input, Button, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { $api } from "../../../utils";

export default function EmployeeCreate({refresh}) {
    const restaurant_id = localStorage.getItem("restaurant_id1");
    const [form, setForm] = useState({
        full_name: "",
        phone_number: "",
        username: "",
        password: "",
        role: "manager",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Telefon va parol validatsiyasi
    const validate = () => {
        const errs = {};
        // Faqat 9 ta raqam va boshida +998 avtomatik bo'ladi
        if (!/^\d{9}$/.test(form.phone_number)) {
            errs.phone_number = "Faqat 9 ta raqam kiriting (masalan: 901234567)";
        }
        if (!/^.{8,}$/.test(form.password)) {
            errs.password = "Parol kamida 8 ta belgidan iborat bo‘lishi kerak";
        }
        return errs;
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        // Telefon uchun faqat raqam va 9 ta belgidan oshmasin
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
        if (!restaurant_id) {
            Swal.fire("Xatolik", "Restaurant ID topilmadi!", "error");
            return;
        }
        setLoading(true);
        try {
            await $api.post("/employee", {
                ...form,
                phone_number: "+998" + form.phone_number,
                restaurant_id,
            });
            Swal.fire({
                icon: "success",
                title: "Xodim qo'shildi!",
                showConfirmButton: false,
                timer: 1500,
            });
            refresh()
            setForm({
                full_name: "",
                phone_number: "",
                username: "",
                password: "",
                role: "",
            });
        } catch (error) {
            Swal.fire("Xatolik", "Xodimni qo'shishda xatolik yuz berdi!", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg border border-blue-100">
            <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-6 text-center font-bold">
                    Yangi xodim qo'shish
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
                        label="Parol"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        error={!!errors.password}
                    />
                    {errors.password && (
                        <Typography variant="small" color="red">{errors.password}</Typography>
                    )}
                    {/* <Input
                        label="Lavozim (masalan: manager)"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        required
                        error={!!errors.role}
                    /> */}
                    <Button
                        type="submit"
                        color="blue"
                        loading={loading}
                        className="mt-4"
                        disabled={loading}
                    >
                        {loading ? "Yuklanmoqda..." : "Qo'shish"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}