let amigos = [];
const listaAmigos = document.getElementById('lista-amigos');
const listaAmigosContainer = document.getElementById('lista-amigos-container');
const resultadoContainer = document.getElementById('resultado-container');

const renderAmigos = () => {
  listaAmigos.innerHTML = '';
  amigos.forEach((amigo, index) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'lista');
    li.innerHTML = `${index + 1}. ${amigo}<button onclick="borrarAmigo(${index})" class="btn btn-small"><img src="assets/borrar.png"></button>`;
    listaAmigos.appendChild(li);
  });
  listaAmigosContainer.style.display = amigos.length > 0 ? 'block' : 'none';
};

function borrarAmigo(index) {
  amigos.splice(index, 1);
  renderAmigos();
}

document.addEventListener('DOMContentLoaded', () => {
  const nuevoAmigoInput = document.getElementById('nuevo-amigo-input');
  const agregarAmigoBtn = document.getElementById('agregar-amigo-btn');
  const sortearBtn = document.getElementById('sortear-btn');
  const loader = document.getElementById('loader');
  const resultado = document.getElementById('resultado');

  listaAmigosContainer.style.display = 'none';

  const agregarAmigo = () => {
    const nombre = nuevoAmigoInput.value.trim();
    const regex = /^[a-zA-Z0-9\s]*$/;
    if (!nombre) {
      alert("Por favor, escribe un nombre.");
      return;
    }
    if (!regex.test(nombre)) {
      alert("El nombre solo puede contener letras, números y espacios.");
      return;
    }
    if (amigos.includes(nombre)) {
      alert("Este nombre ya fue ingresado.");
      return;
    }
    amigos.push(nombre);
    nuevoAmigoInput.value = '';
    resultadoContainer.style.display = 'none';
    renderAmigos();
  };

  const sortearAmigo = async () => {
    if (amigos.length < 2) {
        alert("Necesitas al menos 2 amigos para sortear.");
        return;
    }

    loader.style.display = 'block';
    resultadoContainer.style.display = 'none';
    sortearBtn.disabled = true;

    await new Promise(resolve => setTimeout(resolve, 2000));

    const indiceGanador = Math.floor(Math.random() * amigos.length);
    const ganador = amigos[indiceGanador];

    resultado.innerHTML = `😎 ¡El Amigo Secreto es <strong>${ganador}</strong>!`;
    
    loader.style.display = 'none';
    resultadoContainer.style.display = 'block';
    sortearBtn.disabled = false;
  };

  agregarAmigoBtn.addEventListener('click', agregarAmigo);
  nuevoAmigoInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      agregarAmigo();
    }
  });
  sortearBtn.addEventListener('click', sortearAmigo);
});