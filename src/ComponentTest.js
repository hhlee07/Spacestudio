import React  from "react";
import { Box } from '@mui/material';
import { OrbitControls, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import OutdoorViewModel from './components/SpaceComponentDef';

// OutdoorViewModel : 실외 공간 생성 컴포넌트
// city : 생성하려는 지역 (구미동, 금천동 등); object : 생성하려는 요소 (건물, 도로, 강 등)

export default function App() {

    return (
        <Box sx={{ width: '100vw', height: '100vh' }}>
            <Canvas
            style={{ background: "white" }}
            camera={{ position: [0, 5, 10] }}
            id="canvas"
            >
                <OrbitControls />
                <ambientLight intensity={0.1} />

                <OutdoorViewModel city={'geumgok'} object={'도로'}/>

                <Plane
                    receiveShadow={true}
                    position={[0, -0.01, 0]} // 강, 도로 보다 살짝 아래로 위치 시키기
                    rotation={[- Math.PI / 2, 0, 0]}
                    args={[1000, 1000]}
                >
                    <meshStandardMaterial color="white" />
                </Plane>
                <directionalLight
                    castShadow
                    shadow-mapSize-height={10240}
                    shadow-mapSize-width={10240}
                    shadow-camera-left={-1000}
                    shadow-camera-right={1000}
                    shadow-camera-bottom={-1000}
                    shadow-camera-top={1000}
                    shadow-camera-near={0.1}
                    shadow-camera-far={1000}
                    shadow-radius={5}
                    shadow-blurSamples={5}
                    position={[15, 22, 10]}
                    intensity={1} />
                
            </Canvas>
        </Box>
    )
} 
