import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/toPromise";
import {Attendee, Meetup, MemberFull} from "./attendee";

let and = '&';
let wjugUrlBase = 'https://api.meetup.com/WroclawJUG/events/';
let membersUrlBase = 'https://api.meetup.com/members/';
let attendance = '/attendance?';
let question = '?';
let apiKey = 'key=';
let jsonpCallback = 'callback=JSONP_CALLBACK';
let jsonpCallbackName = 'JSONP_CALLBACK';
let scrollRecentPast = 'scroll=recent_past';

@Injectable()
export class AttendeesService {
  constructor(private httpClient: HttpClient) {
  }

  getMeetupEvents(token: string): Promise<Meetup[]> {
    console.log('getMeetupEvents');
    return this.httpClient.jsonp(this.buildMeetupEventsUrl(token), jsonpCallbackName)
      .toPromise()
      .then(this.handleMeetupEvents)
      .catch(this.handleError);
  }

  handleMeetupEvents(response: any): Meetup[] {
    if (response.meta.status != 200) {
      return []
    }
    return response.data as Meetup[];
  }

  getAttendees(eventId: number, token: string): Promise<Attendee[]> {
      console.log('getAttendees');
      return this.httpClient.jsonp(this.buildLastMeetupUrl(eventId, token), jsonpCallbackName)
        .toPromise()
        .then(this.handleAttendees)
        .catch(this.handleError);
    }

  handleAttendees(response: any): Attendee[] {
    if (response.meta.status != 200) {
      return []
    }
    let attendees: Attendee[] = response.data;
    return attendees.filter(attendee => attendee.rsvp.response === 'yes')
  }

  getMemberFull(attende: Attendee, token: string): Promise<MemberFull> {
    return this.httpClient.jsonp(this.buildMemberFullUrl(attende.member.id, token), jsonpCallbackName)
      .toPromise()
      .then((response: any) => response.data as MemberFull)
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

