class User {
  constructor(fullName, username, email){
    this.fullName = fullName
    this.username = username
    this.email = email
  }

  element(){
    //build html here (ex: create/locate elements, add properties, add children, append)
    let loginBoxDiv = document.getElementById('login-div')

    let addToListActionDiv = document.getElementById('add-to-list-div')

    let loggedInListsDiv = document.getElementById('logged-in-lists-div')

    // <div class="ui middle aligned center aligned grid">
    //   <div class="column">
    //     <h2 class='ui teal image header'>
    //       <img src="https://mickeygomez.com/wp-content/uploads/2012/06/dadrem.jpg?w=296" class="image" alt="dad-smile">
    //       <div class="content">Log in to Dad Jokes</div>
    //     </h2>
    //
    //   </div>
    // </div>


  }
}
