let rand_div = document.getElementById('random-joke-div')
let joke_button = document.getElementById('random-joke-button')
let add_to_list_button = document.getElementById('add-joke-to-list')


document.addEventListener('DOMContentLoaded', ()=>{
//still needs callback
    let user = undefined
    Joke.randJoke()
    joke_button.addEventListener('click', (e)=> {
      let paragraph = document.querySelector('p')
      e.preventDefault()
      rand_div.removeChild(paragraph)
      Joke.randJoke()
    })

    loginModal(user)
})


function loginModal(user){
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function() {
    if (user !== undefined){
      console.log('Hi')
    }
    else{
      modal.style.display = "block";
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
