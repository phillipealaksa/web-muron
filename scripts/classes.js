window.onload = function(){
    var classes = [];

    fetch('data/profile.json', { cache: 'no-store' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        classes = data.classes;
  
        
        for (let c of classes) {
          (function(className) {
            var div = document.createElement("div");
            div.style.height = "45%";
            div.style.position = "relative";
            div.style.fontSize = "10em";
            div.style.textAlign = "center";
            div.style.border = "solid 2px";
            div.style.borderRadius = "10px";
            div.style.display = "flex";
            div.style.justifyContent = "center";
            div.style.alignItems = "center";
            div.style.cursor = "pointer";
            div.style.flexBasis = "30%";
            div.onmouseenter = function() {
              this.style.backgroundColor = "rgba(0,0,0,0.4)";
            };
            div.onmouseleave = function() {
              this.style.backgroundColor = "rgba(0,0,0,0)";
            };
            div.id = className;
            div.innerHTML = className;
            document.getElementById("class-container").appendChild(div);
          })(c);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });   
}