/**
 * Una clase para crear la empresa
 */
class Empresa
{
    /**
     * 
     * @param {String} nombre 
     * @param {String} direccion 
     * @param {String} telf 
     * @param {String} nif 
     */
    constructor(nombre, direccion, telf, nif)
    {
        this.nombre     = nombre;
        this.direccion  = direccion;
        this.telf       = telf;
        this.nif        = nif;
    }
}

const empresa = new Empresa("Outer Wilds Ventures", "Cuenca de Lumbre, Lumbre", "987654321", "12345678A")

/**
 * Esta clase nos permite crear items para añadir lineas de productos a la factura
 */
class Item
{
    /**
     * @param {String} nombre 
     * @param {Number} cant 
     * @param {Number} precio 
     */
    constructor(nombre, cant, precio)
    {
        this.nombre     = nombre;
        this.cant       = cant;
        this.precio     = precio;
    }

    /**
     * Calcula el paarcial del item
     * @returns {Number}
     */
    calcParcial()
    {
        return this.cant * this.precio;
    }

    /**
     * Devuelve un array con todas las propiedades del objeto
     * @returns {Array}
     */
    showItem()
    {
        return new Array(this.nombre, this.cant, this.precio, this.calcParcial());
    }
}

/**
 * Una clase que nos permite instanciar objetos cliente
 */
class Cliente
{
    /**
     * @param {String} nombre 
     * @param {String} direccion 
     * @param {Number} telf 
     * @param {String} nif 
     */
    constructor(nombre, direccion, telf, nif)
    {
        this.nombre     = nombre;
        this.direccion  = direccion;
        this.telf       = telf;
        this.nif        = nif;
    }
}

/**
 * Una clase que nos permite instanciar Objetos de tipo factura
 * Crea un objeto con un id y fecha dados por el usuario   
 */
class   Factura
{
    /** 
     * @param {Number}  id
     * @param {Date}    fecha
     */
    constructor (id, fecha)
    {
        this.empresa    = empresa;
        this.cliente    = "";
        this.items      = [];
        this.id         = id;
        this.desc       = 0;
        this.iva        = 0;
        this.pago       = "";
        this.pagada     = false;
        this.fecha      = fecha;
        this.suma       = 0;
        this.descuento  = 0;
        this.base       = 0;
        this.tIva       = 0;
        this.total      = 0;
    }

    /**
     * Permite cambiar el cliente de la factura
     * @param {Cliente} cliente 
     */
    setCliente(cliente)
    {
        this.cliente = cliente;
    }

    /**
     * Permite cambiar la lista de items
     * @param {Item[]} items 
     */
    setItems(items)
    {
        this.items = items;
    }

    /**
     * Añade la lista de items a la lista de la factura
     * @param {Item[]} items 
     */
    addItems(items)
    {
        this.items = Array.prototype.concat(this.items, items);
    }

    /**
     * Añade un item a la lista de la factura
     * @param {Item} item 
     */
    pushItem(item)
    {
        this.items.push(item);
    }

    /**
     * Permite cambiar el porcentaje del iva
     * @param {Number} iva 
     */
    setIva(iva)
    {
        this.iva = iva;
    }

    /**
     * Permite cambiar el porcentaje de descuento
     * @param {Number} desc 
     */
    setDesc(desc)
    {
        this.desc = desc;
    }

    /**
     * Calcula la Suma, el descuento, la base imponible, el IVA y el total
     */
    calcFactura()
    {
        for (const item in this.items)
        {
            this.suma += this.items[item].calcParcial();
        }

        this.descuento  = this.suma * this.desc;
        this.base       = this.suma - this.descuento;
        this.tIva       = this.base * this.iva;
        this.total      = this.base + this.tIva;
    }

    /**
     * Muestra en una nueva ventana la factura correspondiente
     */
    showFactura()
    {
        var factura         = document.open("", "Factura", "width=800, height=800");
        var style           = document.createElement('style');
        var datosCliente    = document.createElement('div');
        var datosEmpresa    = document.createElement('div');
        var str             = "";

        this.calcFactura();

        factura.document.head.innerHTML = "";
        factura.document.body.innerHTML = "";

        //Creo los estilos necesarios para mostrar correctamente los datos
        style.innerHTML = ".green{color: green} .red{color:red} .strong{font-weight : bolder} .right{text-align : right} #subtotales{width : 50%; float : right; clear : both} #items{width : 100%} td,th{border : 1px solid black; text-align: left; padding: 2px}";
        factura.document.head.append(style);

        //Añade los datos de la empresa
        for (const key in this.empresa)
        {
            str += this.empresa[key] + "<br>";
        }
        datosEmpresa.innerHTML = str;

        //Añade los datos del cliente
        str = "";
        for (const key in this.cliente)
        {
            str += this.cliente[key] + "<br>";
        }
        datosCliente.innerHTML = str;

        datosCliente.style.textAlign = "right";
        factura.document.body.append(datosEmpresa);
        factura.document.body.append(datosCliente);

        str = "";

        //Datos básicos de la factura (nº y fecha).
        str += "<p><strong>Nº Factura: " + this.id.toString().padStart(5, '0') + "</strong>";
        str += " - Fecha: "+ this.fecha.toLocaleDateString() +"</p>";

        //Tabla de items
        str += ("<table id='items'><tr><th>Descripción</th><th>Cantidad</th><th>Precio</th><th>Parcial</th></tr>");
        for (const item in this.items)
        {
            var array = this.items[item].showItem();
            str += "<tr>";
            str += "<td>" + array[0] + "</td><td>" + array[1] + "</td><td class='right'>" + array[2].toFixed(2) + "€</td><td class='right'>" + array[3].toFixed(2) + " €</td>";
            str += "</tr>";
        }

        //Tabla de subtotales y total
        str += "</table><table id='subtotales'>";
        str += "<tr><td>" + "Suma"                                          + "</td><td class='right'>" + this.suma.toFixed(2)         + " €</td></tr>";
        str += "<tr><td>" + "Descuento ("   +  (this.desc * 100)    + "%)"  + "</td><td class='right'>" + this.descuento.toFixed(2)    + " €</td></tr>";
        str += "<tr><td>" + "Base imp."                                     + "</td><td class='right'>" + this.base.toFixed(2)         + " €</td></tr>";
        str += "<tr><td>" + "IVA ("         + (this.iva * 100)      + "%)"  + "</td><td class='right'>" + this.tIva.toFixed(2)         + " €</td></tr>";
        str += "<tr><td class='strong'>"    + "TOTAL"                       + "</td><td class='right strong'>" + this.total.toFixed(2) + " €</td></tr>";
        str += "</table>";

        //Forma de pago y estado
        str += "<p><strong>Forma de pago:</strong> " + this.pago +"</p>";
        str += "<h2 class='" + (this.pagada ? "green'> PAGADA" : "red'> A DEBER") + "</h2>";

        factura.document.body.innerHTML += str;
    }
}

/**
 * Eventos para la página. En vez de tener unas facturas ejemplo se podría crear una interfaz que nos permita elegir los datos uno por uno.
 */
function main()
{
    var nfactura = 1;

    document.getElementById('boton1').addEventListener('click', (evt) =>
    {
        var factura = new Factura(nfactura, new Date());

        factura.setCliente(new Cliente("Feldespato", "Espino Oscuro, s/n", 966477123, "123123Z"));
        factura.addItems(new Array(new Item("Rape en lata", 20, 8), new Item("Combustible cobete", 100, 2.67), new Item("Traje espacial", 1, 199.95)));
        factura.setIva(.21);
        factura.setDesc(.01 );
        factura.pago = "50% al pedido, 50% a la entrega";
        factura.pagada = false;

        factura.showFactura();
        console.log(factura);

        delete factura;
        nfactura++;
    });
    
    
    document.getElementById('boton2').addEventListener('click', (evt) =>
    {
        var factura = new Factura(nfactura, new Date());
        
        factura.setCliente(new Cliente("Gabro", "Abismo del gigante, s/n", 901554521, "123123A"));
        factura.addItems(new Array(new Item("Máscara Nomai", 1, 4999.87), new Item("Nave exploradora", 1, 500), new Item("Spray anti materia fantasmal", 100, 1.2)));
        factura.setIva(.21);
        factura.setDesc(.40);
        factura.pago = "Al contado";
        factura.pagada = true;
        
        factura.showFactura();
        console.log(factura);
        
        delete factura;
        nfactura++;
    });


}

main();