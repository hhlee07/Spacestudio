import React from 'react';
import {
    Box,
    Typography
} from '@mui/material';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/Context';

function PortalPopup(props) {
    const { PortalStore } = useStores();

    return (
        <Box sx={{ width: '25vw', height: '20vh', borderRadius:2, p:2, position: 'absolute', top:'50%', left:'40%', opacity:0.7, bgcolor:'white'}}>
            <Typography component="div" sx={{fontSize: '2rem', fontWeight: '700', color: 'text.primary', m:'2%', textAlign: 'center'}}>
                {PortalStore.portal} 
            </Typography>
            <Typography sx={{fontSize: '1.5rem', m:'1%', textAlign: 'center'}}>
                실내 공간으로 들어가시겠습니까?
            </Typography>
            <Typography component="div" sx={{fontSize: '1rem', color:"blue", textAlign: 'center'}}>
                Press Enter to get in.
            </Typography>
        </Box>
    )
}

export default observer(PortalPopup);