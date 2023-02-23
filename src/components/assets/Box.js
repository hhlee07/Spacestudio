import React, { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { TransformControls, OrbitControls } from "@react-three/drei";

// export default function Box() {
//     const orbit = useRef()
//     const transform = useRef()
//     const { camera, gl } = useThree()
//     const mesh = useRef()

//     // useEffect(() => {
//     //     if (transform.current) {
//     //         const controls = transform.current
//     //         const callback = event => (orbit.current.enabled = !event.value)
//     //         controls.addEventListener('dragging-changed', callback)
//     //         return () => controls.removeEventListener('dragging-changed', callback)
//     //     }
//     // })

//     return (
//         <>
//             <TransformControls ref={transform}>
//                 <mesh ref={mesh}>
//                     <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
//                     <meshNormalMaterial attach="material" />
//                 </mesh>
//             </TransformControls>
//             {/* <OrbitControls ref={orbit} /> */}
//             <OrbitControls makeDefault />
//         </>
//     )
// }

function TransformBox({ position }) {
    const orbit = useRef()
    const transform = useRef()
    const mesh = useRef()

    return (
        <TransformControls
            position={position}
            ref={transform}>
            <mesh ref={mesh}>
                <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
                <meshNormalMaterial attach="material" />
            </mesh>
        </TransformControls>
    )
}

export default function Box() {
    return (
        <>
            <TransformBox />
            <TransformBox position={[6, 0, 0]} />
            <OrbitControls makeDefault />
        </>
    )
}

