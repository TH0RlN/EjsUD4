class Item
{
    constructor(nombre, cant, precio)
    {
        this.nombre     = nombre;
        this.cant       = cant;
        this.precio     = precio;
    }

    calcParcial()
    {
        return this.cant * this.precio;
    }

    showItem()
    {
        return new Array(this.nombre, this.cant, this.precio, this.calcParcial());
    }
}

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

const empresa = new Empresa("Pirotecnia S.A.", "Calle Falsa, 123", "987654321", "12345678A")

/**
 * Una clase que nos permite instanciar objetos cliente
 */
class Cliente
{
    /**
     * 
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
     * Permite cambair el porcentaje de descuento
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

        style.innerHTML = ".green{color: green} .red{color:red} .strong{font-weight : bolder} .right{text-align : right} #subtotales{width : 50%; float : right; clear : both} #items{width : 100%} td,th{border : 1px solid black; text-align: left; padding: 2px}";
        factura.document.head.append(style);

        for (const key in this.empresa)
        {
            str += this.empresa[key] + "<br>";
        }
        datosEmpresa.innerHTML = str;

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

        str += "<p>Fecha: "+ this.fecha.toLocaleDateString() +"</p>";

        str += ("<table id='items'><tr><th>Descripción</th><th>Cantidad</th><th>Precio</th><th>Parcial</th></tr>");
        for (const item in this.items)
        {
            var array = this.items[item].showItem();
            str += "<tr>";
            str += "<td>" + array[0] + "</td><td>" + array[1] + "</td><td>" + array[2] + "</td><td class='right'>" + array[3] + " €</td>";
            str += "</tr>";
        }

        str += "</table><table id='subtotales'>";
        str += "<tr><td>" + "Suma"                                          + "</td><td class='right'>" + this.suma         + " €</td></tr>";
        str += "<tr><td>" + "Descuento ("   +  (this.desc * 100)    + "%)"  + "</td><td class='right'>" + this.descuento    + " €</td></tr>";
        str += "<tr><td>" + "Base imp."                                     + "</td><td class='right'>" + this.base         + " €</td></tr>";
        str += "<tr><td>" + "IVA ("         + (this.iva * 100)      + "%)"  + "</td><td class='right'>" + this.tIva         + " €</td></tr>";
        str += "<tr><td class='strong'>"    + "TOTAL"                       + "</td><td class='right strong'>"              + this.total + " €</td></tr>";
        str += "</table>";

        str += "<p>Nº Factura: "    + this.id +"</p>";
        str += "<p>Forma de pago: " + this.pago +"</p>";
        str += "<h2 class='" + (this.pagada ? "green'> PAGADA" : "red'> A DEBER") + "</h2>";

        factura.document.body.innerHTML += str;
    }
}

function main()
{
    var factura = new Factura(234, new Date());

    factura.setCliente(new Cliente("Juan", "Rua Pepe", 12345, "123123Z"));
    factura.addItems(new Array(new Item("Chocolate", 2, 5.1), new Item("Molinillo", 5, 1.1), new Item("Café", 3, 2)));
    factura.setIva(.21);
    factura.pago = "Al contado";
    factura.pagada = true;

    document.getElementById('boton').addEventListener('click', (evt) =>
    {
        factura.showFactura();
    })
}

main();