class User {
  constructor(userObject){
    this.first_name = userObject.first_name
    this.last_name = userObject.last_name
    this.username = userObject.username
    this.age = userObject.age
    this.email = userObject.email
    User.all.push(this)
  }

  static all = []

  element(){
    //build html here (ex: create/locate elements, add properties, add children, append)

  }
}
