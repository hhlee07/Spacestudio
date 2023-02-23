import { useFrame } from '@react-three/fiber';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/Context';
import * as THREE from "three";

// make 2 boxes and check collision
//scene.add로 부르기or return 형태로 바꾸기

// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshPhongMaterial({ color: 0xff0000 })
// );
// cube1.position.set(3, 0, 0)
// let cube1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
// cube1BB.setFromObject(cube1);

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshPhongMaterial({ color: 0xff0000 })
// );
// cube2.position.set(-3, 0, 0)
// let cube2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
// cube2BB.setFromObject(cube2);
import { Vector2, Color, ExtrudeBufferGeometry, Shape } from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils';


function dummyBuilding() {
    let points = [];

    points.push(new Vector2(-10, -5));
    points.push(new Vector2(-10, 5));
    points.push(new Vector2(10, 5));
    points.push(new Vector2(10, -5));
    points.push(new Vector2(-10, -5));

    const geom = new ExtrudeBufferGeometry(new Shape(points), {
        depth: 40,
        steps: 1,
        material: 0,
        extrudeMaterial: 1,
        bevelEnabled: false
    }).rotateX(-0.5 * Math.PI);

    var geometry = BufferGeometryUtils.mergeBufferGeometries([geom], true);
    geometry.userData.shapes = geom.parameters.shapes;
    geometry.userData.options = geom.parameters.options;

    return geometry;
}


function getFloorShape(geometry) {
    const lineCurves = geometry.userData.shapes.curves;

    // compute mean vector
    let avg = new Vector2(0, 0);
    lineCurves.forEach(line => {
        avg.add(line.v1);
    })
    avg.divideScalar(lineCurves.length);

    let lineSegments = [];
    lineCurves.forEach(line => {
        lineSegments.push([
            new Vector2(line.v1.x - avg.x, line.v1.y - avg.y),
            new Vector2(line.v2.x - avg.x, line.v2.y - avg.y)
        ]);
    })
    return lineSegments;
};


export default observer((props) => {
    const { SidebarStore, PlaymodeStore } = useStores();

    const buildRef = useRef();
    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState(false);

    var velocity = 0;

    const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshPhongMaterial({ color: 0xff0000 })
    );
    cube1.position.set(3, 0, 0)
    let cube1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    cube1BB.setFromObject(cube1);

    function BuildingCollision(geometry, box) {
        let BB = geometry
        console.log(box, "hhhhhhhhhhhhhhhh")
        // let cubeBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        // cubeBB.setFromObject(box);
        if (BB.intersectsBox(box)) {
            box.material.transparent = true
            box.material.opacity = 0.3
        } else {
            box.material.opacity = 1.0
        }

        return box
    }

    useFrame(() =>
        // console.log(cube.current, "abababababa"),
        document.onkeydown = function (e) {
            if (e.keyCode === 37) {
                cube1.current.position.x -= 1;
                cube1BB.copy(cube1.geometry.boundingBox).applyMatrix4(cube1.matrixWorld)
            } else
                if (e.keyCode === 39) {
                    cube1.current.position.x += 1;
                    cube1BB.copy(cube1.geometry.boundingBox).applyMatrix4(cube1.matrixWorld)
                } else
                    if (e.keyCode === 38) {
                        cube1.current.position.z -= 1;
                        cube1BB.copy(cube1.geometry.boundingBox).applyMatrix4(cube1.matrixWorld)
                    } else
                        if (e.keyCode === 40) {
                            cube1.current.position.z += 1;
                            cube1BB.copy(cube1.geometry.boundingBox).applyMatrix4(cube1.matrixWorld)
                        }
        })



    const handleClick = useCallback((event) => {
        event.stopPropagation();

        setSelected(true);
        SidebarStore.selectBuilding(
            buildRef.current.userData.id,
            buildRef.current.buildingname,
            buildRef.current.userData.category,
            buildRef.current.position,
            buildRef.current.rotation,
            buildRef.current.scale,
            getFloorShape(buildRef.current.geometry),
            useFrame(() =>
                BuildingCollision(buildRef.current.boundingbox, cube1)
            )
            // BuildingCollision(buildRef.current.boundingbox, Cube())
        )

        SidebarStore.setcampos(buildRef.current.position.x, buildRef.current.position.y, buildRef.current.position.z)

    }, []);

    //useFrame((_, delta) => {
    //    if (!selected) {
    //        if (active) {
    //            if (buildRef.current.position.y < 0.01) {
    //                velocity = 2;
    //            } else {
    //                velocity -= 0.1;
    //            }
    //            buildRef.current.position.y += velocity * delta;
    //        } else {
    //            buildRef.current.position.y = 0;
    //            velocity = 0;
    //        }
    //    } else {
    //        buildRef.current.position.y = 0;
    //    }
    //})

    useEffect(() => {
        if (selected) {
            //buildRef.current.position.y = 0;
            buildRef.current.material.color = new Color("#48B108");
        } else {
            buildRef.current.material.color = active ? new Color('hotpink') : new Color(props.color);
        }
    }, [selected, active])

    useFrame((_, delta) => {
        if (selected) {
            SidebarStore.update3D(
                buildRef.current.position,
                buildRef.current.rotation,
                buildRef.current.scale,
            )
        }
    })

    return (<>
        <mesh
            key={props.id}
            ref={buildRef}
            userData={{ id: props.id, category: props.category }}
            geometry={props.geometry ? props.geometry : dummyBuilding()}
            position={props.position ? props.position : [0, 0, 0]}
            scale={props.scale ? props.scale : [0.3, 0.3, 0.3]}
            buildingname={props.name}
            name={props.id}
            boundingbox={props.boundingbox}
            castShadow
            receiveShadow
            onPointerOver={(event) => {
                event.stopPropagation();
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
        >
            <meshStandardMaterial
                attach="material"
                color={props.color}
            //map={active ? colorMap : null}
            //map={colorMap}
            />
        </mesh>
        {/* <cube1 /> */}
    </>
    );

})


/* <meshStandardMaterial
    attach="material"
    // color={props.color}
    color={active ? "hotpink" : props.color}
// map={active ? colorMap : null}
// map={colorMap}
/> */

//import { Html } from '@react-three/drei';
//import Button from '@mui/material/Button';
//import Dialog from '@mui/material/Dialog';
//import DialogActions from '@mui/material/DialogActions';
//import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
//import DialogTitle from '@mui/material/DialogTitle';

//<Html>
//<Dialog open={open} onClose={handleClose}>
//    <DialogTitle>공공데이터 업로드</DialogTitle>
//    <DialogContent>
//    <DialogContentText>
//        {buildRef.current.name} 건물의 실내로 들어가겠습니까?
//    </DialogContentText>
//    </DialogContent>
//    <DialogActions>
//    <Button component="label">
//        실내 공간 작업 시작
//    </Button>
//    <Button onClick={handleClose}>취소</Button>
//    </DialogActions>
//</Dialog>
//</Html>