import {
    Component,
    OnDestroy,
    AfterViewInit,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

@Component({
    selector: 'simple-tiny',
    template: `<textarea id="{{elementId}}">{{content_html}}</textarea>`
})
export class SimpleTinyComponent implements AfterViewInit, OnDestroy {
    @Input() elementId: String;
    @Input() content_html: String;
    @Output() onEditorKeyup = new EventEmitter<any>();

    editor;

    ngAfterViewInit() {
        tinymce.init({
            selector: '#' + this.elementId,
            plugins: ['link', 'paste', 'table', 'image', 'imagetools', 'code'],

            //toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',


            skin_url: 'assets/skins/lightgray',
            setup: editor => {
                this.editor = editor;
                editor.on('keyup', () => {
                    const content = editor.getContent();
                    this.onEditorKeyup.emit(content);
                });
            },
        });
    }

    ngOnDestroy() {
        tinymce.remove(this.editor);
    }
}