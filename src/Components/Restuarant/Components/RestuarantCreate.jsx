import { useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { $api } from '../../../utils';
import Swal from 'sweetalert2';

// API configuration
axios.defaults.baseURL = 'https://online-menu-dscm.onrender.com/api';

export default function RestaurantCreate({ refresh }) {
    const [createModal, setCreateModal] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    
    // Create form states
    const [formData, setFormData] = useState({
        owner_id: '',
        name: '',
        logo_img: null,
        address: '',
        domen_name: ''
    });

    const [previewImage, setPreviewImage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        
        if (name === 'logo_img' && files[0]) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
            
            // Create preview URL for image
            const reader = new FileReader();
            reader.onload = (e) => setPreviewImage(e.target.result);
            reader.readAsDataURL(files[0]);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.address || !formData.domen_name) {
            Swal.fire({
                title: 'Iltimos, majburiy maydonlarni to\'ldiring!',
                icon: 'warning',
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
            return;
        }

        setCreateLoading(true);

        try {
            const formDataToSend = new FormData();
            
            // Matn ma'lumotlarini qo'shish
            formDataToSend.append('name', formData.name);
            formDataToSend.append('address', formData.address);
            formDataToSend.append('domen_name', formData.domen_name);
            
            // Agar owner_id bo'lsa
            if (formData.owner_id) {
                formDataToSend.append('owner_id', formData.owner_id);
            }
            
            // Rasmni qo'shish (agar tanlangan bo'lsa)
            if (formData.logo_img) {
                formDataToSend.append('logo_img', formData.logo_img);
            }

            const response = await $api.post('/restaurant', formDataToSend);

            Swal.fire({
                title: 'Restoran muvaffaqiyatli yaratildi!',
                icon: 'success',
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
            
            closeModal();
            
            if (refresh) {
                refresh();
            }
            
        } catch (error) {
            Swal.fire({
                title: 'Xatolik yuz berdi!',
                icon: 'error',
                position: "top-end",
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
        } finally {
            setCreateLoading(false);
        }
    };

    const closeModal = () => {
        setCreateModal(false);
        setFormData({
            owner_id: '',
            name: '',
            logo_img: null,
            address: '',
            domen_name: ''
        });
        setPreviewImage(null);
    };

    return (
        <>
            {/* Create Button */}
            <button
                onClick={() => setCreateModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:scale-105"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Добавить ресторан
            </button>

            {/* Create Modal */}
            {createModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800">Создать новый ресторан</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                            >
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleCreate} className="p-6 space-y-6">
                            {/* Owner ID */}
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-3">
                                    ID владельца
                                </label>
                                <input
                                    type="text"
                                    name="owner_id"
                                    value={formData.owner_id}
                                    onChange={handleInputChange}
                                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                                    placeholder="Введите ID владельца"
                                />
                            </div>

                            {/* Restaurant Name */}
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-3">
                                    Название ресторана <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                                    placeholder="Например: Darxon"
                                />
                            </div>

                            {/* Logo Image */}
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-3">
                                    Логотип ресторана
                                </label>
                                <div className="space-y-4">
                                    <input
                                        type="file"
                                        name="logo_img"
                                        onChange={handleInputChange}
                                        accept="image/*"
                                        className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-base file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    {previewImage && (
                                        <div className="flex justify-center">
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-3">
                                    Адрес <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                                    placeholder="Например: Uzbekistan, Tashkent"
                                />
                            </div>

                            {/* Domain Name */}
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-3">
                                    Доменное имя <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="domen_name"
                                    value={formData.domen_name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                                    placeholder="Например: darxon.qrmenu.uz"
                                />
                            </div>

                            {/* Form Actions */}
                            <div className="flex gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-6 py-4 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors font-medium text-base"
                                >
                                    Отмена
                                </button>
                                <button
                                    type="submit"
                                    disabled={createLoading}
                                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-base"
                                >
                                    {createLoading ? (
                                        <>
                                            <ReactLoading type="spin" color="#ffffff" height={24} width={24} />
                                            <span>Создание...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Создать
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}