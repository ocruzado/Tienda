import {Component} from '@angular/core';
import {Producto} from "./model/producto";

@Component({
    selector: 'producto',
    templateUrl: './producto.component.html',
    styles: [`
        .img-close {
            position:absolute;
            bottom:10px;
            right:10px;
            width:100px;
            height:30px;
        } 
    `]
})

export class ProductoComponent {
    private Url: string = environment.Base_Url_Service;  // URL to web api

    producto: Producto = new Producto();
    filesToUpload: Array<File>; //FILE-UPLOAD

    constructor() {
        this.filesToUpload = []; //FILE-UPLOAD
    }

    //FILE-UPLOAD - Inicio
    upload(): void {
        //this.makeFileRequest("http://localhost:8000/upload", [], this.filesToUpload).then((result) => {
        this.makeFileRequest(Url + "/upload", [], this.filesToUpload).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });
    }

    fileChangeEvent(fileInput: any): void {
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }

    private makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }

    //FILE-UPLOAD - Fin

    //SECCION TAG'S - INICIO
    private tags: ITag[] = [];

    set s_Tag(tag: string) {
        this.tags = tag.split(';').filter(x => x != '').map(function (x, index) {
            return {
                id: index,
                tag: x
            }
        });
    }

    get g_Tag() {
        return this.tags.map(function (x) {
            return x.tag.trim();
        }).join(';');
    }

    private AgregarTag(tag: string): void {
        let i = this.tags.length;
        this.tags.push({id: i, tag: tag.trim()});
    }

    private EliminarTag(index: number) {
        this.tags = this.tags.filter(e => e.id != index);
    }

    //SECCION TAG'S - FIN
}

interface ITag {
    id: number;
    tag: string;
}