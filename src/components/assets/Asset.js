import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useFBX } from '@react-three/drei';
import { useStores } from '../../stores/Context';
import { observer } from 'mobx-react';

const BASE_URL_FBX = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
const TEST_FBX = '/assets/trees/tree.fbx';

function Asset(props) {
    //props.component = 'Asset';    
    const { SidebarStore, PlaymodeStore } = useStores();
    const assetRef = useRef();

    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState(false);
    //첫 번째 원소는 현재 상태, 두번째 원소는 Setter 함수

    let fbx_fn = props.fn ? props.fn : BASE_URL_FBX + TEST_FBX;
    let fbx = useFBX(fbx_fn);

    const handleClick = (event) => {
        event.stopPropagation();

        setSelected(true);
        SidebarStore.selectAsset(
            assetRef.current.userData.id,
            assetRef.current.userData.id,
            assetRef.current.userData.category,
            assetRef.current.position,
            assetRef.current.rotation,
            assetRef.current.scale
        )

        SidebarStore.setcampos(assetRef.current.position.x, assetRef.current.position.y, assetRef.current.position.z)

    }

    useFrame((_, delta) => {
        if (selected) {
            SidebarStore.update3D(
                assetRef.current.position,
                assetRef.current.rotation,
                assetRef.current.scale,
            )
        }
    })


    return (
        <mesh
            ref={assetRef}
            key={props.name}
            name={props.name}
            userData={{ id: props.name, category: props.category }}
            position={props.position ? props.position : [0, 6, 0]}
            scale={props.scale ? props.scale : 0.1}
            onPointerOver={(event) => {
                event.stopPropagation();
                event.target.release
                if (!PlaymodeStore.playMode) { setActive(true); };
            }}
            onPointerOut={(event) => {
                event.stopPropagation();
                if (!PlaymodeStore.playMode) { setActive(false); };
            }}
            onPointerMissed={(event) => {
                event.stopPropagation();
                SidebarStore.unselect();
                setSelected(false);
            }}

            onClick={handleClick}

            onDoubleClick={(event) => {
                event.stopPropagation();
                console.log('Doughnut')
            }}

        >
            <primitive object={fbx} dispose={null} />
        </mesh>
    )

}

export default observer(Asset);
