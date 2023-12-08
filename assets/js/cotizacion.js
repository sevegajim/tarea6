function calcularCotizacion() {
    // Obtenemos los valores ingresados por el usuario
    const salarioNeto = parseFloat(document.getElementById('salarioNeto').value);
    const tasaInteresAnual = parseFloat(document.getElementById('tasaInteres').value) / 100;
    const plazoAnios = parseInt(document.getElementById('plazoAnios').value);
    const valorVivienda = parseFloat(document.getElementById('valorVivienda').value);
    const montoSolicitar = parseFloat(document.getElementById('montoSolicitar').value);
  
    // Calculamos el plazo en meses
    const plazoMeses = plazoAnios * 12;
  
    // Calculamos la tasa de interés mensual
    const tasaInteresMensual = tasaInteresAnual / 12;
  
    // Calculamos el monto del pago mensual
    const denominador = Math.pow(1 + tasaInteresMensual, plazoMeses);
    const pagoMensual = (montoSolicitar * tasaInteresMensual * denominador) / (denominador - 1);
  
    // Mostramos el resultado del cálculo en el formulario
    document.getElementById('resultadoCotizacion').innerHTML = `
      <h4>Resultado de la Cotización:</h4>
      <p>Monto de pago mensual: $${pagoMensual.toFixed(2)}</p>
    `;
  
    // Calculamos el monto de salario mínimo requerido
    const salarioMinimoRequerido = pagoMensual / 0.40;
  
    // Mostramos si el salario es suficiente para el crédito o no
    const salarioSuficiente = salarioNeto >= salarioMinimoRequerido;
    document.getElementById('salarioSuficiente').innerHTML = `
      <h4>Resultados de Evaluación de Crédito:</h4>
      <p>Monto de salario mínimo requerido: $${salarioMinimoRequerido.toFixed(2)}</p>
      <p>Monto de salario ${salarioSuficiente ? 'suficiente' : 'insuficiente'} para el crédito</p>
    `;
  
    // Calculamos la edad del cliente
    const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  
    // Mostramos si el cliente califica por edad
    const calificaEdad = edad > 22 && edad < 55;
    document.getElementById('clienteEdad').innerHTML = `
      <h4>Evaluación de Edad del Cliente:</h4>
      <p>${calificaEdad ? 'Cliente con edad suficiente para crédito' : 'Cliente no califica para crédito por edad'}</p>
    `;
  
    // Calculamos el porcentaje a financiar
    const porcentajeFinanciar = (montoSolicitar / valorVivienda) * 100;
  
    // Mostramos el porcentaje a financiar
    document.getElementById('porcentajeFinanciar').innerHTML = `
      <h4>Porcentaje a Financiar:</h4>
      <p>${porcentajeFinanciar.toFixed(2)}%</p>
    `;
  }
  
  function guardarDatosLocalStorage() {
    // Obtenemos los valores ingresados por el usuario
    const email = document.getElementById('email').value;
    const nombre = document.getElementById('nombre').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const salarioNeto = document.getElementById('salarioNeto').value;
    const tasaInteres = document.getElementById('tasaInteres').value;
    const plazoAnios = document.getElementById('plazoAnios').value;
    const valorVivienda = document.getElementById('valorVivienda').value;
    const montoSolicitar = document.getElementById('montoSolicitar').value;
  
    // Creamos un objeto con los datos a guardar
    const datos = {
      email,
      nombre,
      fechaNacimiento,
      salarioNeto,
      tasaInteres,
      plazoAnios,
      valorVivienda,
      montoSolicitar,
    };
  
    // Obtenemos los datos previamente guardados en LocalStorage
    const datosGuardados = localStorage.getItem('datosGuardados');
    let datosArray = [];
    if (datosGuardados) {
      datosArray = JSON.parse(datosGuardados);
    }
  
    // Agregamos los nuevos datos al array
    datosArray.push(datos);
  
    // Guardamos el array actualizado en LocalStorage
    localStorage.setItem('datosGuardados', JSON.stringify(datosArray));
  
    alert('Cotización calculada y datos guardados en LocalStorage');
  }
  
  function cargarDatosDesdeLocalStorage() {
    document.getElementById('email').value = localStorage.getItem('email') || '';
    document.getElementById('nombre').value = localStorage.getItem('nombre') || '';
    document.getElementById('fechaNacimiento').value = localStorage.getItem('fechaNacimiento') || '';
    document.getElementById('salarioNeto').value = localStorage.getItem('salarioNeto') || '';
    document.getElementById('tasaInteres').value = localStorage.getItem('tasaInteres') || '7.10';
    document.getElementById('plazoAnios').value = localStorage.getItem('plazoAnios') || '20';
    document.getElementById('valorVivienda').value = localStorage.getItem('valorVivienda') || '';
    document.getElementById('montoSolicitar').value = localStorage.getItem('montoSolicitar') || '';
  }
  
  function cargarDatosEnTabla() {
    const tabla = document.getElementById('tablaDatosGuardados').getElementsByTagName('tbody')[0];
    const datosGuardados = localStorage.getItem('datosGuardados');
    if (datosGuardados) {
      const datos = JSON.parse(datosGuardados);
      // Limpiamos la tabla antes de cargar los datos
      tabla.innerHTML = '';
      datos.forEach((dato) => {
        const row = tabla.insertRow();
        row.innerHTML = `
          <td>${dato.email}</td>
          <td>${dato.nombre}</td>
          <td>${dato.fechaNacimiento}</td>
          <td>${dato.salarioNeto}</td>
          <td>${dato.tasaInteres}</td>
          <td>${dato.plazoAnios}</td>
          <td>${dato.valorVivienda}</td>
          <td>${dato.montoSolicitar}</td>
        `;
      });
    }
  }
  
  // Agregamos el evento click al botón "Calcular" para llamar a la función calcularCotizacion()
  document.getElementById('calcularButton').addEventListener('click', function() {
    calcularCotizacion();
    guardarDatosLocalStorage();
    cargarDatosEnTabla();
  });
  
  // Cargamos los datos del LocalStorage al cargar la página (si existen)
  window.onload = function () {
    
    cargarDatosEnTabla();
  };



  function actualizarPlazoAniosValue() {
    const plazoAniosValue = document.getElementById('plazoAniosValue');
    const plazoAnios = document.getElementById('plazoAnios').value;
    plazoAniosValue.innerText = plazoAnios;
  }


  function interes(tasaMensual, mes, pagoMensual, montoSolicitado) {
    var vInteres = 0;
    var amortiza = montoSolicitado;
    for (var i = 1; i <= mes; i++) {
      vInteres = amortiza * (tasaMensual / 100);
      amortiza = amortiza - (pagoMensual - vInteres);
    }
    return vInteres;
  }

  // Función para mostrar la proyección de pagos en la tabla
  function mostrarProyeccion() {
    const tabla = document.getElementById('tablaProyeccion').getElementsByTagName('tbody')[0];

    // Obtenemos los valores ingresados por el usuario
    const tasaInteresMensual = parseFloat(document.getElementById('tasaInteres').value) / 100;
    const plazoMeses = parseInt(document.getElementById('plazoAnios').value) * 12;
    const pagoMensual = parseFloat(document.getElementById('resultadoCotizacion').innerText.match(/\d+\.\d+/)[0]);
    const montoSolicitado = parseFloat(document.getElementById('montoSolicitar').value);

    // Limpiamos la tabla antes de cargar los datos
    tabla.innerHTML = '';

    // Creamos las filas de la tabla con los datos calculados
    var saldo = montoSolicitado;
    for (let mes = 1; mes <= plazoMeses; mes++) {
      const vInteres = interes(tasaInteresMensual, mes, pagoMensual, saldo);
      const amortiza = pagoMensual - vInteres;
      saldo -= amortiza;

      const row = tabla.insertRow();
      row.innerHTML = `
        <td>${mes}</td>
        <td>$${pagoMensual.toFixed(2)}</td>
        <td>$${vInteres.toFixed(2)}</td>
        <td>$${amortiza.toFixed(2)}</td>
        <td>$${saldo.toFixed(2)}</td>
      `;
    }
  }