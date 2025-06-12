import { useState, useEffect } from 'react';
import { $api } from '../../../utils';
import Swal from 'sweetalert2';
import OwnerCreate from './components/OwnerCrete';
import OwnerEdit from './components/OwnerEdit';
import OwnerDelete from './components/OwnerDelete';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function OwnerList() {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const ownersPerPage = 10;

    const fetchOwners = async () => {
        setLoading(true);
        try {
            const response = await $api.get('/admin');
            setOwners(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Xatolik!',
                text: err.response?.data?.message || 'Ma\'lumotlarni yuklashda xatolik',
                confirmButtonText: 'OK'
            });
        }
    };

    useEffect(() => {
        fetchOwners();
    }, []);

    const totalPages = Math.ceil(owners.length / ownersPerPage);
    const indexOfLastOwner = currentPage * ownersPerPage;
    const indexOfFirstOwner = indexOfLastOwner - ownersPerPage;
    const currentOwners = owners.slice(indexOfFirstOwner, indexOfLastOwner);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    // Modal handlers
    const openEditModal = (owner) => {
        setSelectedOwner(owner);
        setShowEditModal(true);
    };

    const openDeleteModal = (owner) => {
        setSelectedOwner(owner);
        setShowDeleteModal(false); // Reset modal state before opening
        setTimeout(() => setShowDeleteModal(true), 10); // Force re-mount for modal
    };

    const handleRefresh = () => fetchOwners();

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Ma'lumotlar yuklanmoqda...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Egalar ro'yxati</h1>
                        <p className="text-gray-600">Jami {owners.length} ta ega</p>
                    </div>
                    <button 
                        onClick={() => setShowCreateModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Yangi ega qo'shish
                    </button>
                </div>

                {owners.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Ma'lumot mavjud emas</h3>
                        <p className="text-gray-500 mb-6">Hozircha hech qanday ega ma'lumoti topilmadi</p>
                        <button 
                            onClick={fetchOwners}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Yangilash
                        </button>
                    </div>
                ) : (
                    // Desktop Table
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            To'liq ism
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Foydalanuvchi nomi
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Telefon raqami
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amallar
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentOwners.map((owner) => (
                                        <tr key={owner._id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                                            <span className="text-sm font-medium text-white">
                                                                {owner.full_name?.charAt(0).toUpperCase() || 'U'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {owner.full_name || 'Noma\'lum'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 font-medium">
                                                    @{owner.username || 'mavjud_emas'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {owner.phone_number || 'Kiritilmagan'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button 
                                                    onClick={() => openEditModal(owner)}
                                                    className="inline-flex items-center text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-150"
                                                    title="Tahrirlash"
                                                >
                                                    <PencilIcon className="w-5 h-5 mr-1" />
                                                </button>
                                                <button 
                                                    onClick={() => openDeleteModal(owner)}
                                                    className="inline-flex items-center text-red-600 hover:text-red-900 transition-colors duration-150"
                                                    title="O'chirish"
                                                >
                                                    <TrashIcon className="w-5 h-5 mr-1" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Sahifa <span className="font-medium">{currentPage}</span> dan <span className="font-medium">{totalPages}</span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    Oldingi
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`px-4 py-2 rounded-md ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                    >
                                        {number}
                                    </button>
                                ))}
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    Keyingi
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* CRUD Modals */}
                <OwnerCreate 
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onSuccess={handleRefresh}
                />

                {selectedOwner && (
                    <>
                        <OwnerEdit
                            isOpen={showEditModal}
                            onClose={() => setShowEditModal(false)}
                            owner={selectedOwner}
                            onSuccess={handleRefresh}
                        />

                        <OwnerDelete
                            isOpen={showDeleteModal}
                            onClose={() => setShowDeleteModal(false)}
                            owner={selectedOwner}
                            onSuccess={handleRefresh}
                        />
                    </>
                )}
            </div>
        </div>
    );
}