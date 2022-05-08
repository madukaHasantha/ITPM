import React, { Fragment } from 'react';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SideBarItem from '../SideBarItem';
import CampaignIcon from '@mui/icons-material/Campaign';

const arr = [
    {   icon:<CampaignIcon/>,
        label: 'Dash Board',
       
        link: '/branch'
        

    },
    {
        label: 'Teacher',
        link: '/branch'
    },
    {
        label: 'Student',
        link: '/branch'
    },
    {
        label: 'Announcement',
        link: '/branch'
    },
    {
        label: 'Class',
        link: '/branch'
    }
    
];

const SideBar = () => {
    return(
        <div className="Sidebar">
            {(arr) ?
                arr.map((item, i) => (
                    <Fragment key={i}>
                        <SideBarItem item = {arr[i]} />
                    </Fragment>
                )) : null
            }
        </div>
    );
}

export default SideBar;