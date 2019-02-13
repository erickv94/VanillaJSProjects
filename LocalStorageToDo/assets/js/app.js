const listaTareas= document.getElementById('lista-tareas');

const fnEventListeners=()=>{
    document.getElementById('formulario').addEventListener('submit',agregarTarea);

    listaTareas.addEventListener('click',eliminarTarea);

    document.addEventListener('DOMContentLoaded',cargarLocalStorage)
}   

const agregarTarea=(e)=>{
    e.preventDefault();

    //obtener valor del input
    const tarea= document.getElementById('tarea').value;

    //validar
    if(!validarTarea(tarea)){
        return;   
    }
    

    //crear el boton borrar
    const btnBorrar =document.createElement('a');

    //agregar clase
    btnBorrar.className='btn-borrar';
    btnBorrar.textContent=" X";

    //crear elemento de la lista
    const li= document.createElement('li');   
    //ingresar el contenido como parte del texto
    li.textContent=tarea;
    //introducir <a> en <li>
    li.appendChild(btnBorrar);
    //introducir li en la lista de tareas
    listaTareas.appendChild(li);

    almacenarLocalStorage(tarea);

}

const validarTarea=(tarea)=>{

    tareas=obtenerTareasLocalStorage();
    
    if(!tarea){
        alert('Tarea vacia');    
        return false;
    }

    tareas.forEach((t,index)=>{
        if(t===tarea){

            alert('Tarea existente en el local storage');    
            return ;
        }
    })
    return true;
}

const almacenarLocalStorage=(tarea)=>{
    const tareas=obtenerTareasLocalStorage();
    
    tareas.push(tarea);

    localStorage.setItem('tareas',JSON.stringify(tareas));
}


const obtenerTareasLocalStorage=()=>{
    let tareas;

    if(!localStorage.getItem('tareas')){// si no tiene en local storage
        tareas=[];
        
    }else
    {
        tareas=JSON.parse(localStorage.getItem('tareas'));
    }

    return tareas;
}

const eliminarTarea=(e)=>{
    if(e.target.className=='btn-borrar'){
        e.target.parentElement.remove();

        const indiceEtiqueta=e.target.parentElement.innerHTML.indexOf('<');
        const tarea=e.target.parentElement.innerHTML.slice(0,indiceEtiqueta);

        eliminarLocalStorage(tarea);

    }
        
}   

const eliminarLocalStorage=(tarea)=>{
    let tareas= obtenerTareasLocalStorage();
    console.log(tareas)
    tareas.splice(tareas.indexOf(tarea),1);
    
    localStorage.setItem('tareas',JSON.stringify(tareas));
}

//cargar local storage

const cargarLocalStorage=(e)=>{
    let tareas=obtenerTareasLocalStorage();
    
    console.log(tareas)
    tareas.forEach(tarea => {
        //crear el boton borrar
        const btnBorrar =document.createElement('a');
    
        //agregar clase
        btnBorrar.className='btn-borrar';
        btnBorrar.textContent=" X";
    
        //crear elemento de la lista
        const li= document.createElement('li');   
        //ingresar el contenido como parte del texto
        li.textContent=tarea;
        //introducir <a> en <li>
        li.appendChild(btnBorrar);
        //introducir li en la lista de tareas
        listaTareas.appendChild(li);    
    });

}


// ejecucion
fnEventListeners();
