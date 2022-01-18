import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const MAIL_API = `${window.location.origin}/mail/`;
// const MAIL_API = `http://localhost:3002/`;
const httpOptions = {
  headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Basic YWRtaW46YWRtaW4=')
};

@Injectable({
  providedIn: 'root'
})
export class MailSenderService {

  constructor(private http: HttpClient) { }

  send(to: string[], subject: string, useDemo: boolean, content: string) {
    return this.http.post(MAIL_API + 'sendMail', {
      from: "mailer@mail.com",
      to,
      subject,
      useDemo,
      content,
    }, httpOptions);
  }
}
