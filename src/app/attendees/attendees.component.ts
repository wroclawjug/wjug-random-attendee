import {Component} from '@angular/core';
import {AttendeesService} from './attendees.service';
import {Attendee, Meetup, Photo} from './attendee';
import {OAuthService} from 'angular-oauth2-oidc';

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
  eventId = 0;
  hideConfig = false;

  readonly notFoundPhoto: String = 'http://s.quickmeme.com/img/a8/a8022006b463b5ed9be5a62f1bdbac43b4f3dbd5c6b3bb44707fe5f5e26635b0.jpg';


  constructor(private attendeeService: AttendeesService, private oauthService: OAuthService) {
    this.oauthService.tryLogin().then(result => {
      if (this.oauthService.hasValidAccessToken()) {
        this.fetchMettupEvents();
      }
    });
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  realUrl(photo: Photo): String {
    try {
      return photo.thumb_link;
    } catch (err) {
      return this.notFoundPhoto;
    }
  }

  highResPhotoUrl(photo: Photo): String {
    let photoUrl = this.notFoundPhoto;
    if (photo) {
      if (photo.highres_link) {
        photoUrl = photo.highres_link;
      } else if (photo.photo_link) {
        photoUrl = photo.photo_link;
      } else {
        photoUrl = photo.thumb_link;
      }
    }
    return photoUrl;
  }

  toggleConfig(): void {
    this.hideConfig = !(this.hideConfig);
  }

  eventIdProvided(newEventId: number): void {
    this.eventId = newEventId;
    this.toggleConfig();
    this.fetchAttendees();
  }

  fetchMettupEvents(): void {
    this.attendeeService.getMeetupEvents()
      .then(meetupEvents => this.meetupEvents = meetupEvents);
  }

  fetchAttendees(): void {
    if (this.eventId > 0) {
      this.attendeeService.getAttendees(this.eventId)
        .then(attendees => this.attendees = attendees);
    }
  }

  randomAttendee(): void {
    if (this.attendees.length === 0) {
      alert('Patience, my young apprentice');
    } else if (this.attendees.length === this.usedIndexes.length) {
      alert('Everyone was already choosen');
    } else {
      let winner = this.attendees[this.randomAttendeeIndexWithoutRepetition()];
      this.attendeeService.getMemberFull(winner)
        .then(memberFull => {
          this.winners.unshift(winner);
        });
    }
  }

  clearRandomAttendees(): void {
    this.winners = [];
    this.loosers = [];
    this.usedIndexes = [];
  }

  notPresent(): void {
    // TODO: copy-paste from randomAttendee. some js method reference magic would be probably nice
    if (this.attendees.length === 0) {
      alert('Patience, my young apprentice');
    } else if (this.winners.length === 0) {
      alert('Try randomizing someone before marking them as absent first'); // TODO: how to show modals? :D
    } else {
      let notPresent: Attendee = this.winners[0]; // TODO: pop should also work
      this.winners.shift();
      this.loosers.unshift(notPresent);
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
}
