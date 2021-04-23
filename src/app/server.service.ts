import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resourceLimits } from 'node:worker_threads';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http:HttpClient) { }
  
  private async request(method: string, url:string, data?:any) {
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body'
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }

  getAllEvents() {
    return this.request('GET', `${environment.serverUrl}/event`)
  };

  createEvent(event:any) {
    return this.request('POST', `${environment.serverUrl}/event`, event);
  };

  deleteEvent(event:any) {
      const url = `${environment.serverUrl}/event/${event.id}`;
      return this.request('DELETE', url);
  };

}
