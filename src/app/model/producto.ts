export class Producto {
    prod_IdProducto: number;
    cate_IdCategoria:number;
    prod_Nombre: string;
    prod_Descripcion: string;
    prod_Precio: number;
    prod_Tags:string;

    FlagActivo: boolean;

    constructor() {
        this.cate_IdCategoria = 0;
        this.prod_Nombre = "";
        this.prod_Descripcion = "";
        this.prod_Precio = 0;

        this.prod_Tags = '';
        this.FlagActivo=true;
    }
}