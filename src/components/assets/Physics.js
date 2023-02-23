// import React from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import * as THREE from "three";

import React, { useRef, useEffect } from 'react'
import { TransformControls, OrbitControls } from "@react-three/drei";

const positions = [
    [0, 2, 3],
    [-1, 5, 16],
    [-2, 5, -10],
    [0, 12, 3],
    [-10, 5, 16],
    [8, 5, -10]
];

function Marble() {
    const [ref] = useSphere(() => ({
        mass: 10,
        position: [2, 5, 0]
    }));

    const orbit = useRef()
    const transform = useRef()

    useEffect(() => {
        if (transform.current) {
            const controls = transform.current
            const callback = event => (orbit.current.enabled = !event.value)
            controls.addEventListener('dragging-changed', callback)
            return () => controls.removeEventListener('dragging-changed', callback)
        }
    })

    return (
        <>
            <TransformControls ref={transform}>
                <mesh ref={ref} castShadow>
                    <sphereBufferGeometry
                        attach="geometry"
                        args={[1, 32, 32]}
                    ></sphereBufferGeometry>
                    <meshStandardMaterial color="white" />
                </mesh>
            </TransformControls>
            <OrbitControls ref={orbit} />
        </>
    );
}

function Box({ position }) {
    const [ref] = useBox(() => ({
        mass: 10,
        position: position,
        args: [2, 2, 2]
    }));

    return (
        <mesh ref={ref} castShadow>
            <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
            <meshStandardMaterial color="white" />
        </mesh>
    );
}

const Plane = () => {
    const [ref, api] = usePlane(() => ({
        mass: 1,
        position: [0, 0, 0],
        type: "Static",
        rotation: [-Math.PI / 2, 0, 0]
    }));
    useFrame(({ mouse }) => {
        api.rotation.set(-Math.PI / 2 - mouse.y * 0.2, 0 + mouse.x * 0.2, 0);
    });
    return (
        <mesh scale={200} ref={ref} receiveShadow>
            <planeBufferGeometry />
            <meshStandardMaterial color="white" side={THREE.DoubleSide} />
        </mesh>
    );
};

export default function physics() {
    return (
        <>
            <Physics>
                <Marble />
                <Plane />
                {positions.map((position, idx) => (
                    <Box position={position} key={idx} />
                ))}
            </Physics>
        </>
    );
}
