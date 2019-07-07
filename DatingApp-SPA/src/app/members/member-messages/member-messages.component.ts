import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { Message } from './../../_models/message';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];

  constructor(private userService: UserService, private authService: AuthService,
     private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
    .subscribe(mesages => {
      this.messages = mesages;
    },
    error => {
      this.alertify.error(error);
    });
  }

}
