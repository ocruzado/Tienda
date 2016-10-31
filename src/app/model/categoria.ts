export class Categoria {
    cate_IdCategoria: number;
    cate_Nombre: string;
    cate_Descripcion: string;

    prod_FlagActivo: boolean;
    prod_FlagEliminado: boolean;
    prod_CreadoPor: string;
    prod_FechaCreacion: string;
    prod_ModificadoPor: string;
    prod_FechaModificacion: string;

    constructor() {
        this.cate_IdCategoria=0;
        this.cate_Nombre = "";
        this.cate_Descripcion = "";
    }
}