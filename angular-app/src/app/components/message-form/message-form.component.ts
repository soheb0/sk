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
    let respMessage;
    this.dialog.getResponse(newMesssage.content).subscribe((resp) => {
      console.log(resp.result);
      if(resp.result.parameters.day && resp.result.parameters.pick){
        let tag = resp.result.fulfillment.day;
        let pick = resp.result.fulfillment.pick;
        respMessage = new Message(this.menu.getMenuForDay(tag,pick), '/assets/images/user.png', new Date());
      } 
      if(resp.result.parameters.day && !resp.result.parameters.pick){
        let tag = resp.result.fulfillment.day;
        respMessage = new Message(this.menu.getMenuForDay(tag,""), '/assets/images/user.png', new Date());
      }
      if(!resp.result.parameters.day && resp.result.parameters.pick){
        let pick = resp.result.fulfillment.pick;
        respMessage = new Message(this.menu.getMenuForDay("",pick), '/assets/images/user.png', new Date());
      } else {
        let speech = resp.result.fulfillment.speech;
        respMessage = new Message(speech, '/assets/images/user.png', new Date());
      }
      this.messages.push(respMessage);
    });

  }


}
