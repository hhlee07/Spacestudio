import React from "react";
import * as THREE from "three";
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

export default function saveGLB(models, name) {
    const scene = mapModelToScene(models);

    const exporter = new GLTFExporter();
    exporter.parse(
        scene,
        function (result) {
            saveArrayBuffer(result, '/results/' + name + '.glb');
        },
        { binary : true }
    )
}

function mapModelToScene(models) {
    let scene = new THREE.Scene();
    //r3f component list -> THREE.scene 에 add
    return scene;
}


function saveArrayBuffer(buffer, filename) {
    //save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
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