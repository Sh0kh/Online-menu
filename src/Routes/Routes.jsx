import AllPayment from "../Components/AdminPanel-Component/Setting/Setting";
import Dashboard from "../Components/AdminPanel-Component/Dashboard/Dashboard";
import StudyCenterDetail from "../Components/AdminPanel-Component/StudyCenter-Detail/StudyCenterDetail";

import Profile from "../Components/Profile/Profile";
import Contact from "../Components/UserPanel-Component/Contact/Contact";
import Login from "../Components/UserPanel-Component/Login/Login";
import RestCenterDashboard from "../Components/AdminPanel-Component/RestCenterDashboard/RestCenterDashboard";
import MenuCenter from "../Components/AdminPanel-Component/MenuCenter/MenuCenter";
import Menu from "../Components/UserPanel-Component/Home/Menu";
import Restuarant from "../Components/Restuarant/Restuarant";


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
        component: <MenuCenter/>,
    },
      {
        name: "Restaranlar",
        path: "/restuarant",
        component: <Restuarant/>,
    },
    {
        name: "Oq`uv markaz",
        path: "/o'quv_markaz/:studyCenterId",
        component: <StudyCenterDetail />,
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


    // Study-Center
    {
        name: "Restaran dashboard",
        path: "restaran/dashboard",
        component: <RestCenterDashboard/>,
    },
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