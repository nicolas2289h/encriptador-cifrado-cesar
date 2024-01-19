let btnEncriptar = document.getElementById('btn-encriptar')
let btnDesencriptar = document.getElementById('btn-desencriptar')
let btnAdaptar = document.getElementById('btn-adaptar')
let btnCopiar = document.getElementById('btn-copiar')

let resultado = document.querySelector('.encriptador-resultado').firstElementChild
let text = document.getElementById('textarea')
let acentos = /[áéíóú]/
let simbolos = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/

function validarCampo(textValue){
    if(textValue == ''){
        // alert
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'Texto vacio!!!'
        })

        text.value = ''
        text.focus()
        return false
    }
    return true
}

function validarCaracteres(textValue){
  for (let i = 0; i < textValue.length; i++) {
    if(textValue[i] == ' '
        || !isNaN(textValue[i])
        || textValue[i].match(simbolos)){  //sino compara con uppercase y da true
        continue
    }else if(textValue[i] === textValue[i].toUpperCase()
        || textValue[i].match(acentos)){

        // alert
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 4100,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'El texto debe estar en minusculas y sin acentos. Seleccione \"Adaptar\"'
        })
        return false
    }
  }
  return true
}


function descifradoCesar(texto) {
    let array = [...texto]
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'
    let arrayAlphabet = [...alphabet]
    let newtexto = []
  
    for(let i = 0; i < array.length; i++){
      let posicion = arrayAlphabet.indexOf(array[i])
      
      if(array[i] != ' ' && posicion != -1){
        posicion += 13
  
        if(posicion >= 26){
          posicion -= 26
        }
        newtexto.push(arrayAlphabet[posicion])
      }else if(array[i] == ' '){
        newtexto.push(' ')
      }else{
        newtexto.push(array[i])
      }
    }
  
    return newtexto.join('')
}


function cifradoCesar(texto) {
    let array = [...texto]
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'
    let arrayAlphabet = [...alphabet]
    let newtexto = []
  
    for(let i = 0; i < array.length; i++){
      let posicion = arrayAlphabet.indexOf(array[i])
      
      if(array[i] != ' ' && posicion != -1){
        posicion -= 13
  
        if(posicion < 0){
          posicion += 26
        }
        newtexto.push(arrayAlphabet[posicion])
      }else if(array[i] == ' '){
        newtexto.push(' ')
      }else{
        newtexto.push(array[i])
      }
    }
  
    return newtexto.join('')
}


function encriptar(){
    let textValue = text.value.trim()

    if(validarCampo(textValue)){
      if(validarCaracteres(textValue)){
        let encriptador = document.querySelector('.encriptador')
        let encriptadorResultado = document.querySelector('.encriptador-resultado')
        encriptador.classList.add('desplazar')
        encriptadorResultado.classList.add('mostrar')
        // muestra el texto encriptado
        let textoCifrado = cifradoCesar(textValue)
        resultado.textContent = textoCifrado
        
        window.location = '#container-encriptador'
      }
    }
}

function desencriptar(){
    let textValue = text.value.trim()

    if(validarCampo(textValue)){
        if(validarCaracteres(textValue)){
          let encriptador = document.querySelector('.encriptador')
          let encriptadorResultado = document.querySelector('.encriptador-resultado')
          encriptador.classList.add('desplazar')
          encriptadorResultado.classList.add('mostrar')
          // muestra el texto encriptado
          let textoCifrado = descifradoCesar(textValue)
          resultado.textContent = textoCifrado
          
          window.location = '#container-encriptador'
        }
    }
}

function adaptar(){
    let textValue = text.value.trim().toLowerCase()
    if(validarCampo(textValue)){
        let textNormalized = textValue.replaceAll('á','a').replaceAll('é','e').replaceAll('í','i').replaceAll('ó','o').replaceAll('ú','u')
        // console.log(textNormalized)
        text.value = textNormalized

        // alert
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Texto Adaptado!!!'
        })
    }
    
}

function copiarTexto(){
    if(resultado.textContent == ''){
        // alert
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'No hay texto para copiar!!!'
        })

    }else{
        navigator.clipboard.writeText(resultado.innerHTML)
        // alert
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2200,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Texto copiado y listo para pegar!!!'
        })

        // text.focus()
    }
}

btnEncriptar.addEventListener('click', encriptar)
btnDesencriptar.addEventListener('click', desencriptar)
btnAdaptar.addEventListener('click', adaptar)
btnCopiar.addEventListener('click', copiarTexto)
