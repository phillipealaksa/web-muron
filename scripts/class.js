
window.onload = function() {
    document.querySelector('.header-title').innerHTML = localStorage.getItem('selectedClass');
    document.head.innerHTML += '<title>' + localStorage.getItem('selectedClass') + '</title>';
    document.getElementById('uploadDir').value = '/data/classes/' + localStorage.getItem('selectedClass') + '/';

    fetch("jsscanDir.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ directory: 'data/classes/' + localStorage.getItem('selectedClass') })})
    .then((response) => {
        if(!response.ok){
            throw new Error("Something went wrong!");
        }

        return response.json();
    })
    .then((data) => {
        for(let file in data){
            var div = document.createElement("div");
            div.style.height = "2em";
            div.style.position = "relative";
            div.style.padding = "0";
            div.style.fontSize = "2em";
            div.style.textAlign = "center";
            div.style.border = "solid 2px";
            div.style.borderRadius = "10px";
            div.style.display = "flex";
            div.style.justifyContent = "center";
            div.style.alignItems = "center";
            div.style.cursor = "pointer";
            div.style.flexBasis = "100%";
            
            
            div.onmouseenter = function() {
              this.style.backgroundColor = "rgba(0,0,0,0.4)";
            };
            div.onmouseleave = function() {
              this.style.backgroundColor = "rgba(0,0,0,0)";
            };
            div.onclick = function() {
              var link = document.createElement('a');
              link.download = data[file];
              link.href = 'data/classes/' + localStorage.getItem('selectedClass') + '/' + data[file];  
              link.click();
            };
            div.id = data[file];
            div.innerHTML = data[file];
            document.getElementById("file-container").appendChild(div);
            var deleteIcon = document.createElement("img");
            deleteIcon.src = "images/remove.png";
            deleteIcon.style.position = "absolute";
            deleteIcon.style.top = "0";
            deleteIcon.style.right = "0";
            deleteIcon.style.width = "20px";
            deleteIcon.style.height = "20px";
            deleteIcon.style.cursor = "pointer";
            deleteIcon.onclick = function(event) {
                event.stopPropagation();
                if (confirm("Are you sure you want to delete this file?")) {
                    fetch("jsdeleteFile.php", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ path: 'data/classes/' + localStorage.getItem('selectedClass') + '/' + data[file], type: 'file'})})
                    .then((response) => { 
                        if(!response.ok){
                            throw new Error("Something went wrong!");
                        }
                        return response.json();
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                    location.reload();
                } 
            }
            document.getElementById(data[file]).appendChild(deleteIcon);
        }
})
    .catch((error) => {
        console.error('Error:', error);
    });
}