import { toJS } from 'mobx';

export default function saveJSON(models, name) {
    console.log(toJS(models));
    //console.log(JSON.stringify(toJS(models)));
    //saveArrayBuffer(JSON.stringify(toJS(models)), '/results/' + name + '.json');
}


function saveArrayBuffer(buffer, filename) {
    save(new Blob([buffer], { type: 'text/plain;charset=utf-8' }), filename);
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