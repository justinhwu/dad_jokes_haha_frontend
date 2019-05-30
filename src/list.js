class List {

  constructor(list){
    this.id = list.id
    this.name = list.name
    this.user_id = list.user_id
    this.jokes = list.jokes
    List.all.push(this)
  }
  static all = []

  static displayLists(){
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

    add_to_list_form.addEventListener('submit', (e)=>{
      e.preventDefault()
      let checkbox = document.querySelectorAll('.check-box')
      let checked_ids = []
      checkbox.forEach((element)=>{
        if (element.checked){
          checked_ids.push(element.id)
        }
      })

      let joke_id = document.querySelector('p')
      fetch(`http://localhost:3000/jokes`, {
        method:'post',
        headers:{
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          'id': joke_id.dataset.jokeId,
          'phrase': joke_id.innerText,
          'list_ids': checked_ids
        })
      })

    })

    //Creates checkbox with each list item
    List.all.forEach((list)=> {
      let list_element = document.createElement('li')
      list_element.className = 'checkbox-list-select'
      let list_header = document.createElement('header')
      list_header.innerText = list.name
      let list_box = document.createElement('input')
      list_box.id = list.id
      list_box.type = 'checkbox'
      list_box.className = 'check-box'
      list_element.append(list_header, list_box)
      unordered_list.appendChild(list_element)
    })
    add_to_list_form.append(unordered_list, submit)
    checkbox_div.append(add_to_list_header, add_to_list_form)
    }
  }

  // static getUserLists(){
  //   fetch(`http://localhost:3000.com/users/${user.id}`)
  //   .then(res => res.json())
  //   .then(listsObj => {debugger})
  // }
  //
  // renderLists(listsObj){
  //
  //   let arrayOfListObj = user.id
  //
  //   //create card elements
  //   //iterate thru user list names and each of their associated jokes
  //   let uiCardsDiv = document.getElementById('ui-cards-div')
  //   let listCard = document.createElement('div')
  //     listCard.className('card')
  //
  //
  //
  //     // <div class="card">
  //     //   <div class="content">
  //     //     <img class="right floated mini ui image" src="https://mickeygomez.com/wp-content/uploads/2012/06/dadrem.jpg?w=296">
  //     //     <div class="header">
  //     //       Name of List
  //     //     </div>
  //     //     //forEach list name, iterate through all joke_ids
  //     //     //user.lists()
  //     //     <div class="ui bulleted list">
  //     //       <div class="item">Joke 1</div>
  //     //       <div class="item">Joke 2</div>
  //     //       <div class="item">Joke 3</div>
  //     //     </div>
  //     //   </div>
  //     // </div>
  //
  //
  //   //append div 'items' to div 'ui bulleted list' elements to
  // }


}
