import React, { FC } from 'react';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

interface Props {
    window?: () => Window;
}

const SidebarData: FC = (props: Props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const listItemData = [
        {
            label: "Dashboard", link: "/", icon: <InboxIcon />
        }
    ]

    return (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {listItemData.map((item) => (
                    <ListItem key={item.label} component={NavLink} to={item?.link} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {item?.icon}
                            </ListItemIcon>
                            <ListItemText primary={item?.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );
};

export { SidebarData };
