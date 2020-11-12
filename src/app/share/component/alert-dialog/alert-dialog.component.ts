import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {
  public actionsLayout = 'normal';

 
  constructor() { }

  ngOnInit(): void {
  }

  public onDialogClose() {
    alert('No data deleted.');
}

public onDeleteData() {
    alert('Data deleted.');
}

}
