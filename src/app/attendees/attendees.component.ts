import {Component} from "@angular/core";
import {AttendeesService} from "./attendees.service";
import {Attendee, Photo} from "./attendee";

@Component({
  selector: 'attendees',
  styleUrls: ['./attendees.component.css'],
  templateUrl: './attendees.component.html',
})
export class AttendeesComponent {
  attendees: Attendee[] = [];
  winners: Attendee[] = [];
  loosers: Attendee[] = [];
  usedIndexes: number[] = [];
  eventId: number = 0;
  token: string = '';
  hideConfig: boolean = false;

  constructor(private attendeeService: AttendeesService) {
  }

  realUrl(photo: Photo): String {
    try {
      return photo.thumb;
    } catch (err) {
      return 'http://s.quickmeme.com/img/a8/a8022006b463b5ed9be5a62f1bdbac43b4f3dbd5c6b3bb44707fe5f5e26635b0.jpg'
    }
  }

  toggleConfig(): void {
    this.hideConfig = !(this.hideConfig);
  }

  setToken(token: string): void {
    this.token = token;
  }

  fetchAttendees(newEventId: number): void {
    this.eventId = newEventId;
    this.attendeeService.getAttendees(this.eventId, this.token)
      .then(attendees => this.attendees = attendees);
  }

  randomAttendee(): void {
    if (this.attendees.length == 0) {
      alert("Patience, my young apprentice")
    } else {
      this.winners.unshift(this.attendees[this.randomAttendeeIndexWithoutRepetition()]);
    }
  }

  private randomAttendeeIndexWithoutRepetition() {
    let randomAttendeeIndex: number;
    do {
      randomAttendeeIndex = Math.floor(Math.random() * this.attendees.length - 1) + 1;
    } while (this.usedIndexes.indexOf(randomAttendeeIndex) >= 0);

    this.usedIndexes.push(randomAttendeeIndex);
    return randomAttendeeIndex;
  }

  clearRandomAttendees(): void {
    this.winners = [];
    this.loosers = [];
    this.usedIndexes = [];
  }

  notPresent(): void {
    //TODO: copy-paste from randomAttendee. some js method reference magic would be probably nice
    if (this.attendees.length == 0) {
      alert("Patience, my young apprentice")
    } else if (this.winners.length == 0) {
      alert("Try randomizing someone before marking them as absent first") //TODO: how to show modals? :D
    } else {
      let notPresent: Attendee = this.winners[0]; //TODO: pop should also work
      this.winners.shift();
      this.loosers.unshift(notPresent);
    }
  }
}
