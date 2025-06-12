import { useEffect, useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Input, Button } from "@material-tailwind/react";
import { $api } from '../../../utils';

export default function RestaurantEdit({ id, isOpen, onClose, onSuccess }) {
    const [form, setForm] = useState({
        name: '',
        address: '',
        domen_name: '',
        image: null,
        owner_id: '',
    });
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!isOpen) return;
        setError(null);
        setPreview(null);
        setLoading(true);
        async function fetchData() {
            try {
                const res = await $api.get(`/restaurant/${id}`);
                setForm({
                    name: res.data.name || '',
                    address: res.data.address || '',
                    domen_name: res.data.domen_name || '',
                    image: null,
                    owner_id: res.data.owner?.id ? String(res.data.owner.id) : '',
                });
                setPreview(res.data.image || null);
                const ownersRes = await $api.get('/admin');
                setOwners(ownersRes.data || []);
            } catch (err) {
                setError("Restoran ma'lumotlarini olishda xatolik");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id, isOpen]);

    const handleChange = e => {
        const { name, value, files } = e.target;
        if (name === 'image' && files && files[0]) {
            setForm(f => ({ ...f, image: files[0] }));
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setForm(f => ({ ...f, [name]: value }));
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('address', form.address);
            formData.append('domen_name', form.domen_name);
            if (form.owner_id) formData.append('owner_id', form.owner_id);
            if (form.image) formData.append('logo_img', form.image);
            await $api.put(`/restaurant/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            setError("Restoran ma'lumotlarini yangilashda xatolik");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} handler={onClose} size="md" className="">
            <DialogHeader>Restoran ma'lumotlarini tahrirlash</DialogHeader>
            <form onSubmit={handleSubmit}>
                <DialogBody className="space-y-4">
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <Input label="Nomi" name="name" value={form.name} onChange={handleChange} required />
                    <Input label="Manzil" name="address" value={form.address} onChange={handleChange} required />
                    <Input label="Domen" name="domen_name" value={form.domen_name} onChange={handleChange} required />
                    <div>
                        <label className="block text-sm mb-1">Egasini tanlang</label>
                        <select name="owner_id" value={form.owner_id} onChange={handleChange} className="w-full border rounded p-2">
                            <option value="">Tanlang</option>
                            {owners.map(o => (
                                <option key={o.id} value={o.id}>{o.full_name || o.username}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Logo (rasm)</label>
                        <input type="file" name="image" accept="image/*" onChange={handleChange} />
                        {preview && <img src={preview} alt="preview" className="mt-2 w-32 h-20 object-cover rounded border" />}
                    </div>
                </DialogBody>
                <DialogFooter className="gap-2">
                    <Button variant="text" color="gray" onClick={onClose} disabled={loading}>Bekor qilish</Button>
                    <Button type="submit" color="blue" loading={loading} disabled={loading}>Saqlash</Button>
                </DialogFooter>
            </form>
        </Dialog>
    );
}