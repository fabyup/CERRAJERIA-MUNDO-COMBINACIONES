// Importa la clase "Servicio" desde otro archivo JavaScript
import { ServicioDOM } from "./ServicioDOM.js";
import { Servicio } from "./Servicio.js";

document.addEventListener("DOMContentLoaded", () => {
  /**
   * Lista de servicios predefinidos.
   */
  const servicios = [
    new Servicio(
      "Apertura de puertas",
      "Servicio rápido y eficiente para abrir cualquier tipo de puerta.",
      "abriendo puerta 1.jpg"
    ),
    new Servicio(
      "Cambio de cerraduras",
      "Instalación y cambio de cerraduras para mayor seguridad.",
      "cambiar cerradura-imgEs20230315012353Peq.jpg"
    ),
    new Servicio(
      "Duplicado de llaves",
      "Realizamos duplicados de llaves en el acto.",
      "keys-8877747_640.png"
    ),
    new Servicio(
      "Apertura de autos",
      "Trabajos con eficiencia.",
      "istockphoto-1137285203-612x612 apertura de autos.jpg"
    ),
    new Servicio(
      "Apertura de cajas fuertes",
      "Reparación de cajas fuertes.",
      "caja fuerte.png"
    )
  ];

  // Selecciona el contenedor donde estarán las tarjetas del carrusel
  const carouselCards = document.getElementById("carousel-cards");

  // Llena el carrusel con tarjetas de servicios
  servicios.forEach(servicio => {
    const card = ServicioDOM.crearTarjeta(servicio);
    card.classList.add("carousel-card");
    carouselCards.appendChild(card);
  });

  // Manejo del formulario de contacto
  document
    .getElementById("form-contacto")
    .addEventListener("submit", async event => {
      event.preventDefault();

      // Obtener los valores del formulario
      const nombre = document.getElementById("nombre").value;
      const telefono = document.getElementById("telefono").value;
      const mensaje = document.getElementById("mensaje").value;

      try {
        // Enviar los datos al servidor con fetch
        const response = await fetch("http://localhost:3000/api/contacto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ nombre, telefono, mensaje })
        });

        if (response.ok) {
          alert("Mensaje enviado con éxito");
          document.getElementById("form-contacto").reset();
        } else {
          const errorData = await response.json();
          alert("Error al enviar el mensaje: " + errorData.error);
        }
      } catch (error) {
        alert("Error de conexión: " + error.message);
        console.error("Error al enviar el formulario:", error);
      }
    });

  // Función para actualizar la posición del carrusel
  let indiceActual = 0;
  function actualizarCarrusel() {
    const anchoTarjeta = document.querySelector(".carousel-card").offsetWidth;
    carouselCards.style.transform = `translateX(-${indiceActual *
      anchoTarjeta}px)`;
  }

  // Función para mostrar la tarjeta anterior
  window.slideAnterior = function() {
    if (indiceActual > 0) {
      indiceActual--;
      actualizarCarrusel();
    }
  };

  // Función para mostrar la tarjeta siguiente
  window.slideSiguiente = function() {
    if (indiceActual < servicios.length - 1) {
      indiceActual++;
      actualizarCarrusel();
    }
  };

  // Evento para ajustar el carrusel en caso de cambio de tamaño de la ventana
  window.addEventListener("resize", actualizarCarrusel);

  // Función para mostrar los mensajes de contacto almacenados en LocalStorage
  const displayMessages = () => {
    const messagesDisplay = document.getElementById("messages-display");
    messagesDisplay.innerHTML = ""; // Limpia el contenedor de mensajes antes de mostrar

    // Recupera las entradas guardadas en LocalStorage o inicializa un array vacío si no existen
    const savedEntries = JSON.parse(localStorage.getItem("formEntries")) || [];

    // Itera sobre cada mensaje y lo agrega al contenedor de visualización
    savedEntries.forEach((entry, index) => {
      const entryDiv = document.createElement("div");
      entryDiv.classList.add("message-entry");

      entryDiv.innerHTML = `
        <p><strong>Nombre:</strong> ${entry.nombre}</p>
        <p><strong>Teléfono:</strong> ${entry.telefono}</p>
        <p><strong>Mensaje:</strong> ${entry.mensaje}</p>
        <button onclick="deleteMessage(${index})">Eliminar</button>
        <hr>
      `;

      messagesDisplay.appendChild(entryDiv);
    });
  };

  // Escucha el envío del formulario de contacto, guarda los datos en LocalStorage y actualiza la visualización
  document.getElementById("form-contacto").addEventListener("submit", e => {
    e.preventDefault();

    // Captura de los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const mensaje = document.getElementById("mensaje").value;

    // Validación para asegurar que todos los campos están completos
    if (!nombre || !telefono || !mensaje) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Crea un objeto que contiene los datos del formulario
    const formData = { nombre, telefono, mensaje };

    // Recupera las entradas existentes en LocalStorage o inicializa un array vacío si no existen
    const formEntries = JSON.parse(localStorage.getItem("formEntries")) || [];

    // Añade la nueva entrada al array de entradas
    formEntries.push(formData);

    // Guarda el array actualizado en LocalStorage
    localStorage.setItem("formEntries", JSON.stringify(formEntries));

    // Muestra una alerta de confirmación al usuario
    alert(
      `¡Gracias, ${nombre}! Nos pondremos en contacto al ${telefono} pronto.`
    );

    // Limpia los campos del formulario
    document.getElementById("form-contacto").reset();

    // Llama a displayMessages para actualizar la visualización con el nuevo mensaje
    displayMessages();
  });

  // Función para eliminar un mensaje de contacto específico tanto de LocalStorage como del DOM
  window.deleteMessage = function(index) {
    // Recupera las entradas de LocalStorage
    let formEntries = JSON.parse(localStorage.getItem("formEntries")) || [];

    // Elimina la entrada especificada por el índice en el array
    formEntries.splice(index, 1);

    // Guarda el array actualizado en LocalStorage
    localStorage.setItem("formEntries", JSON.stringify(formEntries));

    // Llama a displayMessages para actualizar la visualización después de la eliminación
    displayMessages();
  };

  // Función para mostrar los mensajes si se ingresa la contraseña correcta
  function mostrarMensajes() {
    const password = document.getElementById("password").value;

    if (password === "") {
      document.getElementById("messages-display").style.display = "block";
      displayMessages();
    } else {
      alert("Contraseña incorrecta");
    }
  }
  window.mostrarMensajes = mostrarMensajes;

  // Llama a displayMessages al cargar la página para mostrar mensajes guardados
  displayMessages();
});
