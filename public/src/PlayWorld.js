import React, { Suspense }  from "react";
import { useProgress, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { observer } from 'mobx-react';

import {
    useStores, 
    StoreProvider, 
    StoreConsumer,
    FirstPersonControl,
    PortalPopup,
    Decorator
} from 'space-studio';

function Loader() {
    const { progress } = useProgress();
    return <Html center> <h2>Model Loading... {progress.toFixed(2)}%</h2></Html>
}


function MyWorld() {
    const { ModelStore, PlaymodeStore, PortalStore } = useStores();
    console.log(ModelStore.model);

    const canvas_style = { background: "#2f2f2f" };
    const camera_settings = { position: [0, 0.5, 50], fov: 50 };

    return ( <>
        <StoreConsumer>
        { value => (
            <Canvas
            style={canvas_style}
            camera={camera_settings}
            id="canvas"
            >
            <StoreProvider value={value}>
                <Suspense fallback={<Loader/>}>
                    <FirstPersonControl exit={PlaymodeStore.exitPm}/>
                    <Decorator/>
                    {ModelStore.model}
                </Suspense>
            </StoreProvider>
            </Canvas>
        )}
        </StoreConsumer>
        { PortalStore.portal && <PortalPopup/>}
        </>
    )
} 

export default observer(MyWorld);
