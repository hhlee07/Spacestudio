import React, { useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';


export default function SaveBot(props) {
    const { scene, gl } = useThree();
    const [hovered, setHovered] = useState(false);

    const fontProps = { fontSize: 2.5, lineHeight: 1, 'material-toneMapped': false };
    const over = (e) => (e.stopPropagation(), setHovered(true));
    const out = () => setHovered(false);
    

    const handleClick = () => {
        console.log(scene);
        console.log(props.model);
        //console.log(gl);
        //const exporter = new GLTFExporter();
        //exporter.parse(
        //    scene,
        //    function (result) {
        //        saveArrayBuffer(result, '/results/city.glb');
        //    },
        //    { binary : true }
        //)
    }

    useEffect(() => {
        if (hovered) document.body.style.cursor = 'pointer'
        return () => (document.body.style.cursor = 'auto')
    }, [hovered])

    return (
        <Text 
            color="black" 
            anchorX="center" 
            anchorY="middle"
            {...fontProps}
            position={[0,15,0]}
            scale={0.5}
            onPointerOver={over}
            onPointerOut={out}
            onClick={handleClick}>
            Save!!
        </Text>
    )
}


function saveArrayBuffer(buffer, filename) {
    save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
}

function save(blob, filename) {
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);    
    link.download = filename;
    link.click(); // This step makes sure your glb file gets downloaded
    sendFileToBackend(blob, filename)
}

function sendFileToBackend(blob, filename){
    //const endpoint = window.location.protocol + "//" + window.location.host + filename;
    const endpoint = filename;
    const formData = new FormData();

    let sceneFile= new File([blob], filename);
    console.log(sceneFile)
    formData.append("file", sceneFile);

    const options = {
        method:'POST',
        mode: 'no-cors',
        body: formData,
    }

    fetch(endpoint,options)
        .then(response => console.log(JSON.stringify(response)))
        .catch(error => console.error('Error:', error))

}