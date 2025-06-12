import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Typography, IconButton, Tooltip, Dialog } from "@material-tailwind/react";
import { PlusIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { $api } from "../../utils";
import EmployeeCreate from "./componets/EmployeeCreate";
import EmployeeEdit from "./componets/EmployeeEdit";
import EmployeeDelete from "./componets/EmployeeDelete"; // Qo'shildi

const restaurant_id = localStorage.getItem("restaurant_id1");

export default function Employee() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false); // Edit modal uchun
    const [editId, setEditId] = useState(null);      // Edit qilinayotgan xodim id
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteName, setDeleteName] = useState("");

    const fetchEmployees = async () => {
        if (!restaurant_id) {
            setError("Restaurant ID topilmadi");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await $api.get(`/employee/${restaurant_id}`);
            if (response.data) {
                setEmployees(response.data);
            } else {
                setEmployees([]);
            }
        } catch (error) {
            setError("Xodimlarni olishda xatolik yuz berdi");
        } finally {
            setLoading(false);
        }
    };

    const handleAddNew = () => {
        setOpenCreate(true);
    };

    // Edit modal ochish va yopish
    const handleOpenEdit = (id) => {
        setEditId(id);
        setOpenEdit(true);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
        setEditId(null);
    };

    // Delete modal ochish va yopish
    const handleOpenDelete = (id, fullName) => {
        setDeleteId(id);
        setDeleteName(fullName);
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
        setDeleteId(null);
        setDeleteName("");
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleRefresh = () => {
        fetchEmployees();
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Create Modal */}
            <Dialog open={openCreate} handler={setOpenCreate} size="sm" className="bg-transparent shadow-none">
                <EmployeeCreate refresh={fetchEmployees} />
            </Dialog>
            {/* Edit Modal */}
            <Dialog open={openEdit} handler={handleCloseEdit} size="sm" className="bg-transparent shadow-none">
                {editId && (
                    <EmployeeEdit
                        id={editId}
                        onClose={handleCloseEdit}
                        onSuccess={() => {
                            handleCloseEdit();
                            fetchEmployees();
                        }}
                    />
                )}
            </Dialog>
            {/* Delete Modal */}
            <Dialog open={openDelete} handler={handleCloseDelete} size="xs" className="bg-transparent shadow-none">
                <EmployeeDelete
                    open={openDelete}
                    onClose={handleCloseDelete}
                    id={deleteId}
                    fullName={deleteName}
                    onSuccess={fetchEmployees}
                />
            </Dialog>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <Typography variant="h3" color="blue-gray" className="font-bold tracking-tight">
                        Xodimlar
                    </Typography>
                    <Typography variant="small" color="gray" className="mt-1">
                        Restaurant xodimlari ro'yxatini boshqaring
                    </Typography>
                </div>
                <div className="flex gap-2">
                    <Tooltip content="Qayta yuklash">
                        <Button
                            variant="text"
                            color="blue"
                            onClick={handleRefresh}
                            disabled={loading}
                            className="p-2 rounded-full"
                        >
                            <ArrowPathIcon className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
                        </Button>
                    </Tooltip>
                    <Button
                        color="blue"
                        className="flex items-center gap-2 shadow-md"
                        onClick={handleAddNew}
                    >
                        <PlusIcon className="h-5 w-5" />
                        Yangi xodim
                    </Button>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg shadow">
                    <Typography color="red" className="font-semibold">
                        {error}
                    </Typography>
                    <Button
                        size="sm"
                        variant="outlined"
                        color="red"
                        className="mt-2"
                        onClick={handleRefresh}
                    >
                        Qayta urinish
                    </Button>
                </div>
            )}

            {loading && (
                <div className="flex justify-center items-center py-16">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <Typography className="mt-4" color="gray">
                            Yuklanmoqda...
                        </Typography>
                    </div>
                </div>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {employees.length === 0 ? (
                        <div className="col-span-full text-center py-16">
                            <Typography variant="h6" color="gray" className="mb-2">
                                Hech qanday xodim topilmadi
                            </Typography>
                            <Typography variant="small" color="gray" className="mb-4">
                                Birinchi xodimni qo'shish uchun "Yangi xodim" tugmasini bosing
                            </Typography>
                            <Button
                                color="blue"
                                className="flex items-center gap-2 mx-auto"
                                onClick={handleAddNew}
                            >
                                <PlusIcon className="h-5 w-5" />
                                Yangi xodim qo'shish
                            </Button>
                        </div>
                    ) : (
                        employees.map((emp) => (
                            <Card
                                key={emp.id}
                                className="shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-blue-50 hover:border-blue-200 bg-white/90"
                            >
                                <CardBody className="p-5">
                                    <div className="flex flex-col gap-3">
                                        {/* Employee info */}
                                        <div>
                                            <Typography variant="h5" color="blue-gray" className="font-semibold mb-1 truncate">
                                                {emp.full_name}
                                            </Typography>
                                            <Typography variant="small" color="blue" className="mb-1 font-medium">
                                                {emp.role || 'Lavozim ko\'rsatilmagan'}
                                            </Typography>
                                            {/* Restaurant name */}
                                            {emp.restaurants?.name && (
                                                <Typography variant="small" color="green" className="mb-1 flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 22v-9.15q-1.275-.35-2.137-1.4T4 9V2h2v7h1V2h2v7h1V2h2v7q0 1.4-.862 2.45T9 12.85V22zm10 0v-8h-3V7q0-2.075 1.463-3.537T19 2v20z" /></svg>
                                                    {emp.restaurants.name}
                                                </Typography>
                                            )}
                                            <div className="flex flex-col gap-1 mt-2">
                                                {emp.phone_number && (
                                                    <Typography className="" variant="small" color="blue-gray">
                                                        <span className="font-medium "><svg className="inline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z" /></svg></span> {emp.phone_number}
                                                    </Typography>
                                                )}
                                                {emp.username && (
                                                    <Typography variant="small" color="blue-gray">
                                                        <span className="font-medium"><svg className="inline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4" /></svg></span> {emp.username}
                                                    </Typography>
                                                )}
                                            </div>
                                        </div>
                                        {/* Action buttons */}
                                        <div className="flex justify-end gap-2 pt-3 border-t border-blue-50">
                                            <Tooltip content="Tahrirlash">
                                                <IconButton
                                                    variant="text"
                                                    color="blue"
                                                    className="hover:bg-blue-50"
                                                    onClick={() => handleOpenEdit(emp.id)}
                                                >
                                                    <PencilSquareIcon className="h-5 w-5" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip content="O'chirish">
                                                <IconButton
                                                    variant="text"
                                                    color="red"
                                                    className="hover:bg-red-50"
                                                    onClick={() => handleOpenDelete(emp.id, emp.full_name)}
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}