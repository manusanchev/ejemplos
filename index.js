
$(".nivel").closest("h2").hide();
$(".record").closest("h2").hide();
$(".wrap").hide();

record = 0;
$(".boton").on('click', () => {
  
        nivel = 1;
        time = 0;
        grid = 2;
        $(".record").closest("h2").hide();
        $(".wrap").hide();
        $(".nivel").html(`Nivel ${nivel}`)
        
        $(".menu").fadeOut(500, function(){
            $(".menu").attr('style','display:none !important')
            $(".nivel").closest("h2").show();
            $(".wrap").show();
            hacerJugada()
            $(".progress-bar").css('width',`${time}%`).html(`${time/20}`);
            intervalo = setInterval(tiempo, 1000);
            
        });
       
})
function generarNumero(numero){
	return (Math.random()*numero).toFixed(0);
}

function colorRGB(){
	var coolor = "("+generarNumero(255)+"," + generarNumero(255) + "," + generarNumero(255);
	return "rgb" + coolor;
}


function generarArray(){
    var color = colorRGB();
    arr = [];
    switch (nivel) {
        case 50: grid=3; break;
        case 120: grid=4; break;
    }
    for(let i=0; i<grid; i++){
        arr.push([]);
        for (let j = 0; j <grid; j++) {
            arr[i].push(color +");");
        }
    }

  

    color = color+","+(Math.random().toFixed(2)*(0.95-0.30)+0.30)+");";
    aleatorioY = Math.floor(Math.random()*arr[0].length);
    aleatorioX = Math.floor(Math.random()*arr.length);
    arr[aleatorioY][aleatorioX] = color
    
    return arr;
}

function hacerJugada(){
    var arr = generarArray(); 
    $("#game").html("");
    for(let i=0; i<arr.length; i++){
        $("#game").append(`<div id='${i}' class="container d-flex justify-content-center mb-2 "></div>`);
        
        for (let j = 0; j <arr[i].length; j++) {
          
           $(`#${i}`).append(`<div id=${arr[i][j]} class="col-xs-2 m-2" style="background-color:${arr[i][j]});"></div>`);
        }
    }
   
}

function tiempo(){
    time+=20;
    if(time<=100){
        $(".progress-bar").css('width',`${time}%`).html(`${time/20}`);
        console.log(time)
    }else{
        clearInterval(intervalo);
        gameOver();
    }
  
}
function gameOver(){
    if(nivel> record){
        record = nivel;
   }
   if(record!=1){
        $(".record").closest("h2").show();
        $(".record").html(`Record Anterior: ${record}`).show();
   }
 clearInterval(intervalo);
   $(".wrap").hide();
   $(".menu").attr('style','display:"" !important')
   $(".nivel").closest("h2").hide();
}
function reiniciarIntervalo(){
    time = 0;
    clearInterval(intervalo);
    $(".progress-bar").css('width',`${time}%`).html(`${time/20}`);
    intervalo = setInterval(tiempo, 1000);
}

$(document).on('click','#game > div div',function(e){
   var id = $(this).attr("id");
   
   if(arr[aleatorioY][aleatorioX] == id){
        reiniciarIntervalo();
        nivel++;
        $(".nivel").html(`Nivel ${nivel}`)
        hacerJugada(nivel);
   }else{
        gameOver();
   }
   
});

