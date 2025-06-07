import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    SidebarContainer,
    DrawerContent,
    StyledListItem,
} from './components/SidebarStyle';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';

import { FindInPage, Key, Money, MoneySharp, Person } from '@mui/icons-material';

const LogoContainer = ({ children }) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            mb: 3,
            mt: 2,
        }}
    >
        {children}
    </Box>
);

// Меню для обычных пользователей
const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: `Category`, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor"
         d="m4.298 20.308l-.707-.708L13.725 9.465q-.508-1.203-.221-2.365q.287-1.161 1.29-2.154q.979-.979 2.45-1.358t2.458.608t.608 2.458t-1.358 2.45q-.992 1.004-2.154 1.29t-2.365-.221L12.606 12l7.6 7.6l-.708.708l-7.6-7.55zm3.066-8.435l-2.77-2.77Q3.475 7.986 3.388 6.457t.899-2.764L9.91 9.327z"/></svg>, 
         path: `/category` },
          { text: `Restaranlar`, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M19 18H5zm-7 0v-6zm3 0v-4zm-6 0v-4zm10 4V11.33a3.001 3.001 0 1 0-2.08-5.63C16.55 3.874 14.46 2 12 2S7.45 3.874 7.08 5.7A3 3 0 1 0 5 11.33V22z"/></svg>, path: `/restuarant` },
    { text: `Sozlamalar`, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path 
        fill="currentColor" 
        d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2"/>
        </svg>, path: `/setting` },
    

];

// Меню для ST_ADMIN
const StMenu = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: `/o'quv_markaz` },
    { text: `Imtihonlar`, icon: <SchoolIcon />, path: `/o'quv_markaz/imtihon` },
    { text: `Imtihon kaliti`, icon: <Key />, path: `/o'quv_markaz/imtihon/kalit` },
    { text: `Reyting`, icon: <Person />, path: `/o'quv_markaz/imtihon/reyting` },
    { text: `Tk Imtihonlar`, icon: < SchoolIcon />, path: `/o'quv_markaz/imtihon/tekshirilmagan_imtihonlar` },
];

const CustomNavLink = React.forwardRef(({ to, icon, label }, ref) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <NavLink
            to={to}
            style={{ textDecoration: 'none', color: 'inherit' }}
            className={({ isActive }) => isActive ? 'active-link' : ''}
        >
            <StyledListItem
                className={isActive ? 'Mui-selected' : ''}
                ref={ref}
            >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
            </StyledListItem>
        </NavLink>
    );
});

export default function SideBar() {
    const role = localStorage.getItem('role');
    const activeMenu = role === 'ST_ADMIN' ? StMenu : menuItems;

    return (
        <SidebarContainer>
            <DrawerContent variant="permanent">
                <LogoContainer>
                    <img src="" alt="Логотип" style={{ height: 45 }} />
                </LogoContainer>
                <List sx={{ pt: 0 }}>
                    {activeMenu.map((item, index) => (
                        <CustomNavLink
                            key={index}
                            to={item.path}
                            icon={item.icon}
                            label={item.text}
                        />
                    ))}
                </List>
            </DrawerContent>
        </SidebarContainer>
    );
}
