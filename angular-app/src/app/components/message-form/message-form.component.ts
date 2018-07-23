import { Component, OnInit, Input } from '@angular/core';
import { Message } from '@app/models';
import { DialogflowService, FoodmenuService } from '@app/services';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent {

  @Input('message') private message: Message;

  @Input('messages') private messages: Message[];

  constructor(private dialog : DialogflowService, private menu : FoodmenuService) {}

  public sendMessage(): void {

    const newMesssage = new Message(this.message.content, '/assets/images/user.png', new Date());
    this.messages.push(newMesssage);
    this.message.content = '';
    this.dialog.getResponse(newMesssage.content).subscribe((resp) => {
      //console.log(resp);
      const speech = resp.result.fulfillment.speech;
      if(resp.result.parameters.day){
        const tag = resp.result.parameters.day;
        const liste = this.menu.getMenuForDay(tag);
        let counter = 1;
        for(let items in liste) {
          if(liste[items]){
            let text = (counter++) +": "+ liste[items].title + ". Für nur: " + liste[items].price
            const respMessage = new Message(text, '/assets/images/user.png', new Date());
            this.messages.push(respMessage);
          }
        }
      } else {
        const respMessage = new Message(speech, '/assets/images/user.png', new Date());
        this.messages.push(respMessage);
      }
    });

  }


}
