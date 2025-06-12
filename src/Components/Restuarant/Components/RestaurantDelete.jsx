import { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { $api } from '../../../utils';

export default function RestaurantDelete({ id, isOpen, onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            await $api.delete(`/restaurant/${id}`);
            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            setError("Restoran o'chirishda xatolik");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} handler={onClose} size="xs">
            <DialogHeader>Restoranni o'chirish</DialogHeader>
            <DialogBody>
                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                <div className="text-gray-700 text-base">Haqiqatan ham ushbu restoranni o'chirmoqchimisiz?</div>
            </DialogBody>
            <DialogFooter className="gap-2">
                <Button variant="text" color="gray" onClick={onClose} disabled={loading}>Bekor qilish</Button>
                <Button color="red" onClick={handleDelete} loading={loading} disabled={loading}>O'chirish</Button>
            </DialogFooter>
        </Dialog>
    );
}