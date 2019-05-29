class User {
  constructor(userObject){
    this.id = userObject.id
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
    let loginBoxDiv = document.getElementById('login-div')

    let addToListActionDiv = document.getElementById('add-to-list-div')

    let loggedInListsDiv = document.getElementById('logged-in-lists-div')

  }

  static fetchUser(){
    let usernameVal = document.getElementById('username')
    fetch(loginRailsApi, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
      ,
      body: JSON.stringify({
        'username': usernameVal.value
      })
    })
    .then(resp=> resp.json())
    .then(userObj => {User.handleLogin(userObj)})
  }

  static handleLogin(userObj){
    if (!userObj.error){
      modal.style.display = "none"
      let new_user = new User(userObj)
      userObj.lists.forEach((list)=> {
        let new_list = new List(list)
        if (list.jokes.length != 0){
          list.jokes.forEach((joke_obj)=>{
            let new_joke = new Joke(joke_obj)
          })
        }
      })
    }
    else{
      alert(`${userObj.error}, please enter a valid username!`)
    }
  }


}
