import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import {
    Avatar,
    IconButton
} from '@mui/material';
import Asset from '../assets/Asset';
import Building from '../assets/Building';
import Sittable from '../assets/Sittable';
import Ridable from '../assets/Ridable';
import Lightable from '../assets/Lightable';
import Flyable from '../assets/Flyable';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/Context';


const IconbuttonSX = {display: 'flex', flexDirection: 'column'};


function AssetMenuTabPanel(props) {
    const { ModelStore } = useStores();

    const addAsset = (item, e) => {
        let fbx_fn = '/assets/' + props.name + '/' + item + '.fbx';
        
        switch(props.type) {
            case 'Building':
                ModelStore.addAsset(
                    <Building 
                        component='Building'
                        key={item}
                        id={'custom_1'}
                        category={'미정'}
                        color={'gray'}
                        name={props.name}
                        fn={fbx_fn}
                    />
                );
                break;
            case 'Asset':
                ModelStore.addAsset(<Asset key={item} component='Asset' fn={fbx_fn} category={props.name} name={item}/>);
                break;
            case 'Sittable':
                ModelStore.addAsset(<Sittable key={item} component='Sittable' fn={fbx_fn} category={props.name} name={item}/>);
                break;
            case 'Ridable':
                ModelStore.addAsset(<Ridable key={item} component='Ridable' fn={fbx_fn} category={props.name} name={item}/>);
                break;
            case 'Flyable':
                ModelStore.addAsset(<Flyable key={item} component='Flyable' fn={fbx_fn} category={props.name} name={item}/>);
                break;
            case 'Lightable':
                ModelStore.addAsset(<Lightable key={item} component='Lightable' fn={fbx_fn} category={props.name} name={item}/>) 

        }

        //ModelStore.addAsset(
        //    <Asset key={item} component='Asset' fn={fbx_fn} category={props.name} name={item}/>
        //)
    }

    var ItemList = [];

    { props.items.map( (item, index) => { ItemList.push(
        <IconButton key={index} onClick={(e) => {addAsset(item,e)}} sx={IconbuttonSX}>
            <Avatar sx={{width: '3vw', height: '3vw', bgcolor: '#e9e7e5' }} src={'../../preview_assets/'+props.name+'/'+item+'.jpg'} variant='circular'/>
        </IconButton>
        
    )})}

    return ItemList;
}

export default observer(AssetMenuTabPanel);

/*
<IconButton onClick={(e) => {addAsset(props.items[0],e)}} sx={IconbuttonSX}>
    <Avatar sx={{width: '3vw', height: '3vw', bgcolor: '#e9e7e5' }} src={'../../icons/asset_'+props.name+'.png'} variant='circular'/>
</IconButton>
*/