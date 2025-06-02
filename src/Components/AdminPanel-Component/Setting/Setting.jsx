import {
    Card,
    Typography,
    Button,
    Switch,
    Select,
    Option,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LanguageIcon from "@mui/icons-material/Language";

export default function Setting() {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [language, setLanguage] = useState("uz");
    const [currentBg, setCurrentBg] = useState("gradient-blue");
    
    // Background options
    const backgroundOptions = [
        { id: "gradient-blue", name: "Moviy gradient", class: "bg-gradient-to-r from-blue-400 to-blue-600" },
        { id: "gradient-green", name: "Yashil gradient", class: "bg-gradient-to-r from-green-400 to-green-600" },
        { id: "gradient-purple", name: "Binafsha gradient", class: "bg-gradient-to-r from-purple-400 to-purple-600" },
        { id: "gradient-orange", name: "To'q sariq gradient", class: "bg-gradient-to-r from-orange-400 to-orange-600" },
        { id: "gradient-pink", name: "Pushti gradient", class: "bg-gradient-to-r from-pink-400 to-pink-600" },
        { id: "solid-dark", name: "Qora rang", class: "bg-gray-800" },
        { id: "solid-light", name: "Oq rang", class: "bg-gray-100" },
    ];

    const applyBackground = (bgClass) => {
        // Apply background to body or main container
        document.body.className = bgClass;
        setCurrentBg(bgClass);
        // Save to localStorage
        localStorage.setItem("selectedBackground", bgClass);
    };

    useEffect(() => {
        // Load saved background
        const savedBg = localStorage.getItem("selectedBackground");
        if (savedBg) {
            setCurrentBg(savedBg);
            document.body.className = savedBg;
        }
    }, []);

    return (
        <div className="p-[20px] space-y-6">
            <Typography variant="h4" color="blue-gray" className="font-bold">
                Sozlamalar
            </Typography>

            {/* Background Settings */}
            <Card className="p-6 shadow-xl rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                    <ColorLensIcon className="text-blue-600" />
                    <Typography variant="h5" color="blue-gray" className="font-semibold">
                        Fon rangini o'zgartirish
                    </Typography>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {backgroundOptions.map((bg) => (
                        <div key={bg.id} className="text-center">
                            <div
                                className={`w-full h-20 rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                                    currentBg === bg.id ? "border-blue-500 scale-105" : "border-gray-300"
                                } ${bg.class}`}
                                onClick={() => applyBackground(bg.class)}
                            />
                            <Typography variant="small" className="mt-2 text-gray-600">
                                {bg.name}
                            </Typography>
                        </div>
                    ))}
                </div>
            </Card>

            {/* General Settings */}
            <Card className="p-6 shadow-xl rounded-2xl">
                <Typography variant="h5" color="blue-gray" className="font-semibold mb-4">
                    Umumiy sozlamalar
                </Typography>
                
                <div className="space-y-6">
                    {/* Dark Mode */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Tungi rejim
                                </Typography>
                                <Typography variant="small" color="gray">
                                    Interfeys rangini o'zgartiring
                                </Typography>
                            </div>
                        </div>
                        <Switch
                            checked={darkMode}
                            onChange={(e) => setDarkMode(e.target.checked)}
                            color="blue"
                        />
                    </div>

                    {/* Notifications */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <NotificationsIcon />
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Bildirishnomalar
                                </Typography>
                                <Typography variant="small" color="gray">
                                    Push bildirishnomalarni boshqaring
                                </Typography>
                            </div>
                        </div>
                        <Switch
                            checked={notifications}
                            onChange={(e) => setNotifications(e.target.checked)}
                            color="blue"
                        />
                    </div>

                    {/* Language */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <LanguageIcon />
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Til
                                </Typography>
                                <Typography variant="small" color="gray">
                                    Interfeys tilini tanlang
                                </Typography>
                            </div>
                        </div>
                        <div className="w-48">
                            <Select
                                value={language}
                                onChange={(val) => setLanguage(val)}
                                label="Tilni tanlang"
                            >
                                <Option value="uz">O'zbek tili</Option>
                                <Option value="ru">Русский язык</Option>
                                <Option value="en">English</Option>
                            </Select>
                        </div>
                    </div>
                </div>
            </Card>

            {/* System Settings */}
            <Card className="p-6 shadow-xl rounded-2xl">
                <Typography variant="h5" color="blue-gray" className="font-semibold mb-4">
                    Tizim sozlamalari
                </Typography>
                
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Typography variant="h6" color="blue-gray">
                            Keshni tozalash
                        </Typography>
                        <Button
                            variant="outlined"
                            size="sm"
                            color="red"
                            onClick={() => {
                                localStorage.clear();
                                alert("Kesh tozalandi!");
                            }}
                        >
                            Tozalash
                        </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <Typography variant="h6" color="blue-gray">
                            Sozlamalarni tiklash
                        </Typography>
                        <Button
                            variant="outlined"
                            size="sm"
                            color="orange"
                            onClick={() => {
                                setDarkMode(false);
                                setNotifications(true);
                                setLanguage("uz");
                                setCurrentBg("gradient-blue");
                                document.body.className = "bg-gradient-to-r from-blue-400 to-blue-600";
                                localStorage.removeItem("selectedBackground");
                                alert("Sozlamalar tiklandi!");
                            }}
                        >
                            Tiklash
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Save Settings */}
            <div className="flex justify-end">
                <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                        // Save all settings
                        const settings = {
                            darkMode,
                            notifications,
                            language,
                            background: currentBg
                        };
                        localStorage.setItem("userSettings", JSON.stringify(settings));
                        alert("Sozlamalar saqlandi!");
                    }}
                >
                    Sozlamalarni saqlash
                </Button>
            </div>
        </div>
    );
}