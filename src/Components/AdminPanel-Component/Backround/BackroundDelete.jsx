import { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { $api } from "../../../utils";
import Swal from "sweetalert2";

export default function BackroundDelete({ open, onClose, backgroundId, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await $api.delete(`/background/${backgroundId}`);
      Swal.fire({
        icon: "success",
        title: "O'chirildi!",
        text: "Backround muvaffaqiyatli o'chirildi.",
        timer: 1500,
        showConfirmButton: false,
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Xatolik!",
        text: "O'chirishda xatolik yuz berdi!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} handler={onClose} size="sm">
      <DialogHeader>Backroundni o‘chirish</DialogHeader>
      <DialogBody>
        <p className="text-gray-700 mb-2">
          Ushbu backroundni o‘chirishga ishonchingiz komilmi?
        </p>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="gray"
          onClick={onClose}
          disabled={loading}
          className="mr-2"
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