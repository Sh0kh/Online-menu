import { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input } from "@material-tailwind/react";
import { $api } from "../../../utils";

export default function BackroundCrete({ open, onClose, onSuccess }) {
  const [color, setColor] = useState("#F5F5DC");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const restaurant_id = localStorage.getItem("restaurant_id1");

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
    if (!color || !image) {
      alert("Barcha maydonlarni to'ldiring!");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("restaurant_id", restaurant_id);
      formData.append("color", color);
      formData.append("image", image);

      await $api.post("/background", formData);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      alert("Yaratishda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} handler={onClose} size="sm">
      <form onSubmit={handleSubmit}>
        <DialogHeader>Backround yaratish</DialogHeader>
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
              required
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
            {loading ? "Yaratilmoqda..." : "Yaratish"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}