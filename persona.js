/*class Persona
{
    constructor (nombre, edad, genero)
    {
        this.nombre =   nombre;
        this.edad   =   edad;
        this.genero =   genero;
    }

    obtDetalles()
    {
        var str = "";
        for (const key in this)
            str += key + " : " + this[key] + "<br>";
        return str;
    }
}*/

function main()
{
    function Persona()
    {
        this.nombre =   "";
        this.edad   =   "";
        this.genero =   "";

        this.obtDetalles = function ()
        {
            var str = "";
            for (const key in this)
                if (!(typeof(this[key]) == 'function' || typeof(this[key]) == 'object'))
                    str += key + " : " + this[key] + "<br>";
            return str;
        };
    }

    Alumno.prototype = new Persona();
    function Alumno()
    {
        this.curso = "";
        this.grupo = "";

        this.registrar = function (nombre, edad, genero, curso, grupo)
        {
            this.nombre = nombre;
            this.edad   = edad;
            this.genero = genero;
            this.curso  = curso;
            this.grupo  = grupo;
        };
    }

    
    Profesor.prototype = new Persona();
    function Profesor()
    {;
        this.asignatura = "";
        this.nivel = "";
        
        this.asignar = function (nombre, edad, genero, asignatura, nivel)
        {
            this.nombre     = nombre;
            this.edad       = edad;
            this.genero     = genero;
            this.asignatura = asignatura;
            this.nivel      = nivel;
        };
    }

    var alumno      = new Alumno();
    var profesor    = new Profesor();

    alumno.registrar("Luis", 15, "hombre", "1ero", "B");
    profesor.asignar("Juan", 30, "hombre", "Matematicas", "Alto");

    document.getElementById("body").innerHTML += alumno.obtDetalles();
    document.getElementById("body").innerHTML += "<br>";
    document.getElementById("body").innerHTML += profesor.obtDetalles();

}

main();