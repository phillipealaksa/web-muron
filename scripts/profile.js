window.onload = function () {
  var container = document.querySelectorAll('.detail');
  container.forEach(function (c) {
    var input = c.querySelectorAll('input');
    setDetails(input[0]);
  });
}; setPic(); setClasses();

function setPic() {
  fetch('data/profile.json', { cache: 'no-store' })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      var img = data.profile_pic;
      document.getElementById('profile_pic').style.backgroundImage = "url('" + img + "')";
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function handlePic(event) {

  fetch('data/profile.json', { cache: 'no-store' })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      var oldpic = data.profile_pic;

      fetch('jsdeleteFile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'filepath=' + encodeURIComponent(oldpic)
      })
        .then(response => {
          if (response.ok) {
            return response.text();
          }
          throw new Error('Network response was not ok.');
        })
        .then(data_php => {
          var jsonf = data;
          jsonf.profile_pic = 'images/' + event.target.files[0].name;

          fetch('jswriteFile.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: JSON.stringify(jsonf), filePath: 'data/profile.json' })
          })
            .then(responsef => {
              if (!responsef.ok) {
                throw new Error('Network response was not ok');
              }

              return responsef.text();
            })
            .catch(error => {
              console.error('Error:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  document.getElementById('imgSubmit').click();

}

function togglePassword(toggle) {
  var input = document.getElementById("password")
  if (toggle) {
    input.type = "text";
  }
  else {
    input.type = "password";
  }
}

function resizeInput(input) {
  input.style.width = 'auto';
  input.style.width = input.scrollWidth + 'px';
}

function updateDetails(input) {
  fetch('data/profile.json', { cache: 'no-store' })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {

      var jsonf = data;
      jsonf[input.id] = input.value

      fetch('jswriteFile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: JSON.stringify(jsonf), filePath: 'data/profile.json' })
      })
        .then(responsef => {
          if (!responsef.ok) {
            throw new Error('Network response was not ok');
          }

          return responsef.text();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function setDetails(input) {
  fetch('data/profile.json', { cache: 'no-store' })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      input.value = data[input.id];
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function setClasses() {
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
          div.style.height = "60%";
          div.style.fontSize = "3em";
          div.style.textAlign = "center";
          div.style.border = "solid";
          div.style.display = "inline-block";
          div.style.cursor = "pointer";
          div.style.flexBasis = "5%";
          div.style.margin = "1%";
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