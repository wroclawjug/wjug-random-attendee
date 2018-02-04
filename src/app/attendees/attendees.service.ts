import {Injectable} from "@angular/core";
import {Http, Jsonp} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Attendee, Meetup, MemberFull} from "./attendee";

let and = '&';
let wjugUrlBase = 'https://api.meetup.com/WroclawJUG/events/';
let membersUrlBase = 'https://api.meetup.com/members/';
let attendance = '/attendance?';
let question = '?';
let apiKey = 'key=';
let jsonpCallback = 'callback=JSONP_CALLBACK';
let scrollRecentPast = 'scroll=recent_past';

@Injectable()
export class AttendeesService {
  constructor(private http: Http, private jsonp: Jsonp) {
  }

  getMettupEvents(token: string): Promise<Meetup[]> {
    return this.jsonp.get(this.buildMeetupEventsUrl(token))
      .toPromise()
      .then(response => response.json().data as Meetup[])
      .catch(this.handleError);
  }

  getAttendees(eventId: number, token: string): Promise<Attendee[]> {
      return this.jsonp.get(this.buildLastMeetupUrl(eventId, token))
        .toPromise()
        .then(response => response.json().data as Attendee[])
        .catch(this.handleError);
    }

  getMemberFull(attende: Attendee, token: string): Promise<MemberFull> {
    return this.jsonp.get(this.buildMemberFullUrl(attende.member.id, token))
      .toPromise()
      .then(response => response.json().data as MemberFull)
      .catch(this.handleError);
  }

  //example https://api.meetup.com/WroclawJUG/events/123/attendance?callback=__ng_jsonp__.__req0.finished&key=XYZ
  private buildLastMeetupUrl(meetupId: number, token: string) {
    return wjugUrlBase + meetupId + attendance + jsonpCallback + and + apiKey + token;
  }

  // example https://api.meetup.com/WroclawJUG/events?&sign=true&photo-host=public&page=20
  private buildMeetupEventsUrl(token: string) {
    return wjugUrlBase + question + jsonpCallback + and + scrollRecentPast + and + apiKey + token;
  }

  private buildMemberFullUrl(id: number, token: string) {
    return membersUrlBase + id + question + jsonpCallback + and + apiKey + token;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

