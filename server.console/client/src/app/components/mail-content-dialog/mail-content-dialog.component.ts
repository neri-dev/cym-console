import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PhishingStatus } from 'src/app/services/status/phishing.status';

@Component({
  selector: 'app-mail-content-dialog',
  templateUrl: './mail-content-dialog.component.html',
  styleUrls: ['./mail-content-dialog.component.css']
})
export class MailContentDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MailContentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PhishingStatus,
  ) {}

  ngOnInit(): void {
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
