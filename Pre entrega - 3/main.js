class Alumno {
    constructor(nombre, edad, calificacion) {
      this.nombre = nombre
      this.edad = edad
      this.calificacion = calificacion
    }
}

const alumnos = []
const notas = []

let botonEnviar = document.getElementById("boton")
let inputNombreError = document.getElementById("input-1_error")
let inputEdadError = document.getElementById("input-2_error")
let inputCalificacionError = document.getElementById("input-3_error")

function mostrarResultados() {
  let mostrarNombres = document.getElementById("mostrar-nombres")
  let mostrarEdades = document.getElementById("mostrar-edades")
  let mostrarNotas = document.getElementById("mostrar-notas")

  mostrarNombres.innerHTML = "<h4>Nombre de los alumnos:</h4>"
  mostrarEdades.innerHTML = "<h4>Edad de los alumnos:</h4>"
  mostrarNotas.innerHTML = "<h4>Notas de los alumnos:</h4>"

  let alumnosAlmacenados = JSON.parse(sessionStorage.getItem("alumnos"))
  if (alumnosAlmacenados) {
    alumnosAlmacenados.forEach(function (alumno) {
      let nombreItem = document.createElement("p")
      nombreItem.textContent = alumno.nombre
      mostrarNombres.appendChild(nombreItem)

      let edadItem = document.createElement("p")
      edadItem.textContent = alumno.edad
      mostrarEdades.appendChild(edadItem)

      let notaItem = document.createElement("p")
      notaItem.textContent = alumno.calificacion
      mostrarNotas.appendChild(notaItem)
    })
  }
}

botonEnviar.addEventListener("click", function (validarInputs) {
  validarInputs.preventDefault()
  
  let inputNombre = document.getElementById("input-nombre")
  let inputEdad = document.getElementById("input-edad")
  let inputCalificacion = document.getElementById("input-nota")

  let nombre = inputNombre.value
  let edad = parseInt(inputEdad.value)
  let calificacion = parseFloat(inputCalificacion.value)

  if( nombre !== "" && !isNaN(edad) && !isNaN(calificacion)){
    const nuevoAlumno = new Alumno(nombre, edad, calificacion)
    alumnos.push(nuevoAlumno)
    notas.push(calificacion)

    inputNombre.value = ""
    inputEdad.value = ""
    inputCalificacion.value = ""

    inputNombreError.innerHTML = ""
    inputEdadError.innerHTML = ""
    inputCalificacionError.innerHTML = ""

    sessionStorage.setItem("alumnos", JSON.stringify(alumnos))
    sessionStorage.setItem("notas", JSON.stringify(notas))

    mostrarResultados()
  } else {
    if (nombre === "") {
      inputNombreError.innerHTML = "<p>Error! debe completar este campo</p>"
    } else {
      inputNombreError.innerHTML = ""
    }
    if (isNaN(edad)){
      inputEdadError.innerHTML = "<p>Error! debe completar este campo</p>"
    } else {
      inputEdadError.innerHTML = ""
    }
    if (isNaN(calificacion)){
      inputCalificacionError.innerHTML = "<p>Error! debe completar este campo</p>"
    } else {
      inputCalificacionError.innerHTML = ""
    }
  }
})