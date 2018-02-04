import {Component} from "@angular/core";
import {AttendeesService} from "./attendees.service";
import {Attendee, Photo, Meetup, MemberFull} from "./attendee";

@Component({
  selector: 'attendees',
  styleUrls: ['./attendees.component.css'],
  templateUrl: './attendees.component.html',
})
export class AttendeesComponent {
  meetupEvents: Meetup[] = [];
  attendees: Attendee[] = [];
  winners: Attendee[] = [];
  loosers: Attendee[] = [];
  usedIndexes: number[] = [];
  eventId: number = 0;
  token: string = '';
  hideConfig: boolean = false;

  readonly notFoundPhoto = 'http://s.quickmeme.com/img/a8/a8022006b463b5ed9be5a62f1bdbac43b4f3dbd5c6b3bb44707fe5f5e26635b0.jpg';


  constructor(private attendeeService: AttendeesService) {
  }

  realUrl(photo: Photo): String {
    try {
      return photo.thumb;
    } catch (err) {
      return this.notFoundPhoto;
    }
  }

  toggleConfig(): void {
    this.hideConfig = !(this.hideConfig);
  }

  tokenProvided(token: string): void {
    this.token = token;
    this.fetchMettupEvents();
  }

  eventIdProvided(newEventId: number): void {
    this.eventId = newEventId;
    this.fetchAttendees();
  }

  fetchMettupEvents(): void {
    if (this.token.length != 0) {
      this.attendeeService.getMettupEvents(this.token)
        .then(meetupEvents => this.meetupEvents = meetupEvents);
    }
  }

  fetchAttendees(): void {
    if (this.eventId > 0 && this.token.length != 0) {
      this.attendeeService.getAttendees(this.eventId, this.token)
        .then(attendees => this.attendees = attendees);
    }
  }

  randomAttendee(): void {
    if (this.attendees.length == 0) {
      alert('Patience, my young apprentice');
    } else if (this.attendees.length == this.usedIndexes.length) {
      alert('Everyone was already choosen');
    } else {
      let winner = this.attendees[this.randomAttendeeIndexWithoutRepetition()];
      this.attendeeService.getMemberFull(winner, this.token)
        .then(memberFull => {
          if (memberFull.photo) {
            if (memberFull.photo.highres_link) {
              winner.member.photoFull = memberFull.photo.highres_link;
            } else if (memberFull.photo.photo_link) {
              winner.member.photoFull = memberFull.photo.photo_link;
            } else {
              winner.member.photoFull = memberFull.photo.thumb_link;
            }
          } else {
            winner.member.photoFull = this.notFoundPhoto;
          }
          this.winners.unshift(winner);
        });
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
