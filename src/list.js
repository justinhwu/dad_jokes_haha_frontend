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
    let find_card = document.querySelector('.card')
    if (User.all.length !== 0 ){
    if(find_card === null){
    listCardsDiv.style.display = 'table'
    randJokeParentDiv.style.display = 'none'

    //iterate through each list belonging to this user

    let thisUserLists = List.all
    thisUserLists.forEach(list => {

      let cardDiv = document.createElement('div')

        //create card elements
        //iterate thru user list names and each of their associated jokes

        let listCard = document.createElement('div')
          listCard.className ='card'
          listCard.style.display = 'inline-table'
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
          deleteJokeButton.onclick = (event) => {
            event.preventDefault()
            let list_joke = event.currentTarget
            fetch(`http://localhost:3000/joke_lists/delete`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify({
                'list_id': list.id,
                'joke_id': joke.id
              })
            })
            list_joke.parentElement.remove()
          }
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
          if (listCardsDiv.style.display === 'none'){
            listCardsDiv.style.display = 'table'
            randJokeParentDiv.style.display = 'none'
          }
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
    add_to_list_form.id = 'add_to_list_form'

    add_to_list_form.addEventListener('submit', (e)=>{
      e.preventDefault()
      modal.style.display = 'none'
      let checkbox = document.querySelectorAll('.check-box')
      let checked_ids = []
      checkbox.forEach((element)=>{
        if (element.checked){
          checked_ids.push(element.id)
          element.checked = false
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
      let list_label = document.createElement('label')
      list_label.innerText = list.name
      debugger
      let list_box = document.createElement('input')
      list_box.id = list.id
      list_box.type = 'checkbox'
      list_box.className = 'check-box'
      list_element.append(list_label, list_box)
      unordered_list.appendChild(list_element)
    })
    let submit = document.createElement('input')
    submit.type = 'submit'
    submit.value = 'Add to List'
    add_to_list_form.append(unordered_list, submit)
    checkbox_form_div.append(add_to_list_label, add_to_list_form)
    modal_content.append(checkbox_form_div)
      }
    }

    static displayLists(){
      let checkbox_div = document.querySelector('.checkbox-form-div')
      if (checkbox_div === null){
      let checkbox_form_div = document.createElement('div')
      checkbox_form_div.className = 'checkbox-form-div'
      checkbox_form_div.style.display = 'block'

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
        modal.style.display = 'none'
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
      else{
        if (checkbox_div.style.display === 'block'){
          checkbox_div.style.display = 'none'
        }
        else if(checkbox_div.style.display === 'none'){
          checkbox_div.style.display = 'block'
        }
      }
      }

    static displayNewListForm(){
      let hi = document.querySelector('.create_new_list_div')
        if(hi === null){
          let create_new_list_div = document.createElement('div')
          create_new_list_div.className = 'create_new_list_div'
          create_new_list_div.style.display = 'block'
          let create_new_list_form = document.createElement('form')
          create_new_list_form.id = 'create_new_list_form'
          create_new_list_form.addEventListener('submit', (e)=>{
            e.preventDefault()
            modal.style.display = 'none'
            let find_list_name = document.getElementById('list-name')
            fetch('http://localhost:3000/lists', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify({
                'name': find_list_name.value,
                'user_id': User.all[0].id
              })
            })
              .then(resp => resp.json())
              .then(listObj => {
                let new_list_instance = new List(listObj)
              })
              create_new_list_form.reset()
          })
          let name_label = document.createElement('label')
          name_label.innerText = 'Name: '
          let name_input = document.createElement('input')
          name_input.type = 'text'
          name_input.id = 'list-name'
          let submit = document.createElement('input')
          submit.type = 'submit'
          submit.value = 'Create New List'
          create_new_list_form.append(name_label, name_input, submit)
          create_new_list_div.appendChild(create_new_list_form)
          modal_content.appendChild(create_new_list_div)
        }
        else{
          if (hi.style.display === 'block'){
            hi.style.display = 'none'
          }
          else if(hi.style.display === 'none'){
            hi.style.display = 'block'
          }

        }

      }

  }
