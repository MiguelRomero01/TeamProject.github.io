fetch('/layouts/navbar-aptos.html')
          .then(response => response.text())
          .then(data => {
              document.getElementById('navBar-placeholder').innerHTML = data;
          })
          .catch(error => console.error('Error al cargar el navbar:', error));