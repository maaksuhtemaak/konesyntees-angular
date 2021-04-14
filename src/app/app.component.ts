import { HttpClient, XhrFactory } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Prompt } from './models/prompt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  url = 'https://neurokone.cloud.ut.ee/api/v1.0/synthesize'; 
  prompts!:Prompt[];
  

  constructor(private http: HttpClient) {
    }  
    
  ngOnInit(): void {
      //et oleks mingid ees olemas praegu
      this.prompts = [
        {id: 1,
        service: 'Internet',
        content: 'Maardus on üle õhu internetiga rike, eeldatav lahendusaeg kell 4',
        active: true
        },
        {id: 2,
          service: 'Mobiil-ID',
          content: 'Mobiil-IDga on rike, mille lahendamine võtab aega',
          active: false
          }
      ]
    }
  

  
    listenText(item: string) {
      console.log("Kuulab lauset: " + item);
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

    saveText(item: string, service: string) {
      let postData = {
        'text': item,
        'speaker_id': 1
      }
      console.log("Lisab prompti tekstiga: " + item);
      console.log("Teenus: "+ service);
      this.addPrompt(service, item);
    
      /* praegu pole seda vaja veel
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
        })*/

    }

  removePrompt(id:number) {
      this.prompts = this.prompts.filter((v,i) => i !== id);  
  }

  addPrompt (promptService:string, promptMessage:string) {
    this.prompts.push( {
        id: this.getRandomId(),
        service: promptService,
        content: promptMessage,
        active: true
    });
  }

   getRandomId() {
    return Math.floor((Math.random()*6)+1);
}

    
}
