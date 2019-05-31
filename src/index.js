let randJokeParentDiv = document.getElementById('random-joke-parent-div')
let rand_div = document.getElementById('random-joke-div')
let joke_button = document.getElementById('random-joke-button')
let add_to_list_button = document.getElementById('add-joke-to-list')
let user = undefined
var modal = document.getElementById("myModal");
let modal_content = document.getElementById('modal-content')
let loginIcon = document.getElementById('ui-label')
let showListsIcon = document.getElementById('ui-label-for-lists')
let homeIcon = document.getElementById('ui-label-home')
let login_form = document.getElementById('login-form-div')
let add_to_list_div = document.getElementById('add-to-list-div')
let listCardsDiv = document.getElementById('ui-cards-div')

document.addEventListener('DOMContentLoaded', ()=>{
    //sets the user for the page as undefined (if user isn't logged in)
    //renders a random joke on the page
    initLoginModal()
    Joke.randJoke()
    //on click of the button, renders a new random joke
    joke_button.addEventListener('click', (e)=> {
      e.preventDefault()
      //finds the tag that holds the current joke displayed and destroys the currently displayed random joke to display a new one
      let paragraph = document.querySelector('p')
      rand_div.removeChild(paragraph)
      Joke.randJoke()
    })


    showListsIcon.onclick = function(){
      List.render()
    }
})

function initLoginModal(){

  // Get the buttons that open the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the login icon top-right, open the modal
  loginIcon.onclick = function () {
    if(User.all.length === 0){
      modal.style.display = "block";
      let usernameVal = document.getElementById('username')
      login_form.addEventListener('submit', (e)=>{
        e.preventDefault()
        User.fetchUser()
      })
      }
    }

  // when user clicks home icon, close list div and show random joke div
  homeIcon.onclick = function(){

    listCardsDiv.style.display = 'none';
    randJokeParentDiv.style.display = 'block';
  }


  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";

  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


  // When the user clicks the button, open the modal
  btn.onclick = function () {
    if (User.all.length !== 0 ){
      //hides the login form

      login_form.style.display = 'none'
      modal.style.display = "block"
      let hi = document.querySelector('.add_joke_div')
      if ( hi === null){
      //If the checkbox elements do not exist, then the program will display the checkbox once upon click
        let add_joke_div = document.createElement('div')
        add_joke_div.className = 'add_joke_div'
        let create_new_list_button = document.createElement('button')
        create_new_list_button.id = 'create_new_list_button'
        create_new_list_button.className = 'ui teal button'
        create_new_list_button.innerText = 'Create a New List'
        let add_to_existing_list_button = document.createElement('button')
        add_to_existing_list_button.id = 'add_to_existing_list_button'
        add_to_existing_list_button.className = 'ui orange button'
        add_to_existing_list_button.innerText = 'Add to an Existing List'

        add_joke_div.append(create_new_list_button, add_to_existing_list_button)
        modal_content.append(add_joke_div)
        add_to_existing_list_button.addEventListener('click', List.displayLists)
        create_new_list_button.addEventListener('click', List.displayNewListForm)
      }
    }
    else{
      modal.style.display = "block";
      login_form.addEventListener('submit', (e)=>{
        e.preventDefault()
        User.fetchUser()
      })
    }
  }
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";

  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
