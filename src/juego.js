/**
 * Created by Maximiliano on 2/3/2015.
 */
var r, g, b;
var counter = 0;
var ccounter = 0;
var jugador;
var cuadrados;
var pause = true;

var juego = function(game) {

};

juego.prototype = {

    preload: function () {

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(480, 260, 1024, 768);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        game.load.image("jugador", "assets/imagenes/jugador.png");
        game.physics.startSystem(Phaser.Physics.ARCADE);
        cuadrados = game.add.group();

    },

    create: function () {
        jugador = game.add.sprite(game.width * 0.5 + 16, game.height * 0.9, "jugador");
        jugador.anchor.setTo(0.5, 0.5);
        game.physics.enable(jugador, Phaser.Physics.ARCADE);
        jugador.body.collideWorldBounds = true;
        jugador.body.collideWorldBounds.down = false;
        jugador.rojo = 170;
        jugador.verde = 170;
        jugador.azul = 170;
        jugador.cambiarA = "rojo";
        game.physics.enable(cuadrados, Phaser.Physics.ARCADE);
    },

    update: function () {
        game.input.onDown.add(function () {
            pause = false
        });

        if (!pause) {
            repintar(jugador);

            counter++;

            if (game.input.x != undefined) {
                jugador.body.velocity.x = Math.floor(-(jugador.x - game.input.x) * 5);
            }
            if (game.input.y != undefined) {
                jugador.body.velocity.y = Math.floor(-(jugador.y - game.input.y) * 5);
            }

            generarLluviaMortal(cuadrados);

            game.physics.arcade.collide(cuadrados, jugador, function (a, b) {
                jugador.destroy();
                cuadrados.destroy();
                pause = true;
                game.add.text(game.width / 2 - 100, game.height / 2 - 20, "Puntuacion: " + counter, {fill: "#ff0044"});
                Math.seedrandom(String(counter));
                document.getElementById("codigo").innerHTML = ("Codigo de validacion: " + counter + ":" + Math.floor(Math.random() * 100000))
            });

            cuadrados.forEach(borrarCuadradosSalidos, this, false, cuadrados);
        }
    }
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

var agregarCuadrado = function (x, y, grupo) {
    grupo.add(game.add.sprite(Math.floor(Math.random() * (game.width - x)), -y, "jugador"));
    game.physics.enable(grupo.getTop(), Phaser.Physics.ARCADE);
    grupo.getTop().body.immovable = true;
    //console.log("Nuevo cuadrado");
}

var borrarCuadradosSalidos = function (c, l) {
    if (c != undefined && c.body.position.y > game.height) {
        l.removeChild(c);
        //console.log("Cuadrado borrado");
    }
}

var repintar = function (jugador) {
    if (jugador.cambiarA == "rojo") {
        if (jugador.rojo < 255) {
            jugador.rojo++;
            if (jugador.verde > 170)
                jugador.verde--;
            if (jugador.azul > 170)
                jugador.azul--;
        } else
            jugador.cambiarA = "azul";
    }
    if (jugador.cambiarA == "azul") {
        if (jugador.azul < 255) {
            jugador.azul++;
            if (jugador.rojo > 170)
                jugador.rojo--;
            if (jugador.verde > 170)
                jugador.verde--;
        } else
            jugador.cambiarA = "verde";
    }
    if (jugador.cambiarA == "verde") {
        if (jugador.verde < 255) {
            jugador.verde++;
            if (jugador.azul > 170)
                jugador.azul--;
            if (jugador.rojo > 170)
                jugador.rojo--;
        } else
            jugador.cambiarA = "rojo";
    }
    jugador.tint = "0x" + componentToHex(jugador.rojo) + componentToHex(jugador.verde) + componentToHex(jugador.azul);
}