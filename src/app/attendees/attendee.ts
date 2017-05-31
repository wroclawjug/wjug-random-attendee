export class Attendee {
  status: String;
  member: Member;
}

export class Member {
  id: number;
  name: String;
  photo: Photo;
}

export class Photo {
  thumb: String;
}
