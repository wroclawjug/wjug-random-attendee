import {Injectable} from "@angular/core";
import {Http, Jsonp} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Attendee} from "./attendee";

let and = '&';
let wjugUrlBase = 'https://api.meetup.com/Warszawa-JUG/events/';
let attendance = '/attendance?';
let apiKey = 'key=7e785063107f60423f18781a5566115';
let jsonpCallback = 'callback=JSONP_CALLBACK';

let lastMeetupId = 238766215; //used for testing

@Injectable()
export class AttendeesService {
  constructor(private http: Http, private jsonp: Jsonp) {
  }

  getAttendees(): Promise<Attendee[]> {
    return this.getLastMeetupId().then(lastId => {
      return this.jsonp.get(this.buildLastMeetupUrl(lastId))
        .toPromise()
        .then(response => response.json().data as Attendee[])
        .catch(this.handleError);
    });
  }

  getLastMeetupId(): Promise<number> {
  let allPastMeetups = wjugUrlBase + '?' + jsonpCallback + '&status=past';

    return this.jsonp.get(allPastMeetups)
      .toPromise()
      .then(response => {
        let meetups: Meetup[] = response.json().data as Meetup[];
        let lastPastMeetup = meetups.pop();
        return lastPastMeetup.id;
      })
      .catch(this.handleError);
  }

  //example meetup Url = 'https://api.meetup.com/Warszawa-JUG/events/238766215/attendance?callback=JSONP_CALLBACK&sig_id=204220190&sig=6b8aa26ce3a020b7649b438d4ec421958888e063';
  private buildLastMeetupUrl(meetupId: number) {
    return wjugUrlBase + meetupId + attendance + jsonpCallback + and + apiKey;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

class Meetup {
  id: number;
  name: string;
  link: string;
}
