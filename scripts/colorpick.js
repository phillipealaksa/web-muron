function openNav() {
    document.getElementById("colorpick").style.height = "100%";
}
  
function closeNav() {
    document.getElementById("colorpick").style.height = "0%";
}

function setColvals(){
    var color = getComputedStyle(document.body).getPropertyValue('--main-bg-col');
    document.getElementById("primaryColor").value = color;

    color = getComputedStyle(document.body).getPropertyValue('--main-txt-col')
    document.getElementById("secondaryColor").value = color;

}

function setPrimcol(){
    var color = document.getElementById("primaryColor").value;

    document.documentElement.style.setProperty('--main-bg-col', color);
    
    saveToCSS('--main-bg-col', color);
}

function setSeccol(){
    var color = document.getElementById("secondaryColor").value;

    document.documentElement.style.setProperty('--main-txt-col', color);
    
    saveToCSS('--main-txt-col', color);
}

function saveToCSS(type, color){
    fetch('styles/main.css', { cache: 'no-store' })
                .then(response => response.text())
                .then(cssContent => {
                    if(type === '--main-bg-col'){
                        var updatedCSS = cssContent.replace(/--main-bg-col:\s*#[0-9a-fA-F]{6};/, `${type}: ${color};`);
                    } else if(type === '--main-txt-col'){
                        var updatedCSS = cssContent.replace(/--main-txt-col:\s*#[0-9a-fA-F]{6};/, `${type}: ${color};`);
                    }
                    fetch('jswriteFile.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ content: updatedCSS, filePath: 'styles/main.css' })
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.text();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });

                })
                .catch(error => {
                    console.error('Error fetching CSS:', error);
                });
}