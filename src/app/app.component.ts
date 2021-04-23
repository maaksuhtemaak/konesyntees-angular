import { HttpClient, XhrFactory } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';
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
      let postData = {
        'text': item,
        'speaker_id': 4
      }
      this.addPrompt(service, item);
      //allalaadimine hetkel kohalikult
      this.http.post(this.url, postData, {responseType:'blob'}).toPromise().then(
        data => {
          let temp = window.webkitURL.createObjectURL(data);
          let a = document.createElement('a');
          a.setAttribute('hidden','');
          a.setAttribute('href',temp);
          a.setAttribute('download','synteesitud_tekst')
          a.setAttribute('promptText',item);
          a.setAttribute('service', service)
          a.setAttribute('date', new Date().toString());
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })

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
      prompt: promptMessage,
      created: new Date(), 
      removed: null
    };
    this.server.createEvent(newPrompt).then(() => {
        this.getAllActivePrompts();
    });
  }

  //tagastab ainult aktiivsed promptid, s.t remove on null
  private getAllActivePrompts() {
    this.server.getAllEvents().then((response:any) => {
      this.prompts = response.map((p:any) => {
          return p;
      });
  });
  }
}
