let rand_div = document.getElementById('random-joke-div')
let joke_button = document.getElementById('random-joke-button')
let add_to_list_button = document.getElementById('add-joke-to-list')
let user = undefined
var modal = document.getElementById("myModal");
let modal_content = document.getElementById('modal-content')
let login_form = document.getElementById('login-form')
let add_to_list_div = document.getElementById('add-to-list-div')

document.addEventListener('DOMContentLoaded', ()=>{
//still needs callback
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

})

function initLoginModal(){

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function() {
    if (user !== undefined){
      login_form.style.display = 'none'
      modal.style.display = "block";
      let joke = document.querySelector(`p`)
      let add_to_list_form = document.createElement('form')
      let add_to_list_header = document.createElement('h2')
      add_to_list_header.innerText = 'Please choose a list to add this joke to!'
      let unordered_list = document.createElement('ul')
      add_to_list_form.id = 'add_to_list_form'
      user.lists.forEach((list)=> {
        let list_element = document.createElement('li')
        let list_header = document.createElement('header')
        list_header.innerText = list.name
        let list_box = document.createElement('input')
        list_box.id = list.id
        list_box.type = 'checkbox'
        list_element.append(list_header, list_box)
        unordered_list.appendChild(list_element)
      })
      modal_content.append(add_to_list_header, unordered_list)
    }
    else{
      modal.style.display = "block";
      let usernameVal = document.getElementById('username')
      login_form.addEventListener('submit', (e)=>{
        e.preventDefault()
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
        .then(userObj => {handleLogin(userObj)})
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

function handleLogin(userObj){
  if (!userObj.error){
    user = userObj
    modal.style.display = "none"
  }
  else{
    alert(`${userObj.error}, please enter a valid username!`)
  }
}
