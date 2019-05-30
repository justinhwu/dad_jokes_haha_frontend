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
        let img = document.createElement('div')
          img.setAttribute('src', 'https://mickeygomez.com/wp-content/uploads/2012/06/dadrem.jpg?w=296')

        let headerDiv = document.createElement('div')
          headerDiv.className = 'header'
          headerDiv.innerHTML = `${list.name}`

        let ulJokeDiv = document.createElement('div')
        ulJokeDiv.className = 'ui bulleted list'

        let listItems = list.jokes.forEach(joke => {
          let jokeListItem = document.createElement('div')
          jokeListItem.className = 'item'
          jokeListItem.dataset.id = joke.id
          jokeListItem.innerHTML = `${joke.phrase}`
        })

        let btnDiv = document.createElement('div')
        btnDiv.className = 'ui bottom attached button'
        btnDiv.innerHTML = `${<i class="trash alternate outline icon"></i> Delete List}`

        //append div 'items' to div 'ui bulleted list', append bulleted list, img, div class header to content div
        ulJokeDiv.append(listItems)

        listCard(img, headerDiv, ulJokeDiv)


        //append content div to cardDiv (class= card), append cardDiv to cardParent (look this up)
        let uiCardsDiv = document.getElementById('ui-cards-div')
        uiCardsDiv.append(listCard)
      })

    }











  //   showNewJokeForm(){
  //
  //   if (checkbox_div.childNodes.length <= 1 ){
  //   let joke = document.querySelector(`p`)
  //
  //   //creates prompt for user to choose a list to add to
  //   let addListForm_header = document.createElement('h2')
  //   addListForm_header.innerText = 'Please choose a list to add this joke to!'
  //   //creates form to submit
  //   let addListForm = document.createElement('form')
  //   let unordered_list = document.createElement('ul')
  //   let submit = document.createElement('input')
  //   submit.type = 'submit'
  //   submit.value = 'Add to List'
  //   addListForm_form.id = 'addListForm_form'
  //
  //   addListForm_form.addEventListener('submit', (e)=>{
  //     e.preventDefault()
  //     let checkbox = document.querySelectorAll('.check-box')
  //     let checked_ids = []
  //
  //     checkbox.forEach((element)=>{
  //       if (element.checked){
  //         debugger
  //         checked_ids.push(element.id)
  //       }
  //     })
  //
  //     let joke_id = document.querySelector('p')
  //     fetch(`http://localhost:3000/jokes`, {
  //       method:'post',
  //       headers:{
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json'
  //       },
  //       body: JSON.stringify({
  //         'id': joke_id.dataset.jokeId,
  //         'joke': joke_id.innerText,
  //         'list_ids': checked_ids
  //       })
  //     })
  //
  //   })
  //
  //   //Creates checkbox with each list item
  //   List.all.forEach((list)=> {
  //     let list_element = document.createElement('li')
  //     list_element.className = 'checkbox-list-select'
  //     let list_header = document.createElement('header')
  //     list_header.innerText = list.name
  //     let list_box = document.createElement('input')
  //     list_box.id = list.id
  //     list_box.type = 'checkbox'
  //     list_element.append(list_header, list_box)
  //     unordered_list.appendChild(list_element)
  //   })
  //   addListForm_form.append(unordered_list, submit)
  //   checkbox_div.append(addListForm_header, addListForm_form)
  //   }
  // }




  // new(){
  //   // List.new accesses the inputs of Justin's displayNewListForm() in index.js
  //
  //   // addListForm is the var, so access the inputs and post
  // }
