import { useEffect, useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input } from "@material-tailwind/react";
import { $api } from "../../../../utils";

export default function ColorEdit({
  open,
  onClose,
  colorId,
  initialName,
  initialTextColor,
  initialBorderColor,
  onSuccess,
}) {
  const [name, setName] = useState(initialName || "");
  const [textColor, setTextColor] = useState(initialTextColor || "#000000");
  const [borderColor, setBorderColor] = useState(initialBorderColor || "#000000");
  const [loading, setLoading] = useState(false);

  // Eski ma'lumotlarni olish (agar prop orqali kelmasa yoki yangilanishi kerak bo'lsa)
  useEffect(() => {
    if (colorId) {
      $api.get(`/color/one/${colorId}`).then(res => {
        const data = res.data;
        setName(data.name || "");
        setTextColor(data.text_color || "#000000");
        setBorderColor(data.border_color || "#000000");
      });
    }
  }, [colorId, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Rang nomini kiriting!");
      return;
    }
    setLoading(true);
    try {
      await $api.put(`/color/${colorId}`, {
        name,
        text_color: textColor,
        border_color: borderColor,
      });
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
        <DialogHeader>Rangni tahrirlash</DialogHeader>
        <DialogBody className="flex flex-col gap-6">
          <Input
            label="Rang nomi"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Text color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={textColor}
                onChange={e => setTextColor(e.target.value)}
                className="w-12 h-12 p-0 border-2 border-gray-300 rounded-md shadow"
                style={{ borderRadius: "8px" }}
              />
              <span className="font-mono">{textColor}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Border color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={borderColor}
                onChange={e => setBorderColor(e.target.value)}
                className="w-12 h-12 p-0 border-2 border-gray-300 rounded-md shadow"
                style={{ borderRadius: "8px" }}
              />
              <span className="font-mono">{borderColor}</span>
            </div>
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