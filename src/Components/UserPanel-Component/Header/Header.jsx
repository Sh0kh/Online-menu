import React, { useState } from 'react';
import logo from '../../../Images/examifyNew.png';
import { NavLink } from 'react-router-dom';
import HeaderMenu from './components/HeaderMenu';
import { Spin as Hamburger } from 'hamburger-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchData } from '../../Redux/MyInformation';
import ManualModal from './components/ManualModal';
import PersonFoto from '../../../Images/FotoPerson.jpg'

function Header() {
    const [active, setActive] = useState(false);
    const toggleMenu = () => setActive(!active);
    const closeMenu = () => setActive(false);
    // const dispatch = useDispatch();
    // const { data, status } = useSelector((state) => state.data);
    const token = localStorage.getItem('token');
    const [modal, setModal] = useState(false);
    const [manualModal, setManualModal] = useState(false);

    const ActiveModal = () => {
        setModal(!modal);
    };

    // if (status === 'idle') {
    //     dispatch(fetchData());
    // }

    const handleScrollUp = () => {
        const currentScroll = window.pageYOffset;
        const windowHeight = window.innerHeight;
        window.scrollTo({
            top: currentScroll - windowHeight,
            behavior: 'smooth',
        });
    };

    const handleOutsideClick = (event) => {
        if (event.target.classList.contains('modal-overlay2')) {
            setModal(false);
        }
    };

    const exit = () => {
        localStorage.clear();
        window.location.reload();
    };

    const openManualModal = () => {
        setManualModal(true);
    };

    const closeManualModal = () => {
        setManualModal(false);
    };

    return (
        <div className='w-full px-4 sm:px-6 flex justify-center '>
            <header className="fixed top-[20px] w-full max-w-[1200px] z-[20] px-4 sm:px-6 py-3 bg-white rounded-xl shadow-md">
                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-2 sm:gap-[30px]'>
                        <NavLink onClick={handleScrollUp} to={`/`}>
                            <div className="flex items-center gap-2">
                                <img src={logo} alt="Logo" className="w-[100px] sm:w-[121px] h-auto sm:h-[34px]" />
                            </div>
                        </NavLink>
                        <nav className='hidden md:flex items-center gap-[20px] text-[#535862]'>
                            <NavLink onClick={handleScrollUp} to={`/multi-level`} className="hover:text-black font-[600]">
                                MULTILEVEL
                            </NavLink>
                            <NavLink onClick={handleScrollUp} to={`/test`} className="hover:text-black font-[600]">
                                IELTS
                            </NavLink>
                            {token && (
                                <NavLink onClick={handleScrollUp} to={`/myResult`} className="hover:text-black font-[600]">
                                    My Result
                                </NavLink>
                            )}
                            <NavLink onClick={handleScrollUp} to={`/contact`} className="hover:text-black font-[600]">
                                Contact
                            </NavLink>
                            <NavLink onClick={handleScrollUp} to={`/bonus`} className="hover:text-black font-[600]">
                                Bonus
                            </NavLink>
                            <button
                                onClick={openManualModal}
                                className="hover:text-black font-[600]">
                                Manual
                            </button>
                            <a className='hover:text-black font-[600]' href="https://itliveacademy.uz/" target="_blank" rel="noopener noreferrer">
                                IT LIVE Academy
                            </a>
                        </nav>
                    </div>
                    <div className='flex items-center gap-[5px]'>
                        {token ? (
                            <button className='header__login__btn' onClick={ActiveModal}>
                                <img className='w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-[50%] border-[1px] border-[black]' src={PersonFoto} alt="Foto" />
                            </button>
                        ) : (
                            <NavLink onClick={handleScrollUp} to='/login'>
                                <button
                                    className="px-3 py-1 sm:px-4 sm:py-2 text-white bg-[#2970ff] font-[600] normal-case rounded-md"
                                >
                                    Login
                                </button>
                            </NavLink>
                        )}
                        <button onClick={toggleMenu} className='header__burger relative z-20 block md:hidden'>
                            <Hamburger size={24} color={`${active ? 'white' : '#1B2A3D'}`} toggled={active} toggle={setActive} />
                        </button>
                        {modal && (
                            <div
                                className='fixed inset-0 z-50 modal-overlay2'
                                onClick={handleOutsideClick}
                            >
                                <div className='fixed right-[5%] sm:right-[10%] border-[1px] border-MainColor top-[80px] sm:top-[90px] bg-white rounded-[8px] p-[10px] shadow-2xl'>
                                    <div>
                                        <h3 className='font-bold'>{data?.name}</h3>
                                        <h3>{data?.phoneNumber}</h3>
                                        <h3 className='font-bold'>
                                            IELTS Exam limit: {data?.todayExamCount}
                                        </h3>
                                        <h3 className="font-bold">
                                            Balance: {data?.balance?.toLocaleString("ru-RU")} uzs
                                        </h3>
                                    </div>
                                    <div className='w-full h-[1px] my-[7px] bg-MainColor'></div>
                                    <button onClick={exit} className='flex items-center gap-[10px] font-bold border-MainColor text-MainColor rounded-[8px] border-[2px] px-[20px] py-[3px] transition duration-500 hover:bg-MainColor hover:text-[white]'>
                                        Logout
                                        <svg className='text-[20px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 4.001H5v14a2 2 0 0 0 2 2h8m1-5l3-3m0 0l-3-3m3 3H9"></path></svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <HeaderMenu isOpen={active} onClose={closeMenu} />
                <ManualModal isOpen={manualModal} onClose={closeManualModal} />
            </header>
        </div>
    );
}

export default Header;