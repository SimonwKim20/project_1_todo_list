const form = document.querySelector('#item_form');
const item_input = document.querySelector('#item_input');
const item_list = document.querySelector('.item-list');
const feedback = document.querySelector('.feedback');
const clear_button = document.querySelector('#clear_list');

// adding event listeners
let todo = []; // Empty variable to store user input

const handle_item = function(item_name) {
  const items = item_list.querySelectorAll('.item');

  items.forEach(function(item) { // .forEach is a type of loop, executing given function once for each element in an array in ascending order

    if (item.querySelector('.item-name').textContent === item_name) {

      // complete item case
      item.querySelector('.complete-item').addEventListener('click', function() {
        item.querySelector('.item-name').classList.toggle('completed');
        this.classList.toggle('visibility');
      });

      // edit item case
      item.querySelector('.edit-item').addEventListener('click', function() {
        item_input.value = item_name;
        item_list.removeChild(item);

        todo = todo.filter(function(item) {
          return item !== item_name;
        });
      });

      // delete item case
      item.querySelector('.delete-item').addEventListener('click', function() {
        debugger;
        item_list.removeChild(item);

        todo = todo.filter(function(item) {
          return item !== item_name;
        });

        showFeedback('item delete', 'success');
      })
    }
  })
}

// utilising local storage so that todo list is saved
const remove_item = function(item) {
  console.log(item);
  const remove_index = (todo.indexOf(item));
  console.log(remove_index);
  todo.splice(remove_index, 1);
}

const get_list = function(todo) {
  item_list.innerHTML = '';
  todo.forEach(function(item) {
    item_list.insertAdjacentHTML('beforeend', `<div class="item my-3"><h5 class="item-name text-capitalize">${item}</h5><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a></div></div>`);
    handle_item(item);
  });
}

const get_local_storage = function() {

  const todo_storage = localStorage.getItem('todo');
  if (todo_storage === 'undefined' || todo_storage === null) {
    todo = [];
  } else {
    todo = JSON.parse(todo_storage);
    get_list(todo);
  }
}

const set_local_storage = function(todo) {
  localStorage.setItem('todo', JSON.stringify(todo));
}

get_local_storage();

// add item to list case, including local storage
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const item_name = item_input.value;

  if (item_name.length === 0) {
    feedback.innerHTML = 'Please enter a valid value.';
    feedback.classList.add('show-item', 'alert-danger');
    setTimeout(
      function() {
        feedback.classList.remove('show-item');
      }, 3000);
  } else {
    todo.push(item_name);
    set_local_storage(todo);
    get_list(todo);
  }

  item_input.value = '';
});


// clear/delete all items case
clear_button.addEventListener('click', function() {
  todo = [];
  localStorage.clear();
  get_list(todo);
})
