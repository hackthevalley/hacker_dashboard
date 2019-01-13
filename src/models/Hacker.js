import md5 from 'md5';
import Model from "./Model";


export class Hacker extends Model {
  constructor(data, keys = [
    "_id",
    "email_address",
    "first_name",
    "last_name",
    "gender",
    "dob",
    "school",
    "github",
    "linkedin",
    "website",
    "description",
    "avatar",
    "applications",
    "created_at",
    "updated_at",
    "phone_number"
  ]) {
    super(data, keys);
    if(!this.avatar) {
      this.initGravatarUrl();
    }
  }

  initGravatarUrl() {
    this.set('avatar', 'https://www.gravatar.com/avatar/' + md5(this.email_address.trim().toLowerCase()) + "?s=200");
  }

  shallowCopy() {
    return new Hacker(this.properties, this.keys);
  }
}
