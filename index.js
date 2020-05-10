

record = 0;
jQuery(".boton").on('click', () => {
        jQuery(".main").removeClass("main")
        jQuery(".record").addClass("main")
        jQuery(".boton").hide();
        hacerJugada();
        contador = 1;
        jQuery(".contador").html(`<p>Nivel ${contador}</p>`)
})

function generarNumero(numero){
	return (Math.random()*numero).toFixed(0);
}

function colorRGB(){
	var coolor = "("+generarNumero(255)+"," + generarNumero(255) + "," + generarNumero(255);
	return "rgb" + coolor;
}


function generarArray(contador=2){
    var color = colorRGB();
     arr = [];
    for(let i=0; i<(contador+3); i++){
        arr.push(color +");");
    }

    color = color+","+(Math.random().toFixed(2)*(0.95-0.30)+0.30)+");";
    aleatorio = Math.floor(Math.random()*arr.length);
    arr[aleatorio] = color
 
    return arr;
}

function hacerJugada(contador){
    var arr = generarArray(contador); 
    jQuery("#game").html("");
    arr.map((item,index) => {
        jQuery("#game").append(`<div id="${item}" class="mt-2" style="background-color:${item}"></div>`)
    });
   
}

jQuery(document).on('click','#game > div',function(e){
   var id = jQuery(this).attr("id");
   contador++;
   jQuery(".contador").html(`<p>Nivel ${contador}</p>`)
  
   if(arr[aleatorio] == id){
    hacerJugada(contador);
   }else{
       if(contador> record){
            record = contador;
       }
      
        jQuery(".boton").show();
        jQuery("#main").addClass("main")
        jQuery(".record").html(`<p>Record Anterior: ${record}</p>`).show();

   }
   
});

