import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { $api } from '../../../utils';
import { Card, CardBody, Typography, Button } from '@material-tailwind/react';
import ReactLoading from 'react-loading';

export default function RestaurantVeiw() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRestaurant() {
            setLoading(true);
            try {
                const res = await $api.get(`/restaurant/${id}`); 
                setRestaurant(res.data);
            } catch (err) {
                console.error('Error fetching restaurant:', err);
                setError('Restoran topilmadi yoki serverda xatolik.');
            } finally {
                setLoading(false);
            }
        }
        fetchRestaurant();
    }, [id]);

    if (loading) {
        return (
                <div className="flex items-center justify-center h-[600px]">
                            <ReactLoading type="spinningBubbles" color="#1976d2" height={80} width={80} />
                        </div>
        )
    }
    if (error) {
        return <div className="flex flex-col items-center justify-center h-96 text-red-500">{error}</div>;
    }
    if (!restaurant) return null;

    return (
        <div className="flex justify-center items-center min-h-screen  from-blue-50 to-blue-100 p-6">
            <Card className="w-full max-w-2xl shadow-2xl rounded-3xl  bg-white/90">
                <div className="relative h-56 w-full rounded-t-3xl overflow-hidden flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
                    <img
                        src={restaurant.image || 'https://via.placeholder.com/600x300?text=Restaurant'}
                        alt={restaurant.name}
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <Typography variant="h2" color="white" className="absolute bottom-4 left-6 font-bold drop-shadow-lg text-3xl md:text-4xl">
                        {restaurant.name}
                    </Typography>
                </div>
                <CardBody>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-4">
                      
                        <div className="flex-1 w-full space-y-6">
                            <div className="flex items-center gap-4">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div>
                                    <Typography color="gray" className="font-medium text-lg">{restaurant.address}</Typography>
                                    <Typography color="gray" className="text-xs">Manzil</Typography>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 01-8 0 4 4 0 018 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v2m0 4h.01" />
                                </svg>
                                <div>
                                    <Typography color="gray" className="font-medium text-lg">{restaurant.domen_name}</Typography>
                                    <Typography color="gray" className="text-xs">Domen</Typography>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <Typography color="gray" className="font-medium text-lg">
                                        {restaurant.createdAt && new Date(restaurant.createdAt).toLocaleDateString('ru-RU')}
                                    </Typography>
                                    <Typography color="gray" className="text-xs">Yaratilgan sana</Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-8">
                        <Button color="blue" variant="gradient" size="lg" onClick={() => navigate(-1)} className="px-8 py-3 text-base font-semibold rounded-xl shadow-md">
                            Orqaga
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}