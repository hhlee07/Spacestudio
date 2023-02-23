import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Decorator from './assets/Decorator';
import { OrbitControls, Html } from "@react-three/drei";
import { Box } from '@mui/material';
import textToComponent from '../utils/text-component-mappings';
import { ObjectLoader } from 'three/src/loaders/ObjectLoader';
import CityModel from './SpaceComponentDef';

const template_city = ['gumi', 'geumgok', 'dongchun'];

const objectLoader = new ObjectLoader();

function renderModelFromJson(json_model) {
    let siblings = [];
    for (let i = 0; i < json_model.length; i++ ) {
        let comp = json_model[i];
        if (comp.props.component) {
            if (comp.props.geometry) {
                let uuid = comp.props.geometry.uuid;
                comp.props.geometry = objectLoader.parseGeometries( [comp.props.geometry], null )[uuid];
            }
            if (comp.props.material) {
                let uuid = comp.props.material.uuid;
                comp.props.material = objectLoader.parseMaterials( [comp.props.material] )[uuid];
            }
            siblings.push(textToComponent(comp.props.component, comp.props));
        }
        else if (comp.type === 'mesh') { 
            if (comp.props.geometry) {
                let uuid = comp.props.geometry.uuid;
                comp.props.geometry = objectLoader.parseGeometries( [comp.props.geometry], null )[uuid];
            }
            if (comp.props.material) {
                let uuid = comp.props.material.uuid;
                console.log(comp.props.material);
                comp.props.material = objectLoader.parseMaterials( [comp.props.material] )[uuid];
            }
            siblings.push(<mesh key={comp.key} {...comp.props}/>); 
        }
        else if (comp.type === 'group') {
            siblings.push(
                <group key={comp.key} {...comp.props}>
                    {renderModelFromJson(comp.props.children)}
                </group>
            )
        }
        else if (comp.props.children) {
            siblings.push(
                <React.Fragment key={comp.key} {...comp.props}>
                    {renderModelFromJson(comp.props.children)}
                </React.Fragment>
            )
        }
    }
    //console.log(siblings);
    return siblings;
}

async function getJsonAsync(file) {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }

    try {
        let response = await fetch(file, config);
        let data = await response.json();
        console.log(data);
        console.log('hi');
        return data;
    } catch (err) {
        console.log("Json Fetch Error!!");
        console.error(err);
    }
}


export default function City(props) {
    const [model, setModel] = useState([]);
    let path;
    if (props.fn) {path = '/results/' + props.fn;}

    const canvas_style = { background: "white" };
    const camera_settings = { position: [0, 5, 10] };

    const loadModel = () => {
        getJsonAsync(path).then( (model) => {
            setModel(renderModelFromJson(model));
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect( () => {
        //loadModel();
        console.log(model);
    }, [model])

    return (
        <Box sx={{ width: '100vw', height: '100vh' }}>
            <Canvas
            style={canvas_style}
            camera={camera_settings}
            id="json_canvas"
            onCreated={path && loadModel}
            >
                <Decorator/>
                <OrbitControls/>
                <Suspense fallback={<Html><h1>Loading...</h1></Html>}>
                    {props.fn? model : <CityModel {...props}/>}
                </Suspense>
            </Canvas>
        </Box>
    )
}
