import { useState } from 'react';
import Swal from 'sweetalert2';
import { $api } from '../../../../utils';
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button
} from "@material-tailwind/react";

export default function OwnerDelete({ isOpen, onClose, owner, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(isOpen);

    // Анимация для плавного закрытия
    useState(() => {
        if (isOpen) setShow(true);
        else {
            const timeout = setTimeout(() => setShow(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await $api.delete(`/admin/${owner.id}`);
            onSuccess && onSuccess();
            onClose && onClose();
            Swal.fire({
                icon: 'success',
                title: 'Muvaffaqiyat!',
                text: 'Ega muvaffaqiyatli o\'chirildi',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Xatolik!',
                text: err.response?.data?.message || 'O\'chirishda xatolik yuz berdi',
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
            size="xs"
            animate={{ mount: { scale: 1, opacity: 1 }, unmount: { scale: 0.95, opacity: 0 } }}
            className="z-50"
        >
            <DialogHeader>Egani o'chirish</DialogHeader>
            <DialogBody>
                <p className="mb-2 text-base">Haqiqatan ham <span className="font-semibold">{owner.full_name}</span> ni o'chirmoqchimisiz?</p>
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
                    color="red"
                    onClick={handleDelete}
                    disabled={loading}
                >
                    {loading ? "O'chirilmoqda..." : "O'chirish"}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}