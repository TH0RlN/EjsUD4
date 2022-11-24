/**
 * Clase que define una persona
 */
class Alumno
{
    /**
     * @param {String}  nombre 
     * @param {String}  apellidos 
     * @param {String}  dni 
     * @param {String}  modulo 
     */
    constructor (nombre, apellidos, dni, modulo)
    {
        this.nombre     = nombre;
        this.apellidos  = apellidos;
        this.dni        = dni;
        this.modulo     = modulo;
    }

    obtDetalles()
    {
        var str = "";
        for (const key in this)
            if (!(typeof(this[key]) == 'function' || typeof(this[key]) == 'object'))
                str += key + " : " + this[key] + "<br>";
        return str;
    }
}

/**
 * Instancia un objeto de la clase Alumno
 * @return  {Alumno}
 */
function creaAlumno()
{
    return new Alumno(document.getElementById('nombre').value, document.getElementById('apellidos').value, document.getElementById('dni').value, document.getElementById('modulo').value);
}

document.getElementById('enviar').addEventListener('click', evt => {console.log(creaAlumno());});