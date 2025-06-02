import { useEffect, useState } from 'react';
import StudyCenterCreate from './StudyCenterCreate';
import { $api } from '../../../utils';
import ReactLoading from 'react-loading';
import CONFIG from '../../../utils/Config';
import { NavLink } from 'react-router-dom';

const staticCategoryData = [
    {
        "id": 27,
        "name": "ХОЛОДНЫЕ ЗАКУСКИ",
        "image": "",
        "sort": 1,
        "createdAt": "2024-11-28T16:33:03.012Z",
        "updatedAt": "2024-11-28T16:33:03.012Z"
    },
    {
        "id": 28,
        "name": "ГОРЯЧИЕ ЗАКУСКИ",
        "image": "",
        "sort": 2,
        "createdAt": "2024-11-28T16:40:37.444Z",
        "updatedAt": "2024-11-28T16:40:37.444Z"
    },
    
];

export default function MenuCenter() {
    const [studyCenterData, setStudyCenterData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createModal, setCreateModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(null);

    const getStudyCenter = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            setStudyCenterData(staticCategoryData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить эту категорию?')) {
            return;
        }

        setDeleteLoading(id);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setStudyCenterData(prev => prev.filter(item => item.id !== id));
            
      
            console.log(`Category with id ${id} deleted successfully`);
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Ошибка при удалении категории');
        } finally {
            setDeleteLoading(null);
        }
    };

    const handleUpdate = async (id) => {
        setUpdateLoading(id);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
         
            
            console.log(`Category with id ${id} update initiated`);
            alert(`Редактирование категории с ID: ${id}`);
        } catch (error) {
            console.error('Error updating category:', error);
            alert('Ошибка при обновлении категории');
        } finally {
            setUpdateLoading(null);
        }
    };

    useEffect(() => {
        getStudyCenter();
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
                    <h1 className="text-2xl font-semibold text-gray-800">Category</h1>
                    <StudyCenterCreate refresh={getStudyCenter} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {studyCenterData.map((category) => (
                        <div key={category.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100">
                            <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                                <img
                                    src={CONFIG.API_URL + category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                    }}
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Sort badge */}
                                <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                                    #{category.sort}
                                </div>

                                {/* Action buttons overlay */}
                                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    {/* View button */}
                                    <NavLink
                                        to={`/admin/menu/${category.id}`}
                                        className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                                        title="Просмотр меню"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </NavLink>

                                    {/* Update button */}
                                    <button
                                        onClick={() => handleUpdate(category.id)}
                                        disabled={updateLoading === category.id}
                                        className="w-10 h-10 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                                        title="Изменить категорию"
                                    >
                                        {updateLoading === category.id ? (
                                            <ReactLoading type="spin" color="#ffffff" height={18} width={18} />
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        )}
                                    </button>

                                    {/* Delete button */}
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        disabled={deleteLoading === category.id}
                                        className="w-10 h-10 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                                        title="Удалить категорию"
                                    >
                                        {deleteLoading === category.id ? (
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
                                    {category.name}
                                </h3>
                                
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span>ID: {category.id}</span>
                                    </div>
                                    <div className="text-xs">
                                        {new Date(category.createdAt).toLocaleDateString('ru-RU')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty state */}
                {studyCenterData.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500 text-lg mb-2">Нет доступных категорий</div>
                        <p className="text-gray-400">Добавьте новую категорию, чтобы начать</p>
                    </div>
                )}
            </div>
        </>
    );
}