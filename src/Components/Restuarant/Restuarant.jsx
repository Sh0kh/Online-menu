import { useEffect, useState } from 'react';
import RestaurantCreate from '../Restuarant/Components/RestuarantCreate';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { NavLink } from 'react-router-dom';

// API configuration
axios.defaults.baseURL = 'https://online-menu-dscm.onrender.com/api';
const API_BASE_URL = 'https://online-menu-dscm.onrender.com';

export default function Restaurant() {
    const [restaurantData, setRestaurantData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createModal, setCreateModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(null);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsPerPage] = useState(10);
    const [paginationLoading, setPaginationLoading] = useState(false);

    const getRestaurants = async (page = 1) => {
        if (page === 1) {
            setLoading(true);
        } else {
            setPaginationLoading(true);
        }
        
        try {
            const response = await axios.get(`/restaurant?page=${page}&limit=${itemsPerPage}`);
            
            if (response.data) {
                setRestaurantData(response.data.restaurants || response.data.data || []);
                setTotalPages(response.data.totalPages || Math.ceil(response.data.total / itemsPerPage));
                setTotalItems(response.data.total || response.data.count || 0);
                setCurrentPage(page);
            }
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            // Fallback to main API if pagination fails
            try {
                const fallbackResponse = await axios.get('/restaurant');
                setRestaurantData(fallbackResponse.data || []);
                setTotalPages(1);
                setTotalItems(fallbackResponse.data?.length || 0);
            } catch (fallbackError) {
                console.error('Fallback API also failed:', fallbackError);
                setRestaurantData([]);
            }
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
            await axios.delete(`/restaurant/${id}`);
            
            // Update local state
            setRestaurantData(prev => prev.filter(item => item.id !== id));
            setTotalItems(prev => prev - 1);
            
            // If current page becomes empty and it's not the first page, go to previous page
            if (restaurantData.length === 1 && currentPage > 1) {
                getRestaurants(currentPage - 1);
            }
            
            console.log(`Restaurant with id ${id} deleted successfully`);
        } catch (error) {
            console.error('Error deleting restaurant:', error);
            alert('Ошибка при удалении ресторана');
        } finally {
            setDeleteLoading(null);
        }
    };

    const handleUpdate = async (id) => {
        setUpdateLoading(id);
        try {
            // Here you would typically navigate to edit page or open edit modal
            console.log(`Restaurant with id ${id} update initiated`);
            alert(`Редактирование ресторана с ID: ${id}`);
        } catch (error) {
            console.error('Error updating restaurant:', error);
            alert('Ошибка при обновлении ресторана');
        } finally {
            setUpdateLoading(null);
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[600px]">
                <ReactLoading type="spinningBubbles" color="#1976d2" height={80} width={80} />
            </div>
        );
    }

    return (
        <>
            <div className="w-full min-h-screen p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Рестораны</h1>
                        <p className="text-gray-600 mt-1">Всего: {totalItems} ресторанов</p>
                    </div>
                    <RestaurantCreate refresh={refreshRestaurants} />
                </div>

                {/* Loading overlay for pagination */}
                {paginationLoading && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <ReactLoading type="spin" color="#1976d2" height={40} width={40} />
                            <p className="mt-3 text-gray-600">Загрузка...</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {restaurantData.map((restaurant) => (
                        <div key={restaurant.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100">
                            <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                                <img
                                    src={restaurant.image ? API_BASE_URL + restaurant.image : 'https://via.placeholder.com/300x200?text=Restaurant'}
                                    alt={restaurant.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300x200?text=Restaurant';
                                    }}
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                

                                {/* Action buttons overlay */}
                                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    {/* View button */}
                                    <NavLink
                                        to={`/admin/restaurant/${restaurant.id}`}
                                        className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                                        title="Просмотр деталей"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </NavLink>

                                    {/* Update button */}
                                    <button
                                        onClick={() => handleUpdate(restaurant.id)}
                                        disabled={updateLoading === restaurant.id}
                                        className="w-10 h-10 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                                        title="Изменить ресторан"
                                    >
                                        {updateLoading === restaurant.id ? (
                                            <ReactLoading type="spin" color="#ffffff" height={18} width={18} />
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        )}
                                    </button>

                                    {/* Delete button */}
                                    <button
                                        onClick={() => handleDelete(restaurant.id)}
                                        disabled={deleteLoading === restaurant.id}
                                        className="w-10 h-10 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                                        title="Удалить ресторан"
                                    >
                                        {deleteLoading === restaurant.id ? (
                                            <ReactLoading type="spin" color="#ffffff" height={18} width={18} />
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                                    {restaurant.name}
                                </h3>
                                
                                {restaurant.description && (
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        {restaurant.description}
                                    </p>
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
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span>ID: {restaurant.id}</span>
                                    </div>
                                    <div className="text-xs">
                                        {restaurant.createdAt && new Date(restaurant.createdAt).toLocaleDateString('ru-RU')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
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
                                        className={`px-3 py-2 rounded-lg transition-colors ${
                                            currentPage === pageNumber
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

                {/* Empty state */}
                {restaurantData.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <div className="text-gray-500 text-lg mb-2">Нет доступных ресторанов</div>
                        <p className="text-gray-400">Добавьте новый ресторан, чтобы начать</p>
                    </div>
                )}
            </div>
        </>
    );
}