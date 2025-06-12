import { useEffect, useState } from 'react';
import RestaurantCreate from '../Restuarant/Components/RestuarantCreate';
import ReactLoading from 'react-loading';
import { NavLink } from 'react-router-dom';
import { $api } from '../../utils';
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import RestaurantEdit from "../Restuarant/Components/RestaurantEdit";
import RestaurantDelete from "../Restuarant/Components/RestaurantDelete";
import CONFIG from '../../utils/Config';

export default function Restaurant() {
    const [restaurantData, setRestaurantData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsPerPage] = useState(10);
    const [paginationLoading, setPaginationLoading] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const getRestaurants = async (page = 1) => {
        if (page === 1) {
            setLoading(true);
        } else {
            setPaginationLoading(true);
        }

        try {
            const response = await $api.get(`/restaurant?page=${page}&limit=${itemsPerPage}`);

            if (response.data) {
                setRestaurantData(response.data || []);
                setTotalPages(response.data.totalPages || Math.ceil(response.data.total / itemsPerPage));
                setTotalItems(response.data.total || response.data.count || 0);
                setCurrentPage(page);
            }
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            setRestaurantData([]);
        } finally {
            setLoading(false);
            setPaginationLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить этот ресторан?')) {
            return;
        }

        setDeleteLoading(id);
        try {
            await $api.delete(`/restaurant/${id}`);

            setRestaurantData(prev => prev.filter(item => item.id !== id));
            setTotalItems(prev => prev - 1);

            if (restaurantData.length === 1 && currentPage > 1) {
                getRestaurants(currentPage - 1);
            }
        } catch (error) {
            console.error('Error deleting restaurant:', error);
            alert('Ошибка при удалении ресторана');
        } finally {
            setDeleteLoading(null);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            getRestaurants(page);
        }
    };

    const refreshRestaurants = () => {
        getRestaurants(currentPage);
    };

    useEffect(() => {
        getRestaurants(1);
    }, []);

    if (loading || paginationLoading) {
        return (
            <div className="flex items-center justify-center h-[600px]">
                <ReactLoading type="spinningBubbles" color="#1976d2" height={80} width={80} />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Рестораны</h1>
                    <p className="text-gray-600 mt-1">Всего: {totalItems} ресторанов</p>
                </div>
                <RestaurantCreate refresh={refreshRestaurants} />
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {restaurantData.map((restaurant) => (
                    <div key={restaurant.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100">
                        <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                            <img
                                src={CONFIG.API_URL + restaurant.logo_img || 'https://via.placeholder.com/300x200?text=Restaurant'}
                                alt={restaurant.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x200?text=Restaurant';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <NavLink
                                    to={`/restaurant/${restaurant.id}`}
                                    className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                                    title="Ko'rish"
                                >
                                    <EyeIcon className="w-5 h-5" />
                                </NavLink>
                                <button
                                    onClick={() => { setSelectedRestaurant(restaurant); setShowEditModal(true); }}
                                    className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                                    title="Tahrirlash"
                                >
                                    <PencilIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => { setSelectedRestaurant(restaurant); setShowDeleteModal(true); }}
                                    disabled={deleteLoading === restaurant.id}
                                    className="w-10 h-10 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                                    title="O'chirish"
                                >
                                    {deleteLoading === restaurant.id ? (
                                        <ReactLoading type="spin" color="#ffffff" height={18} width={18} />
                                    ) : (
                                        <TrashIcon className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                                {restaurant.name}
                            </h3>

                            {restaurant.domen_name && (
                                <>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        {restaurant.domen_name}
                                    </p>
                                    <p className="text-gray-600 text-sm mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {restaurant.owner?.full_name || restaurant.owner?.username || 'Owner not found'}
                                    </p>
                                </>


                            )}

                            {restaurant.address && (
                                <p className="text-gray-500 text-xs mb-3 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {restaurant.address}
                                </p>
                            )}

                            <div className="flex items-center justify-between text-sm text-gray-500">

                                <div className="text-xs">
                                    {restaurant.createdAt && new Date(restaurant.createdAt).toLocaleDateString('ru-RU')}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || paginationLoading}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Назад
                    </button>

                    <div className="flex gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                            let pageNumber;
                            if (totalPages <= 5) {
                                pageNumber = index + 1;
                            } else if (currentPage <= 3) {
                                pageNumber = index + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNumber = totalPages - 4 + index;
                            } else {
                                pageNumber = currentPage - 2 + index;
                            }

                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                    disabled={paginationLoading}
                                    className={`px-3 py-2 rounded-lg transition-colors ${currentPage === pageNumber
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || paginationLoading}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Вперед
                    </button>
                </div>
            )}

            {restaurantData.length === 0 && !loading && (
                <div className="text-center py-12">
                    <div className="text-gray-500 text-lg mb-2">Нет доступных ресторанов</div>
                    <p className="text-gray-400">Добавьте новый ресторан, чтобы начать</p>
                </div>
            )}

            {/* RestaurantEdit Modal */}
            {showEditModal && selectedRestaurant && (
                <RestaurantEdit
                    id={selectedRestaurant.id}
                    isOpen={showEditModal}
                    onClose={() => { setShowEditModal(false); setSelectedRestaurant(null); }}
                    onSuccess={refreshRestaurants}
                />
            )}

            {/* RestaurantDelete Modal */}
            {showDeleteModal && selectedRestaurant && (
                <RestaurantDelete
                    id={selectedRestaurant.id}
                    isOpen={showDeleteModal}
                    onClose={() => { setShowDeleteModal(false); setSelectedRestaurant(null); }}
                    onSuccess={refreshRestaurants}
                />
            )}
        </div>
    );
}