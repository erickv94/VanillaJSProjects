//constantes
const valorPresupuesto = prompt('Cuanto planea gastar este mes?');
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
}

//functiones
const comprobarPresupuesto=(e)=>{
    if (presupuesto==null || presupuesto==''){
        window.location.reload();
    }
    else{
        const presupuesto= new Presupuesto(valorPresupuesto);
        const interfaz= new UIHtml();
        interfaz.insertarPresupuesto(presupuesto.presupuesto,presupuesto.restante);
    }

}

//listeners
document.addEventListener('DOMContentLoaded',comprobarPresupuesto);



