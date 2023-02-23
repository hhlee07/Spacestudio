import React from 'react';

export default function Road(props) {
    return (
        <mesh
            key={props.key}
            geometry={props.geometry}
            position={props.position}
            scale={props.scale}
            name={props.name}
            castShadow={props.castShadow}
            receiveShadow={props.receiveShadow}
        >
            <meshPhongMaterial attach="material" color={props.color}/>
        </mesh>
    );
}