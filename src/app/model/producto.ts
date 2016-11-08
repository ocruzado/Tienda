export class Producto {
    prod_IdProducto: number;
    prod_Nombre: string;
    prod_Descripcion: string;
    prod_Precio: number;

    // prod_FlagActivo: boolean;
    // prod_FlagEliminado: boolean;
    // prod_CreadoPor: string;
    // prod_FechaCreacion: string;
    // prod_ModificadoPor: string;
    // prod_FechaModificacion: string;

    constructor() {
        this.prod_Nombre = "";
        this.prod_Descripcion = "";
        this.prod_Precio = 0;
    }
}