export class Attendee {
  status: String;
  member: Member;
  rsvp: Rsvp;
}

export class Member {
  id: number;
  name: String;
  photo: Photo;
  photoFull: String;
}

export class MemberFull {
  id: number;
  name: String;
  photo: PhotoFull;
}

export class Photo {
  thumb: String;
}

export class PhotoFull {
  highres_link: String;
  photo_link: String;
  thumb_link: String;
}

export class Meetup {
  id: number;
  name: string;
  link: string;
}

export class Rsvp {
  response: String;
}
