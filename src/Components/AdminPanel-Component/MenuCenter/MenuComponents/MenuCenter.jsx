import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { $api } from "../../../../utils";
import {
    Button, Spinner, Card, Typography, IconButton
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon, EyeIcon, PlusIcon } from "@heroicons/react/24/outline";
import MenuCreate from "./MenuCreate";
import MenuEdit from "./MenuEdit";
import MenuDelete from "./MenuDelete";

export default function MenuCenter() {
    const { id: categoryId } = useParams();
    const navigate = useNavigate();
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [modals, setModals] = useState({
        create: false,
        edit: null,
        delete: null
    });

    const getMenus = async () => {
        try {
            setLoading(true);
            setError(null);
            const restaurant_id = localStorage.getItem("restaurant_id1");
            const response = await $api.get(`/menu/${restaurant_id}?category_id=${categoryId}`);
            const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
            setMenus(data);
        } catch (err) {
            console.error("Xatolik:", err);
            setError("Menularni yuklashda xatolik yuz berdi.");
            setMenus([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (categoryId) {
            getMenus();
        }
    }, [categoryId]);

    const closeAllModals = () => {
        setModals({ create: false, edit: null, delete: null });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Spinner className="h-12 w-12" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Card className="p-6 text-center max-w-md">
                    <Typography variant="h6" color="red">{error}</Typography>
                    <Button onClick={getMenus} className="mt-4">Qayta urinish</Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Typography variant="h3">Menular</Typography>
                </div>
                <Button
                    color="blue"
                    onClick={() => setModals({ ...modals, create: true })}
                    className="flex items-center gap-2"
                >
                    <PlusIcon className="h-5 w-5" />
                    Yangi menu
                </Button>
            </div>

            {/* Menu Cards */}
            {menus.length === 0 ? (
                <Card className="p-8 text-center">
                    <img src="/empty-state.svg" alt="Bo'sh" className="h-40 mx-auto mb-4" />
                    <Typography variant="h5">Hech qanday menu topilmadi</Typography>
                    <Typography color="gray">Kategoriya bo'sh, menu qo'shing</Typography>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {menus.map(menu => (
                        <Card key={menu.id} className="hover:shadow-md transition-all">
                            <div className="relative h-48">
                                <img
                                    src={'/food-placeholder.jpg'}
                                    alt={menu.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2">
                                    <Typography variant="h5" color="white">{menu.name}</Typography>
                                </div>
                            </div>
                            <div className="p-4">
                                <Typography variant="small" className="line-clamp-2 mb-2">
                                    {menu.description || "Tavsif mavjud emas"}
                                </Typography>
                                <div className="flex justify-between items-center mb-2">
                                    <Typography variant="h6" color="green">
                                        {menu.price ? `${menu.price.toLocaleString()} so'm` : "Narx yo'q"}
                                    </Typography>
                                    {menu.is_available && (
                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                            Mavjud
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <IconButton onClick={() => setModals({ ...modals, edit: menu })}>
                                        <PencilIcon className="h-4 w-4" />
                                    </IconButton>
                                    <IconButton onClick={() => setModals({ ...modals, delete: menu.id })}>
                                        <TrashIcon className="h-4 w-4" />
                                    </IconButton>
                                    {/* <IconButton onClick={() => navigate(`/admin/menu/${menu.id}`)}>
                                        <EyeIcon className="h-4 w-4" />
                                    </IconButton> */}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Modals */}
            <MenuCreate
                open={modals.create}
                setOpen={(val) => setModals({ ...modals, create: val })}
                refresh={getMenus}
            />
            <MenuEdit
                open={!!modals.edit}
                setOpen={(val) => setModals({ ...modals, edit: val ? modals.edit : null })}
                initialData={modals.edit}
                refresh={getMenus}
            />
            <MenuDelete
                open={!!modals.delete}
                setOpen={(val) => setModals({ ...modals, delete: val ? modals.delete : null })}
                id={modals.delete}
                refresh={getMenus}
            />
        </div>
    );
}
