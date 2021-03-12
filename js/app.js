
//variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let  tweets = [];

//event listeners
eventsListeners();
function eventsListeners(){
     formulario.addEventListener('submit',agregarTweet);


     //cuando esta listo el documento
     document.addEventListener('DOMContentLoaded', () =>{

          tweets = JSON.parse(localStorage.getItem('tweets')) || [];

          crearHTML();

     });

}

//funciones


function agregarTweet(e){

     e.preventDefault();

     // localStorage.clear();

     const tweet = document.querySelector('#tweet').value;

     if(tweet === ''){
          mostrarError('No puede ir vacio el tweet');
          return;
     }

     //agregar tweet
     const tweetObj = {
          id: Date.now(),
          tweet,
     }
     
     tweets = [...tweets,tweetObj];

     //agregarhtml
     crearHTML();

     //limpiar formulario

     formulario.reset();

}

function mostrarError(mensaje){

     const mensajeError = document.createElement('P');
     mensajeError.textContent = mensaje;
     mensajeError.classList.add('error');

     //insertar en el contenido

     const contenido = document.querySelector('#contenido');

     contenido.appendChild(mensajeError);

     setTimeout(() => {
          mensajeError.remove();
     }, 3000);    

}


//mostrar listado de tweets

function crearHTML(){

     limpiarHTML(); 

     if(tweets.length > 0){

          tweets.forEach( tweet =>{

               //boton de borrar

               const btnBorrar = document.createElement('A');
               btnBorrar.classList.add('borrar-tweet');
               btnBorrar.textContent = 'X';  

               //asignar funcionalidad

               btnBorrar.onclick = () =>{
                    borrarTweet(tweet.id);
               }

               const li = document.createElement('LI');
               li.textContent = tweet.tweet;

               //asginar boton

               li.appendChild(btnBorrar);

               listaTweets.appendChild(li);

          })

     }

     sincronizarStorage();

}

function limpiarHTML(){

     while(listaTweets.firstChild){
          listaTweets.removeChild(listaTweets.firstChild);
     }

}

function sincronizarStorage(){

     //cuando se agrega un nuevo tweet
     localStorage.setItem('tweets',JSON.stringify(tweets) );     

}


//borrar 

function borrarTweet(id){

     tweets = tweets.filter( tweet => tweet.id !== id);

     crearHTML();

}