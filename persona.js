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
    /*var Persona = function (nombre, edad, genero)
    {
        this.nombre =   nombre;
        this.edad   =   edad;
        this.genero =   genero;

        this.obtDetalles = function ()
        {
            var str = "";
            for (const key in this)
                if (!(typeof(this[key]) == 'function' || typeof(this[key]) == 'object'))
                    str += key + " : " + this[key] + "<br>";
            return str;
        };
    }

    var Alumno = function (nombre, edad, genero, curso, grupo)
    {
        Persona.call(this, nombre, edad, genero);

        this.curso = curso;
        this.grupo = grupo;

        this.registrar = function ()
        {
        };
    }

    var Profesor = function (nombre, edad, genero, asignatura, nivel)
    {
        Persona.call(this, nombre, edad, genero);

        this.asignatura = asignatura;
        this.nivel = nivel;

        this.asignar = function ()
        {
        };
    }

    var persona = new Profesor("Juan", 30, "hombre", "1ero", "B");

    document.getElementById("body").innerHTML += persona.obtDetalles();*/

    var persona =
    {
        nombre      :   "Juan",
        edad        :   30,
        genero      :   "Masculino",

        obtDetalles :   function ()
        {
            var str = "";
            for (const key in this)
                if (!(typeof(this[key]) == 'function' || typeof(this[key]) == 'object'))
                    str += key + " : " + this[key] + "<br>";
            return str;
        }
    }

    var alumno =
    {
        curso       :   "1ero",
        grupo       :   "B",

        registrar   :   function ()
        {}
    }
    
    var profesor =
    {
        asignatura  :   "Matematicas",
        nivel       :   "Avanzado",

        asignar     :   function ()
        {}
    }

    alumno.prototype    = persona.constructor;
    profesor.prototype  = persona.constructor;

    document.getElementById("body").innerHTML += profesor.obtDetalles();
}

main();