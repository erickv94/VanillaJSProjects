const form=document.getElementById('generar-nombre');

const generarNombres=(e)=>{
    e.preventDefault();
    let requestDatos=recuperarDatosForm(e.target);
    let url= generarURL(requestDatos);

    console.log(url);


    //XMLHTTP
//    cargadoPorXMLHTTP(url);
    
    //FETCH API

  /*  fetch(url)
    .then((response)=>{
        return response.json();
    })
    .then((json)=>{
        responseHTML(json);
    })
    .catch((error)=>{
        console.log(error);
    })
    */

    //FUNCION ASYNCRONA CON FETCH API
    
    FuncionAsync(url).then((nombres)=>{

        responseHTML(nombres);
    }).catch((error)=>console.log(error));

    console.log('es asincrono');
}
const recuperarDatosForm=(elemento)=>{
    const pais= elemento.querySelector('#origen');
    const paisSeleccionado=pais.options[pais.selectedIndex].value;
    const genero=elemento.querySelector('#genero');
    const generoSeleccionado=genero.options[genero.selectedIndex].value;
    const cantidad= elemento.querySelector("#numero").value;
    
    const min=elemento.querySelector('#min').value; 
    const max=elemento.querySelector('#max').value;
    
    return {
        pais:paisSeleccionado,
        genero:generoSeleccionado,
        cantidad:cantidad,
        min:min,
        max:max
    };
}


const  generarURL=(request)=>{
     let URL="https://uinames.com/api/?";
     let {pais,genero,cantidad,min,max}=request;

    URL+=(pais?`region=${pais}&`:``);
    URL+=(genero?`gender=${genero}&`:``);
    URL+=(cantidad?`amount=${cantidad}&`:``);
    URL+=(min?`minlen=${min}&`:``);
    URL+=(max?`maxlen=${max}&`:``);

    return URL;
}

const cargadoPorXMLHTTP=(url)=>{
    const xhr= new XMLHttpRequest();

    xhr.open('GET',url,true);

    //override
    xhr.onload=function(){
    
        if(this.status===200){
            let responseJSON=JSON.parse(this.responseText);
            responseHTML(responseJSON);
        }
        
    }

    xhr.send();
}

const responseHTML=(nombres)=>{

    //posibles uls
    let uls= document.querySelectorAll('#resultado > ul')
     
    //limpia de busqueda anterior
    uls.forEach((e)=>e.remove());

    const ul= document.createElement('ul');
    ul.classList.add('lista');
    
    nombres.forEach((nombre)=>{
        const li=document.createElement('li');
        li.textContent=nombre.name;
        ul.appendChild(li);
    });

    document.getElementById('resultado').appendChild(ul);

};

async function FuncionAsync(url){
    const response= await fetch(url);

    const jsonPromesa= await  response.json();
    return jsonPromesa;
}

form.addEventListener('submit',generarNombres);


