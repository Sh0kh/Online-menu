import React, { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Typography,
} from "@material-tailwind/react";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function CategoryDelete({ open, setOpen, id, refresh }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        if (!id) return;
        setIsLoading(true);
        try {
            await $api.delete(`/category/${id}`);
            Alert("Kategoriya muvaffaqiyatli o'chirildi", "success");
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
            size="xs"
            className="p-0"
            style={{ zIndex: 9000 }}
        >
            <DialogHeader className="flex flex-col items-center justify-center pt-6 pb-2">
                <div className="bg-red-100 rounded-full p-3 mb-2">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20.5C6.753 20.5 2 15.747 2 10.5S6.753.5 12 .5s10 4.753 10 10-4.753 10-10 10z" />
                    </svg>
                </div>
                <span className="text-lg font-bold text-red-600">Kategoriyani o'chirish</span>
            </DialogHeader>
            <DialogBody className="text-center pb-0">
                <Typography color="gray" className="mb-2 text-base">
                    Ushbu kategoriyani o'chirmoqchimisiz?<br />Bu amal <span className="font-semibold text-red-600">qaytarilmaydi</span>.
                </Typography>
            </DialogBody>
            <DialogFooter className="flex flex-col gap-2 pt-0">
                <Button
                    onClick={handleDelete}
                    color="red"
                    className="bg-red-600 hover:bg-red-700 w-full"
                    disabled={isLoading}
                >
                    {isLoading ? "O'chirilmoqda..." : "Ha, o'chirish"}
                </Button>
                <Button
                    variant="text"
                    color="blue-gray"
                    onClick={() => setOpen(false)}
                    disabled={isLoading}
                    className="w-full"
                >
                    Bekor qilish
                </Button>
            </DialogFooter>
        </Dialog>
    );
}