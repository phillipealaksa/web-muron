window.onload = function () {
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
        (function (className) {
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
          div.onmouseenter = function () {
            this.style.backgroundColor = "rgba(0,0,0,0.4)";
          };
          div.onmouseleave = function () {
            this.style.backgroundColor = "rgba(0,0,0,0)";
          };
          div.onclick = function () {
            showClass(className);
          };
          div.id = className;
          div.innerHTML = className;
          document.getElementById("class-container").appendChild(div);
          var deleteIcon = document.createElement("img");
          deleteIcon.src = "images/remove.png";
          deleteIcon.style.position = "absolute";
          deleteIcon.style.top = "0";
          deleteIcon.style.right = "0";
          deleteIcon.style.width = "40px";
          deleteIcon.style.height = "40px";
          deleteIcon.style.cursor = "pointer";
          deleteIcon.onclick = function (event) {
            event.stopPropagation();
            if (confirm("Are you sure you want to delete this class?")) {
              data.classes.splice(data.classes.indexOf(className), 1);
              fetch('jswriteFile.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: JSON.stringify(data), filePath: 'data/profile.json' })
              })
              fetch("jsdeleteFile.php", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ path: 'data/classes/' + className, type: 'dir' })
              })
                .then((response) => {
                  if (!response.ok) {
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
          document.getElementById(className).appendChild(deleteIcon);
        })(c);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}


function addClass() {
  var className;
  fetch('data/profile.json', { cache: 'no-store' })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      classes = data.classes;
      while (true) {
        className = prompt("Please enter the name of the class:");
        if (classes.includes(className)) {
          alert("Class already exists!");
        } else {
          break;
        }
      }
      data.classes.push(className);

      fetch('jswriteFile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: JSON.stringify(data), filePath: 'data/profile.json' })
      })
      location.reload();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function showClass(c) {
  localStorage.setItem('selectedClass', c);
  window.location.href = "class.html";
}