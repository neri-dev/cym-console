import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MailSenderService } from 'src/app/services/mail-sender/mail-sender.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent {
  loading: boolean = false;

  constructor(private mailSender: MailSenderService, private _snackBar: MatSnackBar) { }

  form: FormGroup = new FormGroup({
    content: new FormControl(''),
    useDemo: new FormControl(''),
    subject: new FormControl(''),
    email: new FormControl('')
  });

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  emails: string[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.emails.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(email: string): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  async submit() {
    if (this.form.valid) {
      this.loading = true;
      
      const useDemo = this.form.value['useDemo'];
      const subject = this.form.value['subject'];
      const content = this.form.value['content'];
      
      this.mailSender.send(this.emails, subject, useDemo, content).subscribe(
         data => {
          let message = "Email sent successfully!";
          if (!data)
            message = "Send failed!"
            
            this.loading = false;
          this._snackBar.open(message, "close");
        }
      );
    }
  }
}
