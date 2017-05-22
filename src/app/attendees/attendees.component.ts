import {Component, OnInit} from "@angular/core";
import {AttendeesService} from "./attendees.service";
import {Attendee} from "./attendee";

@Component({
  selector: 'attendees',
  styleUrls: ['./attendees.component.css'],
  templateUrl: './attendees.component.html',
})
export class AttendeesComponent implements OnInit {
  attendees: Attendee[] = [];
  winners: Attendee[] = [];
  loosers: Attendee[] = [];
  usedIndexes: number[] = [];

  constructor(private attendeeService: AttendeesService) {
  }

  ngOnInit(): void {
    this.attendeeService.getAttendees()
      .then(attendees => this.attendees = attendees);
  }

  randomAttendee(): void {
    if (this.attendees.length == 0) {
      alert("Patience, my young apprentice")
    } else {
      this.winners.push(this.attendees[this.randomAttendeeIndexWithoutRepetition()]);
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
    } else {
      let notPresent: Attendee = this.winners[this.winners.length - 1];
      this.loosers.push(notPresent);
      this.winners.splice(-1, 1);
    }
  }
}
