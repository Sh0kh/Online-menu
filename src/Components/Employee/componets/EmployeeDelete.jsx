import React, { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { $api } from "../../../utils";

export default function EmployeeDelete({ open, onClose, id, fullName, onSuccess }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await $api.delete(`/employee/${id}`);
            Swal.fire({
                icon: "success",
                title: "Xodim o'chirildi!",
                showConfirmButton: false,
                timer: 1500,
            });
            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            Swal.fire("Xatolik", "Xodimni o'chirishda xatolik yuz berdi!", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} handler={onClose} size="xs">
            <DialogHeader>
                <Typography variant="h5" color="red">
                    Xodimni o'chirish
                </Typography>
            </DialogHeader>
            <DialogBody>
                <Typography color="blue-gray" className="mb-2">
                    <b>{fullName}</b> ismli xodimni o‘chirmoqchimisiz?
                </Typography>
                <Typography variant="small" color="red">
                    Ushbu amalni qaytarib bo‘lmaydi!
                </Typography>
            </DialogBody>
            <DialogFooter className="gap-2">
                <Button variant="text" color="blue-gray" onClick={onClose} disabled={loading}>
                    Bekor qilish
                </Button>
                <Button color="red" onClick={handleDelete} loading={loading} disabled={loading}>
                    O'chirish
                </Button>
            </DialogFooter>
        </Dialog>
    );
}