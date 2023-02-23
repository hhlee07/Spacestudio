import axios from 'axios'


function RequestHttp(event, reqdata) {
    for (let i = 0; i < event.target.files.length; i++){
        if (event.target.files[i]) {
            let form = new FormData();

            switch (reqdata) {

                case 'SPACECREATE':
                    // 파일 처리
                    form.append('user_id', 'Reacttester');
                    form.append('geojsonfile', event.target.files[i], 'space.geojson');

                    axios.post('../../data', form)
                        .then(response => {
                            if (response.data.checkfrontface == 'success'){
                                console.log(response.data)
                            }
                            else{
                                console.log('No space data')    
                            }
                        })
                        .catch(error => {
                            console.log('failed', error)
                        })
                    break;


                case 'FACECREATE':
                    // 파일 처리
                    form.append('user_id', 'Reacttester');
                    form.append('imgfile', event.target.files[i], 'imagefile.jpg');

                    axios.post('/local/checkfrontface', form)
                        .then(response => {
                            if (response.data.checkfrontface == 'success'){
                                console.log(response.data)
                            }
                            else{
                                console.log('No front face')    
                            }
                        })
                        .catch(error => {
                            console.log('failed', error)
                        })
                    break;
                
                
                
                default:
                    break;
            }

            

    }
    }

}

export default RequestHttp
