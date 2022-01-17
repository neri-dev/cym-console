import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhishingStatusResponse } from './phishing.status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  getStatuses(from: number, to: number): Observable<PhishingStatusResponse> {
    const url = `${window.location.origin}/statuses?from=${from}&to=${to}`;
    return this.http.get<PhishingStatusResponse>(url);
  }

  getStatusesCount(): Observable<number> {
    const url = `${window.location.origin}/statusesCount`;
    return this.http.get<number>(url);
  }
}
