//Data Transfer Object
module.exports = class UserDto {
  email;
  id;
  isActivated;

  constructor(model) {
    // console.log("model:::", model);
    this.email = model.email;
    this.id = model._id.valueOf();
    this.isActivated = model.isActivated;
  }
};
