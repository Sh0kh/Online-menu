import AllPayment from "../Components/AdminPanel-Component/Setting/Setting";
import Dashboard from "../Components/AdminPanel-Component/Dashboard/Dashboard";

import Profile from "../Components/Profile/Profile";
import Login from "../Components/UserPanel-Component/Login/Login";
import CategoryCenter from "../Components/AdminPanel-Component/MenuCenter/CategoryCenter";
import Menu from "../Components/UserPanel-Component/Home/Menu";
import Restuarant from "../Components/Restuarant/Restuarant";
import Owners from "../Components/AdminPanel-Component/Owners/Owners";
import RestaurantVeiw from "../Components/Restuarant/Components/RestaurantVeiw";
import MenuCenter from "../Components/AdminPanel-Component/MenuCenter/MenuComponents/MenuCenter";
import Colors from "../Components/AdminPanel-Component/Colors/Colors";
import Backround from "../Components/AdminPanel-Component/Backround/Backround";
import Employee from "../Components/Employee/Employee";
import Home from "../Components/UserPanel-Component/Home/Home";


export const UserRoutes = [
    {
        name: "Login",
        path: 'login',
        component: <Login />
    },
    {
        name: "Menu",
        path: "/menu",
        component: <Home />,
    },
    {
        name: "Menu",
        path: "/category/:ID",
        component: <Menu />
    }
];

export const AdminRoutes = [
    {
        name: "Dashboard",
        path: "dashboard",
        component: <Dashboard />,
    },
    {
        name: "Profil",
        path: "profil",
        component: <Profile />,
    },
    {
        name: "category",
        path: "/category",
        component: <CategoryCenter />,
    },
    {
        name: "Restaranlar",
        path: "/restuarant",
        component: <Restuarant />,
    },

    {
        name: "Employee",
        path: "/employee",
        component: <Employee />,
    },
    {
        name: "Restaranlar veiw",
        path: "/restaurant/:id",
        component: <RestaurantVeiw />,
    },

    {
        name: "Category veiw",
        path: "/category/menu/:id",
        component: <MenuCenter />,
    },

    {
        name: "Ranglar",
        path: "/colors",
        component: <Colors />,
    },
    {
        name: "Backround",
        path: "/backround",
        component: <Backround />,
    },
    {
        name: "Owners",
        path: "/owners",
        component: <Owners />,
    },
    {
        name: "Sozalamalar",
        path: "/setting",
        component: <AllPayment />,
    },
];