import React, { useState } from "react";
import Box from '@mui/material/Box';
import {
    Typography,
    Card,
    CardHeader,
    CardContent,
    Tabs,
    Tab
} from '@mui/material';
import TabPanel from '../TabPanelView'
import GeojsonUploadCard from './GeojsonUploadCard'
import SpaceSelectionCard from './SpaceSelectionCard'
import AssetMenu from "./AssetMenu";
import MyWorld from '../../StudioWorld';


export default () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };  

    return (
        <Box sx={{ width: '84vw', height: '95vh', display: 'flex', bgcolor: 'white'  }}>
            <Card variant='elevation' sx={{ minWidth:'300px', width: '20%',height: '99%', m: '0.5%', bgcolor: 'white', borderRadius: 5, border: 0.5, borderColor: '#dbdbdb' }}>
                <Tabs value={value} onChange={handleChange} sx={{ flexGrow: 1 }} variant='fullWidth' textColor="secondary" indicatorColor="secondary" centered>
                    <Tab label="Space" index='0' />
                    <Tab label="Assets" index='1' />
                </Tabs>
                <TabPanel value={value} index={0} width='100%'>
                    <CardHeader title="Space Modeling" sx={{ color: '#5f5f5f', textAlign: 'center', mb:-1 }} />
                    <CardContent>
                        <GeojsonUploadCard />
                        <SpaceSelectionCard/>
                    </CardContent>
                </TabPanel>
                <TabPanel value={value} index={1} width='100%'>
                    <AssetMenu/>
                </TabPanel>
                
            </Card>
            <Box sx={{ height: '100%', width: '80%', mr:1}}>
                <MyWorld />
            </Box>
        </Box>
    )
}
//raycaster={{ filter: (intersects, state) => intersects.slice(0, 1) }}
