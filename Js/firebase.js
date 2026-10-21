// Import the functions you need from the SDKs you need
import { initializeApp } from "";
import { getAnalytics } from "";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Capturar u obtener elementos del HTML
const formulario = document.getElementById('formClientes');
const btnEnviar = document.getElementById('btn-enviar');
const mostrarMensaje = document.getElementById('mostrar_mensaje');

formulario.addEventListener('submit', async function(event) {
    event.preventDefault();

    const tipoCliente = document.getElementById('tipo_cliente').value;
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telf = document.getElementById('celular').value;
    const nomEmpresa = document.getElementById('nom_empresa').value;
    const ruc = document.getElementById('ruc').value;
    const motivo = document.getElementById('motivo').value;
    const mensaje = document.getElementById('mensaje').value;

    try {
        btnEnviar.textContent = 'Enviando...';
        btnEnviar.disabled = true;

        await addDoc(collection(db, 'solicitudes'), {
            tipo_cliente: tipoCliente,
            nombre: nombre,
            email: email,
            telf: telf,
            nom_empresa: nomEmpresa,
            ruc: ruc,
            motivo: motivo,
            mensaje: mensaje,
            fecha: serverTimestamp()
        });

        mostrarMensaje.textContent = 'Solicitud enviada correctamente';
        formulario.reset();

    } catch (error) {
        console.error('Error al guardar:', error);
        mostrarMensaje.textContent = 'Error al enviar el mensaje';
    } finally {
        btnEnviar.textContent = 'Enviar consulta';
        btnEnviar.disabled = false;
    }
});