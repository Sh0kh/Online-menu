import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axios from '../../../utils/axios';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/auth/login', {
                username: username.trim(),
                password: password.trim(),
            });

            const { access_token, refresh_token } = response.data.tokens;
            const { id, role, restaurants } = response.data.user;

            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('user_id', id);
            localStorage.setItem('role', role);

            // Save restaurant ids for owner or admin
            if ((role === 'owner' || role === 'admin') && Array.isArray(restaurants)) {
                restaurants.forEach((rest, idx) => {
                    localStorage.setItem(`restaurant_id${idx + 1}`, rest.id);
                });
            }

            // Role asosida yo'naltirish
            if (role === 'super_admin') {
                navigate('/dashboard');
            } else if (role === 'admin') {
                navigate('/dashboard');
            } else {
                // Agar boshqa rol bo'lsa, default dashboard ga yo'naltirish
                navigate('/dashboard');
            }
        } catch (err) {
            console.error(err);
            setError("Login ma'lumotlari noto'g'ri. Iltimos tekshirib ko'ring.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Admin Panelga Kirish</h2>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Foydalanuvchi nomi"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Parol
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 focus:outline-none"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                            }`}
                    >
                        {loading ? 'Kirish...' : 'Kirish'}
                    </button>
                </form>
            </div>
        </div>
    );
}