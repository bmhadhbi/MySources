import { Message } from "./message.model";

export class ChatUser {
  constructor(
    from: string,
    photo: string,
    subject: string) {
    this.from = from;
    this.photo = photo;
    this.subject = subject;

  }

  public from: string;
  public photo: string;
  public subject: string;
}

export class ChatMessage {
  constructor(
    type: string,
    msg: Message,
    date: Date) {
    this.type = type;
    this.msg = msg;
    this.date = date;
  }
  public type: string;
  public msg: Message;
  public date: Date;
}
