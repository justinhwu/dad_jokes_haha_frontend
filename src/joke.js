class Joke{

  constructor(jokeObj){
    this.id = jokeObj.id
    this.joke = jokeObj.joke
    Joke.all.push(this)
  }

  static all = []

  static randJoke(){
    //makes a fetch request to the joke api, format is specified on the joke api website
    fetch(randomJoke,{
      method: 'get',
      headers: {
        'User-Agent': 'My Library (https://github.com/justinhwu/dad_jokes_haha_frontend)',
        'Accept': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(jokeObj => {
      //creates a new joke object with the attributes from the joke

      let newJoke = new Joke(jokeObj)
      newJoke.render()
    })
  }

  render(){
    //creates a new paragraph element and appends it to the joke div
    let paragraph = document.createElement('p')
    let randomJokeDiv = document.getElementById('random-joke-div')
    paragraph.dataset.jokeId = this.id
    paragraph.innerText = this.joke
    randomJokeDiv.appendChild(paragraph)
  }




}
