let rand_div = document.getElementById('random-joke-div')
let joke_button = document.getElementById('random-joke-button')


document.addEventListener('DOMContentLoaded', ()=>{
//still needs callback
Joke.randJoke()
joke_button.addEventListener('click', (e)=> {
  let paragraph = document.querySelector('p')
  e.preventDefault()
  rand_div.removeChild(paragraph)
  Joke.randJoke()
  })
})
