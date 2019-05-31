class List {

  constructor(listObj){
    this.id = listObj.id
    this.name = listObj.name
    this.user_id = listObj.user_id
    this.jokes = listObj.jokes
    List.all.push(this)

  }
  static all = []

  //add event listener to the Your Lists icon which triggers this function
  static render(){
    if (User.all.length !== 0 ){
    randJokeParentDiv.style.display = 'none'

    //iterate through each list belonging to this user

    let thisUserLists = List.all
    thisUserLists.forEach(list => {

      let cardDiv = document.createElement('div')

        //create card elements
        //iterate thru user list names and each of their associated jokes

        let listCard = document.createElement('div')
          listCard.className ='card'
        let cardContentDiv = document.createElement('div')
          cardContentDiv.className = 'content'
        let img = document.createElement('img')
          img.setAttribute('src', 'https://mickeygomez.com/wp-content/uploads/2012/06/dadrem.jpg?w=296')
          img.className = 'right floated mini ui image'
        let headerDiv = document.createElement('div')
          headerDiv.className = 'header'
          headerDiv.innerHTML = `${list.name}`

        let ulJokeDiv = document.createElement('div')
        ulJokeDiv.className = 'ui bulleted list'

        list.jokes.forEach(joke => {
          let jokeListItem = document.createElement('div')
          jokeListItem.className = 'item'
          jokeListItem.dataset.id = joke.id
          jokeListItem.innerHTML = `${joke.phrase}`
          let deleteJokeButton = document.createElement('button')
          deleteJokeButton.type = 'button'
          deleteJokeButton.dataset.deleteJokeId = joke.id
          deleteJokeButton.innerText = 'X'
          jokeListItem.appendChild(deleteJokeButton)
          ulJokeDiv.appendChild(jokeListItem)

        })
        let btnDiv = document.createElement('div')
        btnDiv.className = 'ui bottom attached button'
        btnDiv.innerHTML = "<i class='trash alternate outline icon'></i> Delete List"
        btnDiv.dataset.id = list.id
        btnDiv.onclick = event => {
          fetch(`http://localhost:3000/lists/${list.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': `application/json`
            }
          })
          event.target.parentElement.remove()
        }
        //append div 'items' to div 'ui bulleted list', append bulleted list, img, div class header to content div

        listCard.append(img, headerDiv, ulJokeDiv, btnDiv)


        //append content div to cardDiv (class= card), append cardDiv to cardParent (look this up)
        let uiCardsDiv = document.getElementById('ui-cards-div')
        uiCardsDiv.append(listCard)
      })
      }
      else{
        modal.style.display = "block";
        login_form.addEventListener('submit', (e)=>{
          e.preventDefault()
          User.fetchUser()
        })
      }
    }

  static displayLists(){
    let checkbox_div = document.querySelector('.checkbox-form-div')
    if (checkbox_div === null){

    let checkbox_form_div = document.createElement('div')
    checkbox_form_div.className = 'checkbox-form-div'

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
    checkbox_form_div.append(add_to_list_header, add_to_list_form)
    modal_content.append(checkbox_form_div)
      }
    }
  }
