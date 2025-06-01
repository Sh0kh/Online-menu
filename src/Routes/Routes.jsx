import AllPayment from "../Components/AdminPanel-Component/AllPayment/AllPayment";
import Dashboard from "../Components/AdminPanel-Component/Dashboard/Dashboard";
import ExamKey from "../Components/AdminPanel-Component/Exam-Key/ExamKey";
import Exam from "../Components/AdminPanel-Component/Exam/Exam";
import ExamSectionDetail from "../Components/AdminPanel-Component/ExamDetail/components/ExamParts/ExamSectionDetail";
import ExamDetail from "../Components/AdminPanel-Component/ExamDetail/ExamDetail";
import Finance from "../Components/AdminPanel-Component/Finance/Finance";
import KeyPrice from "../Components/AdminPanel-Component/KeyPrice/KeyPrice";
import LoginStudyCenter from "../Components/AdminPanel-Component/Login-Study-Center/loginStudyCenter";
import Price from "../Components/AdminPanel-Component/Price/Price";
import Reyting from "../Components/AdminPanel-Component/Reyting/Reyting";
import StudyCenterDashboard from "../Components/AdminPanel-Component/Study-Center-Dashboard/StudyCenterDashboard";
import StudyCenterDetail from "../Components/AdminPanel-Component/StudyCenter-Detail/StudyCenterDetail";
import StudyCenter from "../Components/AdminPanel-Component/StudyCenter/StudyCenter";
import TkExamDetail from "../Components/AdminPanel-Component/TkExam-Detail/TkExamDetail";
import TkExamDetailsSpeaking from "../Components/AdminPanel-Component/TkExam-Detail/TkExamDetailsSpeaking";
import TkExamDetailWriting from "../Components/AdminPanel-Component/TkExam-Detail/TkExamDetailWriting";
import TkExam from "../Components/AdminPanel-Component/TkExam/TkExam";
import Profile from "../Components/Profile/Profile";
import Contact from "../Components/UserPanel-Component/Contact/Contact";
import Login from "../Components/UserPanel-Component/Login/Login";


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
        name: "Oq`uv markaz",
        path: "/o'quv_markazlar",
        component: <StudyCenter />,
    },
    {
        name: "Oq`uv markaz",
        path: "/o'quv_markaz/:studyCenterId",
        component: <StudyCenterDetail />,
    },
    {
        name: "Barcha tolovlar",
        path: "/o'quv_markaz/tolovlar",
        component: <AllPayment />,
    },
    {
        name: "Moliya",
        path: "/o'quv_markaz/moliya",
        component: <Finance />,
    },
    {
        name: "Narxlar",
        path: "/o'quv_markaz/narx",
        component: <Price />,
    },
    {
        name: "Kalit narxi",
        path: "/o'quv_markaz/kalit-narxi",
        component: <KeyPrice />,
    },


    // Study-Center
    {
        name: "Restaran dashboard",
        path: "restaran/dashboard",
        component: <StudyCenterDashboard />,
    },
    {
        name: "Exam",
        path: "/o'quv_markaz/imtihon",
        component: <Exam />,
    },
    {
        name: "Exam-info",
        path: "/o'quv_markaz/imtihon/:examID",
        component: <ExamDetail />,
    },
    {
        name: "Exam-section-detail",
        path: "/o'quv_markaz/imtihon/bolim/:sectionID",
        component: <ExamSectionDetail />,
    },
    {
        name: "Exam-Key",
        path: "/o'quv_markaz/imtihon/kalit",
        component: <ExamKey />,
    },
    {
        name: "Reyting",
        path: "/o'quv_markaz/imtihon/reyting",
        component: <Reyting />,
    },
    {
        name: "Tekshirilmagan Imtihonlar",
        path: "/o'quv_markaz/imtihon/tekshirilmagan_imtihonlar",
        component: <TkExam />,
    },
    {
        name: "Tekshirilmagan Imtihonlar Batafsil",
        path: "/o'quv_markaz/imtihon/tekshirilmagan_imtihonlar/:tkExamId",
        component: <TkExamDetail />,
    },
    {
        name: "Tekshirilmagan Imtihonlar Batafsil Speaking",
        path: "/o'quv_markaz/imtihon/tekshirilmagan_imtihonlar/:tkExamId/speaking",
        component: <TkExamDetailsSpeaking />,
    },
    {
        name: "Tekshirilmagan Imtihonlar Batafsil Writing",
        path: "/o'quv_markaz/imtihon/tekshirilmagan_imtihonlar/:tkExamId/writing",
        component: <TkExamDetailWriting />,
    },

];