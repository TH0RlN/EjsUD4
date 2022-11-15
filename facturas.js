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
const empresa = new Empresa("Ladrillos S.A.", "Calle Falsa, 123", "987654321", "12345678A")


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
        this.items      = {};
        this.id         = id;
        this.desc       = 0
        this.iva        = 0
        this.pago       = "";
        this.pagada     = false;
        this.fecha      = fecha;
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
     * Muestra en una nueva ventana la factura correspondiente
     */
    showFactura()
    {
        
    }
}