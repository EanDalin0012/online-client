import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css']
})
export class CkeditorComponent implements OnInit {

  config: {
    customConfig: '../../../../assets/ckeditor/ckeditor.js'
  }

  constructor() { }

  ngOnInit(): void {
    
    }
  }


