import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { $api } from "../../../../utils";
import { Button, Spinner, Card, Typography, IconButton } from "@material-tailwind/react";
import { PencilIcon, TrashIcon, EyeIcon, PlusIcon } from "@heroicons/react/24/outline";
import MenuCreate from "./MenuCreate"; // <-- Modalni import qilamiz
// import MenuEdit from "./MenuEdit";
// import MenuDelete from "./MenuDelete";

export default function MenuCenter() {
    const { id } = useParams();
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editModal, setEditModal] = useState({ open: false, data: null });
    const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
    const [createModal, setCreateModal] = useState(false);
    const navigate = useNavigate();

    const getMenus = async () => {
        setLoading(true);
        setError(null);
        try {
            const restaurant_id = localStorage.getItem("restaurant_id1");
            const { data } = await $api.get(`/menu/${restaurant_id}?category_id=${id}`);
            setMenus(Array.isArray(data) ? data : (data.data || []));
        } catch (error) {
            console.error("Menu olishda xatolik:", error);
            setError("Menular yuklanmadi. Qayta urinib ko'ring.");
            setMenus([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getMenus();
        }
    }, [id]);

    const handleCreateMenu = () => setCreateModal(true);
    const handleEditMenu = (menu) => setEditModal({ open: true, data: menu });
    const handleDeleteMenu = (menuId) => setDeleteModal({ open: true, id: menuId });
    const handleViewMenu = (menuId) => navigate(`/admin/menu/${menuId}`);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="text-center">
                    <Spinner className="h-12 w-12 mb-4" />
                    <Typography variant="h6" color="blue-gray">
                        Menular yuklanmoqda...
                    </Typography>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Card className="p-6 text-center max-w-md">
                    <Typography variant="h6" color="red" className="mb-4">
                        {error}
                    </Typography>
                    <Button onClick={getMenus} color="blue">
                        Qayta yuklash
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <Typography variant="h3" className="font-bold text-gray-900">
                        Menular
                    </Typography>
                    <Typography variant="small" color="gray" className="mt-1">
                        Kategoriya ID: {id}
                    </Typography>
                </div>
                <Button
                    onClick={handleCreateMenu}
                    color="blue"
                    className="flex items-center justify-between mb-6"
                >
                    <PlusIcon className="h-5 w-5" />
                    Yangi menu
                </Button>
            </div>

            {/* Menu Items Grid */}
            {menus.length === 0 ? (
                <Card className="p-8 text-center max-w-2xl mx-auto">
                    <img 
                        src="/empty-state.svg" 
                        alt="No menus"
                        className="h-40 mx-auto mb-6"
                    />
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        Hech qanday menu topilmadi
                    </Typography>
                    <Typography color="gray" className="mb-6">
                        Ushbu kategoriyada hali menu qo'shilmagan
                    </Typography>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {menus.map(menu => (
                        <Card key={menu.id} className="overflow-hidden hover:shadow-xl transition-all">
                            {/* Menu Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={menu.image || '/food-placeholder.jpg'} 
                                    alt={menu.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        e.target.src = '/food-placeholder.jpg';
                                    }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                    <Typography variant="h5" color="white" className="font-bold">
                                        {menu.name}
                                    </Typography>
                                </div>
                            </div>
                            
                            {/* Menu Details */}
                            <div className="p-4">
                                <Typography variant="small" color="gray" className="mb-3 line-clamp-2">
                                    {menu.description || "Tavsif ko'rsatilmagan"}
                                </Typography>
                                
                                <div className="flex justify-between items-center mb-4">
                                    <Typography variant="h6" color="green">
                                        {menu.price ? `${menu.price.toLocaleString()} so'm` : 'Narx ko\'rsatilmagan'}
                                    </Typography>
                                    {menu.is_available && (
                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                            Mavjud
                                        </span>
                                    )}
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex justify-between gap-2">
                                    <IconButton
                                        color="blue"
                                        size="sm"
                                        onClick={() => handleEditMenu(menu)}
                                        title="Tahrirlash"
                                    >
                                        <PencilIcon className="h-4 w-4" />
                                    </IconButton>
                                    <IconButton
                                        color="blue"
                                        size="sm"
                                        onClick={() => handleDeleteMenu(menu.id)}
                                        title="O'chirish"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </IconButton>
                                    <IconButton
                                        color="blue"
                                        size="sm"
                                        onClick={() => handleViewMenu(menu.id)}
                                        title="Ko'rish"
                                    >
                                        <EyeIcon className="h-4 w-4" />
                                    </IconButton>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Modal: MenuCreate */}
            <MenuCreate 
                open={createModal} 
                setOpen={setCreateModal} 
                refresh={getMenus}
            />

            {/* Modal: MenuEdit va MenuDelete ni ham shu tarzda qo'shishingiz mumkin */}
            {/* 
            <MenuEdit 
                open={editModal.open} 
                setOpen={(v) => setEditModal({ open: v, data: v ? editModal.data : null })} 
                initialData={editModal.data} 
                refresh={getMenus} 
            />
            
            <MenuDelete 
                open={deleteModal.open} 
                setOpen={(v) => setDeleteModal({ open: v, id: v ? deleteModal.id : null })} 
                id={deleteModal.id} 
                refresh={getMenus} 
            />
            */}
        </div>
    );
}