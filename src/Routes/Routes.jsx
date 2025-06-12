import AllPayment from "../Components/AdminPanel-Component/Setting/Setting";
import Dashboard from "../Components/AdminPanel-Component/Dashboard/Dashboard";

import Profile from "../Components/Profile/Profile";
import Contact from "../Components/UserPanel-Component/Contact/Contact";
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


export const UserRoutes = [
    {
        name: "Contact",
        path: "contact",
        component: <Contact />,
    },
    {
        name: "Login",
        path: 'login',
        component: <Login />
    },
    {
        name:"Menu",
        path:"/category/:ID",
        component: <Menu/>
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
        component: <CategoryCenter/>,
    },
      {
        name: "Restaranlar",
        path: "/restuarant",
        component: <Restuarant/>,
    },

        {
        name: "Employee",
        path: "/employee",
        component: <Employee/>,
    },
         {
        name: "Restaranlar veiw",
        path: "/restaurant/:id",
        component: <RestaurantVeiw/>,
    },
     
         {
        name: "Category veiw",
        path: "/category/menu/:id",
        component: <MenuCenter/>,
    },

             {
        name: "Ranglar",
        path: "/colors",
        component: <Colors/>,
    },
      {
        name: "Backround",
        path: "/backround",
        component: <Backround/>,
    },
     {
        name: "Owners",
        path: "/owners",
        component: <Owners/>,
    },
    {
        name: "Sozalamalar",
        path: "/setting",
        component: <AllPayment />,
    },
    // {
    //     name: "Moliya",
    //     path: "/o'quv_markaz/moliya",
    //     component: <Finance />,
    // },
    // {
    //     name: "Narxlar",
    //     path: "/o'quv_markaz/narx",
    //     component: <Price />,
    // },
    // {
    //     name: "Kalit narxi",
    //     path: "/o'quv_markaz/kalit-narxi",
    //     component: <KeyPrice />,
    // },



    // {
    //     name: "Exam",
    //     path: "/o'quv_markaz/imtihon",
    //     component: <Exam />,
    // },
    // {
    //     name: "Exam-info",
    //     path: "/o'quv_markaz/imtihon/:examID",
    //     component: <ExamDetail />,
    // },
    // {
    //     name: "Exam-section-detail",
    //     path: "/o'quv_markaz/imtihon/bolim/:sectionID",
    //     component: <ExamSectionDetail />,
    // },
    // {
    //     name: "Exam-Key",
    //     path: "/o'quv_markaz/imtihon/kalit",
    //     component: <ExamKey />,
    // },
    // {
    //     name: "Reyting",
    //     path: "/o'quv_markaz/imtihon/reyting",
    //     component: <Reyting />,
    // },
    // {
    //     name: "Tekshirilmagan Imtihonlar",
    //     path: "/o'quv_markaz/imtihon/tekshirilmagan_imtihonlar",
    //     component: <TkExam />,
    // },
    // {
    //     name: "Tekshirilmagan Imtihonlar Batafsil",
    //     path: "/o'quv_markaz/imtihon/tekshirilmagan_imtihonlar/:tkExamId",
    //     component: <TkExamDetail />,
    // },
    // {
    //     name: "Tekshirilmagan Imtihonlar Batafsil Speaking",
    //     path: "/o'quv_markaz/imtihon/tekshirilmagan_imtihonlar/:tkExamId/speaking",
    //     component: <TkExamDetailsSpeaking />,
    // },
    // {
    //     name: "Tekshirilmagan Imtihonlar Batafsil Writing",
    //     path: "/o'quv_markaz/imtihon/tekshirilmagan_imtihonlar/:tkExamId/writing",
    //     component: <TkExamDetailWriting />,
    // },

];