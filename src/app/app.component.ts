import { HttpClient, XhrFactory } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { linkSync } from 'node:fs';
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
      this.getAllActivePrompts();
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
      if (!item) {
        alert('Tekst lisamata');
        return;
      }
  
      let postData = {
        'text': item,
        'speaker_id': 4
      };

      let prompt = this.addPrompt(service, item);

      this.http.post(this.url, postData, {responseType:'blob'}).toPromise().then(
        data => {
          const link = window.document.createElement('a');
          link.href = window.URL.createObjectURL(data);
          link.download = prompt.randomid;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(link.href);
        });
    }

  //lisab promptile removed väärtuse
  removePrompt(prompt:any) {
    if (confirm('Kas soovid eemaldada?')) {
      this.server.deleteEvent(prompt).then( () => {
        this.getAllActivePrompts();
        (err:any) => console.log(err)
    });
    }
  }

  //lisab prompti andmebaasi infoga
  addPrompt (promptService:string, promptMessage:string) {
    const newPrompt = {
      service: promptService,
      randomid: this.getRandomID(),
      prompt: promptMessage,
      created: new Date(), 
      removed: null
    };
    this.server.createEvent(newPrompt).then(() => {
        this.getAllActivePrompts();
    });
    return newPrompt;
  }

  //tagastab ainult aktiivsed promptid, s.t remove on null
  private getAllActivePrompts() {
    this.server.getAllEvents().then((response:any) => {
      this.prompts = response.map((p:any) => {
          return p;
        });
     });
  }

  //random id
  private getRandomID() {
    return '_'+ Math.random().toString(36).substring(2,9);
  }
}
