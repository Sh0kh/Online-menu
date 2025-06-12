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

// Меню для admin
const adminMenu = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: `Category`, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor"
         d="m4.298 20.308l-.707-.708L13.725 9.465q-.508-1.203-.221-2.365q.287-1.161 1.29-2.154q.979-.979 2.45-1.358t2.458.608t.608 2.458t-1.358 2.45q-.992 1.004-2.154 1.29t-2.365-.221L12.606 12l7.6 7.6l-.708.708l-7.6-7.55zm3.066-8.435l-2.77-2.77Q3.475 7.986 3.388 6.457t.899-2.764L9.91 9.327z"/></svg>, 
         path: `/category` },
    { text: `Sozlamalar`, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path 
        fill="currentColor" 
        d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2"/>
        </svg>, path: `/setting` },
        { text: `Xodimlar`, icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path fill="currentColor" d="M16.43 16.69a7 7 0 1 1 7-7a7 7 0 0 1-7 7m0-11.92a5 5 0 1 0 5 5a5 5 0 0 0-5-5M22 17.9a25.4 25.4 0 0 0-16.12 1.67a4.06 4.06 0 0 0-2.31 3.68v5.95a1 1 0 1 0 2 0v-5.95a2 2 0 0 1 1.16-1.86a22.9 22.9 0 0 1 9.7-2.11a23.6 23.6 0 0 1 5.57.66Zm.14 9.51h6.14v1.4h-6.14z"/><path fill="currentColor" d="M33.17 21.47H28v2h4.17v8.37H18v-8.37h6.3v.42a1 1 0 0 0 2 0V20a1 1 0 0 0-2 0v1.47H17a1 1 0 0 0-1 1v10.37a1 1 0 0 0 1 1h16.17a1 1 0 0 0 1-1V22.47a1 1 0 0 0-1-1"/>
          </svg>, path: `/employee` },
];

// Меню для super_admin
const superAdminMenu = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/restaran/dashboard' },
    { text: 'Owners', icon: <Person />, path: 'owners' },
     { text: `Restaranlar`, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M19 18H5zm-7 0v-6zm3 0v-4zm-6 0v-4zm10 4V11.33a3.001 3.001 0 1 0-2.08-5.63C16.55 3.874 14.46 2 12 2S7.45 3.874 7.08 5.7A3 3 0 1 0 5 11.33V22z"/></svg>, path: `/restuarant` },
];

// Меню для owner
const ownerMenu = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: `Category`, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor"
         d="m4.298 20.308l-.707-.708L13.725 9.465q-.508-1.203-.221-2.365q.287-1.161 1.29-2.154q.979-.979 2.45-1.358t2.458.608t.608 2.458t-1.358 2.45q-.992 1.004-2.154 1.29t-2.365-.221L12.606 12l7.6 7.6l-.708.708l-7.6-7.55zm3.066-8.435l-2.77-2.77Q3.475 7.986 3.388 6.457t.899-2.764L9.91 9.327z"/></svg>, 
         path: `/category` },
    { text: `Sozlamalar`, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path 
        fill="currentColor" 
        d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2"/>
        </svg>, path: `/setting` },

          { text: `Ranglar`, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor"
             d="M17.5 12a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 17.5 9a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m-3-4A1.5 1.5 0 0 1 13 6.5A1.5 1.5 0 0 1 14.5 5A1.5 1.5 0 0 1 16 6.5A1.5 1.5 0 0 1 14.5 8m-5 0A1.5 1.5 0 0 1 8 6.5A1.5 1.5 0 0 1 9.5 5A1.5 1.5 0 0 1 11 6.5A1.5 1.5 0 0 1 9.5 8m-3 4A1.5 1.5 0 0 1 5 10.5A1.5 1.5 0 0 1 6.5 9A1.5 1.5 0 0 1 8 10.5A1.5 1.5 0 0 1 6.5 12M12 3a9 9 0 0 0-9 9a9 9 0 0 0 9 9a1.5 1.5 0 0 0 1.5-1.5c0-.39-.15-.74-.39-1c-.23-.27-.38-.62-.38-1a1.5 1.5 0 0 1 1.5-1.5H16a5 5 0 0 0 5-5c0-4.42-4.03-8-9-8"/>
             </svg>, path: `/colors` },
        
          { text: `Orqa fon`, icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path fill="currentColor" d="M13 11q2 2.09 2 3.125C15 15.161 14.105 16 13 16s-2-.84-2-1.875Q11 13.09 13 11M5.857.15l6.34 6.45l.016.02l.324.321a1.5 1.5 0 0 1 .11 2.006l-.103.114l-4.474 4.513a1.5 1.5 0 0 1-2.123.008L1.464 9.06a1.5 1.5 0 0 1 .007-2.12l4.472-4.45c.145-.146.313-.254.492-.327L5.144.85a.5.5 0 0 1 .713-.7m1.496 3.049a.5.5 0 0 0-.705 0L2.177 7.65a.5.5 0 0 0-.148.35h9.95a.5.5 0 0 0-.148-.35L7.353 3.2z"/>
          </svg>, path: `/backround` },

          { text: `Xodimlar`, icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path fill="currentColor" d="M16.43 16.69a7 7 0 1 1 7-7a7 7 0 0 1-7 7m0-11.92a5 5 0 1 0 5 5a5 5 0 0 0-5-5M22 17.9a25.4 25.4 0 0 0-16.12 1.67a4.06 4.06 0 0 0-2.31 3.68v5.95a1 1 0 1 0 2 0v-5.95a2 2 0 0 1 1.16-1.86a22.9 22.9 0 0 1 9.7-2.11a23.6 23.6 0 0 1 5.57.66Zm.14 9.51h6.14v1.4h-6.14z"/><path fill="currentColor" d="M33.17 21.47H28v2h4.17v8.37H18v-8.37h6.3v.42a1 1 0 0 0 2 0V20a1 1 0 0 0-2 0v1.47H17a1 1 0 0 0-1 1v10.37a1 1 0 0 0 1 1h16.17a1 1 0 0 0 1-1V22.47a1 1 0 0 0-1-1"/>
          </svg>, path: `/employee` },
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
    
    // Determine which menu to show based on role
    let activeMenu;
    switch(role) {
        case 'super_admin':
            activeMenu = superAdminMenu;
            break;
        case 'admin':
            activeMenu = adminMenu;
            break;
        case 'owner':
            activeMenu = ownerMenu;
            break;
        default:
            activeMenu = []; // or some default menu for other roles/no role
    }

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