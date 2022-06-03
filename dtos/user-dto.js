//Data Transfer Object
module.exports = class UserDto {
  email;
  id;
  roles;
  // isActivated;

  constructor(model) {
    // console.log("model:::", model);
    this.email = model.email;
    this.id = model._id.valueOf();
    this.roles = model.roles;
    // this.isActivated = model.isActivated;
  }
};
