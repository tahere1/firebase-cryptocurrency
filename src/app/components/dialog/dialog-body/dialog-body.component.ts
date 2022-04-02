import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {
  dialogTitle : string;
  dialogContent : string
  dialogAccept : boolean;

  constructor(public router: Router,
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.dialogTitle = data.dialogTitle;
      this.dialogContent = data.dialogContent;
      this.dialogAccept = data.dialogAccept;
    }


  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
    if (this.dialogAccept == true) {
      this.router.navigate(['/']);
    }
  }

}
