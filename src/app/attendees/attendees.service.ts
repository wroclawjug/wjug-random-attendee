import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {Attendee, Meetup, Member} from './attendee';

let corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
let wjugUrlBase = `${corsAnywhere}https://api.meetup.com/WroclawJUG/events/`;
let membersUrlBase = `${corsAnywhere}https://api.meetup.com/members/`;

@Injectable()
export class AttendeesService {
  constructor(private httpClient: HttpClient) {
  }

  getMeetupEvents(): Promise<Meetup[]> {
    return this.httpClient.get<Meetup[]>(this.buildMeetupEventsUrl())
      .toPromise()
      .catch(this.handleError);
  }

  getAttendees(eventId: number): Promise<Attendee[]> {
    console.log('getAttendees');
    return this.httpClient.get<Attendee[]>(this.buildLastMeetupUrl(eventId))
      .toPromise()
      .catch(this.handleError);
  }

  getMemberFull(attende: Attendee): Promise<Member> {
    return this.httpClient.get<Member>(this.buildMemberFullUrl(attende.member.id))
      .toPromise()
      .catch(this.handleError);
  }

  // example https://api.meetup.com/WroclawJUG/events/123/attendance?callback=__ng_jsonp__.__req0.finished&key=XYZ
  private buildLastMeetupUrl(meetupId: number) {
    return `${wjugUrlBase}${meetupId}/attendance`;
  }

  // example https://api.meetup.com/WroclawJUG/events?&sign=true&photo-host=public&page=20
  private buildMeetupEventsUrl() {
    return `${wjugUrlBase}?scroll=recent_past`;
  }

  private buildMemberFullUrl(id: number) {
    return `${membersUrlBase}${id}`;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
