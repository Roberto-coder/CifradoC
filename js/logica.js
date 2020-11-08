/*
vamos a crear una funcion con el uso de JS6
que se encargue del cifrado y descifrado del texto de area
considerando utilizar funciones anonimas y callback
*/

var cesar = cesar || (function(){
    //tenemos que entender que para poder cifrar o descifrar
    //es necesario obtener 3 parametros
    //txt, desp, action
    var doStaff = function(txt, desp, action){
        //nota ya estamos mal, la nueva version de JS
        //ya no maneja var, ahora todo es let y const
        //besos y comercial wiiiii
        var replace = (function(){
            //necesito un alfabeto
            var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
        'j', 'k', 'l', 'm', 'n','ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 
        'v', 'w', 'x', 'y', 'z'];

        var l = abc.length;
        //tenemos que crear una funcion que se encargue de poder realizar
        //el cambio de las posiciones de las letras para el
        //cifrado
        return function(c){
            var i = abc.indexOf(c.toLowerCase());
            //reemplazo de las posiciones o el movimiento
            //primero tenemos que saber si el texto esta vacio
            if(i != -1){
                //movimiento de las posiciones
                var pos = i;
                if(action){
                    //cifrar
                    pos += desp;
                    pos -= (pos>=1)?1:0;

                    if (pos>=27) {
                    	pos=-2+(desp);
                    }

                }else{
                    //descifrando
                    pos -= desp;
                    pos += (pos<0)?1:0;

                    if (pos<0) {
                    	pos=28-desp;
                    }

                }
                return abc[pos];
            }
            return c;
        };

    })();

    //vamos a necesitar regresar el reemplazo de la cadena
    //pero primero hay que verificarlo
    var re = (/[a-z\u00f1\u00d1]/ig);
    return String(txt).replace(re, function(macth){
        //se encarga de buscar las coincidencias entre la
        //expresion regular y el textarea
        return replace(macth);
    });

    };

    //necesito enviar si vamos a cifrar o descifrar
    return {
        //el caso para cuando cifras
        encode : function(txt, desp){
            return doStaff(txt, desp, true);
        },
        decode : function(txt, desp){
            return doStaff(txt, desp, false);
        }
    };

})();

/*
let modulo = numero => {
	let moduloArray = []
	while (numero>1){
		moduloArray.push(numero % 26)
		numero = Math.floor(numero/2)
	}
	moduloArray.push(numero)
	return parseInt(moduloArray.join(""))
}

console.log(4%26)*/

//crear las funciones codificar y decodificar
//var desplazamiento=parseInt(document.getElementById("despo").value);

function codificar(){
	
    document.getElementById("resultado").innerHTML = 
    cesar.encode(document.getElementById("cadena").value, (parseInt(document.getElementById("despo").value)%26));
}

function decodificar(){
    document.getElementById("resultado").innerHTML = 
    cesar.decode(document.getElementById("cadena").value, (parseInt(document.getElementById("despo").value)%26));
} 

function validar(){
	var caracter,desplazamiento,expresion;
	caracter=document.getElementById("cadena").value;
    desplazamiento=document.getElementById("despo").value;
    expresion = /[a-zA_Z]/;

    if(caracter==="" || desplazamiento===""){
        alert("Todos los campos son obligatorios");
        return false;
    }else if(!expresion.test(caracter)){
    	alert("Caracter invalido");
        return false;
    }else if(desplazamiento<=0){
    	alert("No se acepta el 0, ni negativos");
        return false;
    }
}