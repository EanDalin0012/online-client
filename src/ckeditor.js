// src/ckeditor.js

import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
//import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
//import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import SimpleuploadPlugin from 'ckeditor5-simple-upload/src/simpleupload'

// ...

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
    Essentials,
    UploadAdapter,
    Autoformat,
    Bold,
    Italic,
    BlockQuote,
    //	CKFinder,
    //	EasyImage,
    Heading,
    Image,
    SimpleuploadPlugin
    // ...
]

ClassicEditor.defaultConfig = {
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo'
        ]
    },

    // ...
}

// ### configuration

// ```javascript
ClassicEditor.create(document.querySelector('#editor'), {
    simpleUpload: {
        uploadUrl: 'http://127.0.0.1/my-upload-endpoint'
    }
})