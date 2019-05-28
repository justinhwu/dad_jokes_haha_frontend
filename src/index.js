let rand_div = document.getElementById('random-joke-div')
let joke_button = document.getElementById('random-joke-button')
let add_to_list_button = document.getElementById('add-joke-to-list')
let user = undefined
var modal = document.getElementById("myModal");
let modal_content = document.getElementById('modal-content')
let login_form = document.getElementById('login-form-div')
let add_to_list_div = document.getElementById('add-to-list-div')
let checkbox_div = document.getElementById('checkbox-form-div')

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
      //hides the login form

      login_form.style.display = 'none'
      modal.style.display = "block"
      if (checkbox_div.childNodes.length <= 1 ){
      //If the checkbox elements do not exist, then the program will display the checkbox once upon click
        let create_new_list_button = document.createElement('button')
        create_new_list_button.id = 'create_new_list_button'
        create_new_list_button.className = 'ui teal button'
        create_new_list_button.innerText = 'Create a New List'
        let add_to_existing_list_button = document.createElement('button')
        add_to_existing_list_button.id = 'add_to_existing_list_button'
        add_to_existing_list_button.className = 'ui orange button'
        add_to_existing_list_button.innerText = 'Add to an Existing List'

        modal_content.append(create_new_list_button, add_to_existing_list_button)
        add_to_existing_list_button.addEventListener('click', displayLists)
        create_new_list_button.addEventListener('click', displayNewListForm)
      }
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


function displayLists(){
  if (checkbox_div.childNodes.length <= 1 ){

  let joke = document.querySelector(`p`)

  //creates prompt for user to choose a list to add to
  let add_to_list_header = document.createElement('h2')
  add_to_list_header.innerText = 'Please choose a list to add this joke to!'
  //creates form to submit
  let add_to_list_form = document.createElement('form')
  let unordered_list = document.createElement('ul')
  let submit = document.createElement('input')
  submit.type = 'submit'
  submit.value = 'Add to List'
  add_to_list_form.id = 'add_to_list_form'

  //Creates checkbox with each list item
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
  add_to_list_form.append(unordered_list, submit)
  checkbox_div.append(add_to_list_header, add_to_list_form)
  }
}

function displayNewListForm(){

  let add_to_list_form = document.createElement('form')
  let name_label = document.createElement('label')
  name_label.innerText = 'Name: '
  let name_input = document.createElement('input')
  name_input.type = 'text'
  let submit = document.createElement('input')
  submit.type = 'submit'
  submit.value = 'Create New List'
  add_to_list_form.append(name_label, name_input, submit)
  modal_content.prepend(add_to_list_form)

}
