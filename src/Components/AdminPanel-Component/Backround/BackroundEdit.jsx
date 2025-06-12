 import { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input } from "@material-tailwind/react";
import { $api } from "../../../utils";

export default function BackroundEdit({ open, onClose, background, onSuccess }) {
  const [color, setColor] = useState(background?.color || "#F5F5DC");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(background?.image || null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("color", color);
      if (image) formData.append("image", image);

      await $api.patch(`/api/background/${background.id}`, formData);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      alert("Tahrirlashda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} handler={onClose} size="sm">
      <form onSubmit={handleSubmit}>
        <DialogHeader>Backround tahrirlash</DialogHeader>
        <DialogBody className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Rang</label>
            <input
              type="color"
              value={color}
              onChange={e => setColor(e.target.value)}
              className="w-12 h-12 border-2 border-gray-300 rounded-md shadow"
              style={{ borderRadius: "8px" }}
            />
            <span className="ml-4 font-mono">{color}</span>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Rasm</label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 rounded-lg border w-full max-h-40 object-contain"
              />
            )}
          </div>
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
            type="submit"
            color="blue"
            disabled={loading}
          >
            {loading ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}