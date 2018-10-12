import md5 from 'md5';

export class Hacker {
  constructor(hacker) {
    this._id = hacker._id;
    this.email_address = hacker.email_address;
    this.first_name = hacker.first_name;
    this.last_name = hacker.last_name;
    this.gender = hacker.gender;
    this.dob = hacker.dob;
    this.school = hacker.school;
    this.github = hacker.github;
    this.linkedin = hacker.linkedin;
    this.website = hacker.website;
    this.description = hacker.description;
    this.avatar = hacker.avatar || this.gravatarUrl;
    this.created_at = hacker.created_at;
    this.updated_at = hacker.updated_at;
  }

  get gravatarUrl() {
    return 'https://www.gravatar.com/avatar/' + md5(this.email_address.trim().toLowerCase())
  }
}
