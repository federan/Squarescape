/**
 * Created by Maximiliano on 2/3/2015.
 */
var generarLluviaMortal = function(grupo_de_cuadrados){
    if (this.contador == undefined) this.contador = 0;
    if (this.velocidad == undefined) this.velocidad = 10;

    this.contador++;

    if (this.contador >= (10+Math.floor(1000/this.velocidad))) {
        this.contador = 0;
        agregarCuadrado(32, 32, grupo_de_cuadrados);
        this.velocidad += 10;
        grupo_de_cuadrados.setAll("body.velocity.y", 50 + this.velocidad);
    }

}