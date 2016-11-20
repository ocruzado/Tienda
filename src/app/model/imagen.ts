export class Imagen {
    imag_IdImagen: number;
    //imag_Tipo: number;
    //imag_IdTipo: number;
    imag_ArchivoNombreOriginal: string;
    imag_ArchivoExtension: string;
    imag_ArchivoNombre: string;

    constructor() {
        this.imag_IdImagen = 0;
        //this.imag_Tipo = 0;
        //this.imag_IdTipo = 0;
        this.imag_ArchivoNombreOriginal = '';
        this.imag_ArchivoExtension = '';
        this.imag_ArchivoNombre = '';
    }
}