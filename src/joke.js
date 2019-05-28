class Joke{
  //how do I incorporate the api here?

  constructor(jokeObj){
    this.id = jokeObj.id
    this.phrase = jokeObj.joke
  }

  static randJoke(){
    fetch(randomJoke,{
      method: 'get',
      headers: {
        'User-Agent': 'My Library (https://github.com/justinhwu/dad_jokes_haha_frontend)',
        'Accept': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(jokeObj => {
      let newJoke = new Joke(jokeObj)
      newJoke.render()
    })
  }

  render(){
    let paragraph = document.createElement('p')
    let randomJokeDiv = document.getElementById('random-joke-div')
    paragraph.dataset.jokeId = this.id
    paragraph.innerText = this.phrase
    randomJokeDiv.appendChild(paragraph)
  }




}
