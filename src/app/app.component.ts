import { HttpClient, XhrFactory } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  url = 'https://neurokone.cloud.ut.ee/api/v1.0/synthesize'; 

  constructor(private http: HttpClient) {
    }  

    listenText(item: string) {
      console.log(item);
      let postData = {
        'text': item,
        'speaker_id': 1
      }

      this.http.post(this.url, postData, {responseType:'blob'}).toPromise().then(
        data => {
          let temp = window.webkitURL.createObjectURL(data);
          let audio = new Audio(temp);
          audio.play();
        })
    }

    saveText(item: string) {
      console.log(item);
      let postData = {
        'text': item,
        'speaker_id': 1
      }

      this.http.post(this.url, postData, {responseType:'blob'}).toPromise().then(
        data => {
          let temp = window.webkitURL.createObjectURL(data);
          let a = document.createElement('a');
          a.setAttribute('hidden','');
          a.setAttribute('href',temp);
          a.setAttribute('download','synteesitud_tekst');
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
    }
    
}
