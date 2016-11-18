export class Categoria {
    cate_IdCategoria: number;
    cate_Codigo: string;
    cate_Nombre: string;
    cate_Descripcion: string;

    FlagActivo: boolean;

    constructor() {
        this.cate_IdCategoria = 0;
        this.cate_Codigo = "";
        this.cate_Nombre = "";
        this.cate_Descripcion = "";

        this.FlagActivo = true;
    }
}