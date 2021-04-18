import { HttpClient, XhrFactory } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Prompt } from './models/prompt';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //hetkel neurokõne liidese url
  url = 'https://neurokone.cloud.ut.ee/api/v1.0/synthesize'; 
  prompts!:Prompt[];
  

  constructor(private http: HttpClient, private server:ServerService) {
    }  
    
  //tagastab kohe aktiivsed promptid andmebaasist 
  ngOnInit(): void {
      this.getEvents();
    }
  
    //kuulamiseks meetod, pole vaja midagi muuta
    listenText(item: string) {
      let postData = {
        'text': item,
        'speaker_id': 4
      }
      this.http.post(this.url, postData, {responseType:'blob'}).toPromise().then(
        data => {
          let temp = window.webkitURL.createObjectURL(data);
          let audio = new Audio(temp);
          audio.play();
        })
    }

    //salvestamise meetod
    saveText(item: string, service: string) {
      let postData = {
        'text': item,
        'speaker_id': 4
      }
      this.addPrompt(service, item);
    
      /* praegu pole seda vaja veel -> peab ümber tegema kuhugi suvalisse kohta salvestamisega
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

  //eemaldab prompti andmebaasist
  removePrompt(id:number) {
      this.prompts = this.prompts.filter((v,i) => i !== id);  
  }

  //lisab prompti andmebaasi infoga
  addPrompt (promptService:string, promptMessage:string) {
    const newPrompt = {
      service: promptService,
      prompt: promptMessage,
      created: new Date(),
      removed: null
    };
    this.server.createEvent(newPrompt).then(() => {
        this.getEvents();
    });
  }

  //tagastab ainult aktiivsed promptid, s.t remove on null
  private getEvents() {
    this.server.getEvents().then((response:any) => {
      console.log('Response', response);
      this.prompts = response.map((p:any) => {
          return p;
      });
  });
  }
    
}
