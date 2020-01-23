window.onload = function() 
{
    document.querySelector('#file-input').onchange = () => {
        const files = document.querySelector('#file-input').files;
        const file = files[0];
        if(file == null)
            return alert('No File Selected');
        Array.from(files).forEach(file => {
            console.log(file);
            getSignedRequest(file);
        })
    }

    function getSignedRequest(file) {

        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/admin/sign?file-name=${file.name}&file-type=${file.type}`);
        xhr.onreadystatechange = () => {

            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    uploadFile(file, response.signedRequest, response.url)
                }
            }
        }
        xhr.send();

    }

    function uploadFile(file, signedRequest, url){
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                console.log(xhr.responseText)
                if(xhr.status === 200) {
                    
                    let obj = {};
                    obj.name = file.name;
                    obj.path = url;
                    obj.type = file.type;

                    document.getElementById('content').value += `|${JSON.stringify(obj)}`;
                }
                else {
                    alert('file not uploaded');
                }
            }
        }
        xhr.send(file);
    }
}