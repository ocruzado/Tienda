export class Categoria {
    cate_IdCategoria: number;
    cate_Nombre: string;
    cate_Descripcion: string;

    FlagActivo: boolean;

    constructor() {
        this.cate_IdCategoria = 0;
        this.cate_Nombre = "";
        this.cate_Descripcion = "";
    }
}