import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UploadService } from '../../share/service/upload.service';
import { Observable } from 'rxjs/Observable';
import { HttpEventType, HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Utils } from '../../share/utils/utils.static';
import { LOCAL_STORAGE } from '../../share/constants/common.const';

@Component({
  selector: 'app-home1100',
  templateUrl: './home1100.component.html',
  styleUrls: ['./home1100.component.css']
})
export class Home1100Component implements OnInit {
  
  imageSrc: string;

  file_name: string;
  size: number;
  type: string;
  modifiedDate: string;
  
  myForm = new FormGroup({

   name: new FormControl('', [Validators.required, Validators.minLength(3)]),

   file: new FormControl('', [Validators.required]),

   fileSource: new FormControl('', [Validators.required])

 });

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  fileInfos: Observable<any>;
  
  constructor(private uploadService: UploadService,private http: HttpClient) { }
  
  ngOnInit(): void {
  }

  get f(){
    return this.myForm.controls;
  }

  onFileChange(event) {
    console.log(event.target.files[0]);
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file_name = event.target.files[0].name;
      this.type = event.target.files[0].type;
      this.size = event.target.files[0].size;
      this.modifiedDate = event.target.files[0].lastModifiedDate;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.myForm.patchValue({
          fileSource: reader.result
        });
      };
    }

  }

  submit(){

    console.log(this.myForm.value);
    console.log(this.file_name, this.modifiedDate, this.type, this.size);
    
    let authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
    const access_token = authorization.access_token;

    const httpOptionsObj = {
      'Authorization': 'Bearer '+access_token
    };

    console.log(this.myForm.value.fileSource);
    console.log(typeof this.myForm.value.fileSource);
    var data = new FormData();
    data.append("file", "3425914.jpg");

    this.http.post('http://localhost:8000/api/file/upload1', this.myForm.value, {headers: new HttpHeaders(httpOptionsObj)}).subscribe(res => {

        console.log(res);

        alert('Uploaded Successfully.');

      })

  }








  uploadFiles(event) {  
    const file = event.target.files[0];
    console.log("file", file);
    const formData = new FormData();  
    formData.append('file', event.target.files[0]);  
    file.inProgress = true;  
    this.uploadService.upload(event.target.files[0]).then( res=>{
      console.log('rest', res);
    });  
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0);
    console.log(this.currentFile);
    
    this.uploadService.upload1(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }

  getSourceImg() {

  }

}
