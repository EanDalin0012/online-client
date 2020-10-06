import { Component, OnInit } from '@angular/core';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css']
})
export class CkeditorComponent implements OnInit {

  public Editor = ClassicEditor;

  constructor() { }

  ngOnInit(): void {
    ClassicEditor.create( document.querySelector( '#editor' ), {
	
    extraPlugins: [  ],
    simpleUpload: {
      // The URL that the images are uploaded to.
      uploadUrl: 'http://localhost:8080/api/file/upload',

      // Enable the XMLHttpRequest.withCredentials property.
      withCredentials: true,

      // Headers sent along with the XMLHttpRequest to the upload server.
      headers: {
          'X-CSRF-TOKEN': 'CSRF-Token',
          Authorization: 'Bearer <JSON Web Token>'
      }
  },
  isEnabled: false,
		toolbar: [ 
      'ckfinder',
      'alignment',
      'imageUpload',
      '|', 
      'heading',
      'bold', 
      'italic', 
      'undo',
      'redo',
      'bold',
      'italic',
      'underline',
      'bulletedList', 
      'numberedList', 
      'blockQuote'
    ]
	} )
	.catch( error => {
		console.log( 'error', error );
	} );
  }
  public onReady(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }

  
}

function MyUploadAdapter( editor ) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = function( loader ) {
    console.log('loader',loader);
      // ...
  };
}

