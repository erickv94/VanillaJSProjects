//constantes
const formulario=document.getElementById('agregar-producto');
//classes

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto=Number(presupuesto);
        this.restante=Number(presupuesto);
    }

    restarPresupuesto(cantidad){
        this.restante-=Number(cantidad);
    }

}

class UIHtml{
    insertarPresupuesto(presupuesto,restante){
        const htmlPresupuesto=document.querySelector('#total');
        const htmlRestante=document.querySelector('#restante');

        htmlPresupuesto.textContent=presupuesto;
        htmlRestante.textContent=restante;

    }

    insertarMensaje(mensaje,tipo){
        const divMensaje= document.createElement('div');
        divMensaje.classList.add('alert','text-center');

        if(tipo==='error'){
            divMensaje.classList.add('alert-danger');
        }
        else if (tipo==='success'){
            divMensaje.classList.add('alert-success');
        }  
        else if(tipo=='warning'){
            divMensaje.classList.add('alert-warning');
        }

        divMensaje.appendChild(document.createTextNode(mensaje));

        document.querySelector('.primario').insertBefore(divMensaje,formulario);
        //quitar del formulario en 3 segundos
        setTimeout(()=>{
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        },3000);
    }

    agregarProductosLista(producto){

        const gastoUL=document.querySelector('#productos ul');
        const li=document.createElement('li');

        li.classList.add('list-group-item','d-flex','justify-content-between','align-items-center');
        li.innerHTML=`${producto.nombre}
        <span class="badge badge-primary badge-pill"> $ ${producto.precio} </span>
        `;

        gastoUL.appendChild(li);
    }

    agregarProductosLocalStorage(productos){


        
        productos.forEach((producto)=>{
      
            this.agregarProductosLista(producto)        
        });
    }


    refrescar(){
       const lista= document.querySelector('#productos ul');
        while(lista.firstChild){
            lista.firstChild.remove();
        }
    }
}

class Producto{
    
    constructor(nombre,precio){
        this.nombre=nombre;
        this.precio=Number(Number(precio).toFixed(2));
    }

    validar(){
        let esValido=true;

        //validaciones de tipo  & vacio
        if(this.nombre===''||this.precio==='')
            esValido=false;
        else if(this.nombre==null||this.precio==null)
            esValido=false;
        else if(typeof(this.nombre)!=='string'||typeof(this.precio)!=='number')
            esValido=false;

        //validacion numericos
        if(this.precio<=0)
            esValido=false;
        
        return esValido;

    }
    //guardar producto en localstorage
    saveProductLS(){
        const productosLS=this.getProductsLocalStorage();
        productosLS.push(this);

        console.log(productosLS)
        localStorage.setItem('productos',JSON.stringify(productosLS));
    }

    getProductsLocalStorage(){
        let  productosLS=localStorage.getItem('productos');

        if(productosLS){
            productosLS=JSON.parse(localStorage.getItem('productos'));
        }
        else{

            productosLS=[];
            console.log(productosLS)
        }
        return productosLS;
    }
}

//functions
const comprobarPresupuesto=(e)=>{
    if(localStorage.getItem('presupuesto')){

        const presupuesto= JSON.parse(localStorage.getItem('presupuesto'));
        const interfaz= new UIHtml();
        interfaz.insertarPresupuesto(presupuesto.presupuesto,presupuesto.restante);
        interfaz.agregarProductosLocalStorage(new Producto().getProductsLocalStorage());
    }
    else{
        const valorPresupuesto = prompt('Cuanto planea gastar este mes?');
        
        //verifica si valor presupuesto es nullo o vacio
        if(valorPresupuesto==null || valorPresupuesto==''){
            window.location.reload();
            return; // lo retorna sin crear presupuesto
        }

        const presupuesto= new Presupuesto(valorPresupuesto);
        localStorage.setItem('presupuesto',JSON.stringify(presupuesto));
        const interfaz= new UIHtml();
        interfaz.insertarPresupuesto(presupuesto.presupuesto,presupuesto.restante);
        interfaz.agregarProductosLocalStorage(new Producto().getProductsLocalStorage());
    }


}

const guardarGasto=(e)=>{
    e.preventDefault();
    const nombreProducto= e.target.querySelector('#nombre').value;
    const precio= e.target.querySelector('#precio').value;
    
    const producto= new Producto(nombreProducto,precio);
    const htmlMensaje= new UIHtml(nombreProducto,precio);

    if(producto.validar() ){
        producto.saveProductLS();
        htmlMensaje.insertarMensaje('Almacenado con exito', 'success');
        htmlMensaje.agregarProductosLista(producto);

    }
    else
    {
        htmlMensaje.insertarMensaje('Ocurrio un error', 'error');
        
    }
        

}

const eliminarLocalStorage=()=>{
    localStorage.clear();
    html= new UIHtml;
    html.refrescar();

    html.insertarMensaje('Se elimino todo del localstorage, disponible en breve...','success');
    setTimeout(()=>window.location.reload(),4000);
}

const eliminarListaLocalStorage=()=>{
    localStorage.removeItem('productos');
    html= new UIHtml;
    html.refrescar();
    html.insertarMensaje('Se eliminaron los productos','success');
    
           
}
//listeners
document.addEventListener('DOMContentLoaded',comprobarPresupuesto);
formulario.addEventListener('submit',guardarGasto);
document.getElementById('eliminar-localstorage').addEventListener('click',eliminarLocalStorage);
document.getElementById('eliminar-productos').addEventListener('click',eliminarListaLocalStorage);


