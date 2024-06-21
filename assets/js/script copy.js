// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

console.log(taskList)

function saveTaskstoStorage (tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function readTasksFromStorage() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (!tasks) {
    tasks = [];
    saveTaskstoStorage (tasks);
  }
  return tasks;
  
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
  return crypto.randomUUID();
}
// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>').addClass ('card task-card draggable my-3').attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.task);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.description);
    const cardDueDate =$('<p>').addClass('card-text').text(task.dueDate)
    const taskDeleteBtn = $('<button>').addClass('btn btn-danger delete').text('Delete').attr('data-task-id', task.id);
    taskDeleteBtn.on('click', handleDeleteTask);

    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

        if (now.isSame(taskDueDate,'day')) {
            taskCard.addClass('bg-warning text-white');
        }
        else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            taskDeleteBtn.addClass('border-light');
        }
    }
    cardBody.append(cardDescription, cardDueDate, taskDeleteBtn);
    taskCard.append(cardHeader, cardBody);

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const tasks = readTasksFromStorage();

  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('done-cards');
  doneList.empty();

  for (let task of tasks) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    }
    else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    }
    else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  }



$('.draggable').draggable({
  opacity: 0.7,
  zIndex: 100,
  helper: function (e) {
    const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');

    return original.clone().css({
      width: original.outerWidth(),
    })
  }
})
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    var dialog, form,
 
      task = $("#task"),
      dueDate = $("#dueDate"),
      description = $( "#description" ),
      allFields = $( [] ).add( task ).add( dueDate ).add( description ),
      tips = $( ".validateTips" );
 
    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
 
    function addTask() {
        // let taskList = JSON.parse(localStorage.getItem("tasks"));
        let filledInput = true;

        if ((task.val === "") || (dueDate.val === "") || (description.val === "")) {
            alert("please make sure all fields are filled in."); 
            filledInput = false;
        }
        else {
            filledInput = true;
        }

        let taskEntry = {
            id: generateTaskId(),
            task: $('#task').val(),
            dueDate: $('#dueDate').val(),
            description: $('#discription').val(),
            status:'in-progress',
        };
        
        $('#task').value = '';
        $('dueDate').value ='';
        $('#discription').value ='';
      
        if (filledInput) {
            taskList.push(taskEntry);
            localStorage.setItem('tasks', JSON.stringify(taskList));
            dialog.dialog("close");
            renderTaskList();
        }
    }
 
    dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 400,
      width: 350,
      modal: true,
      buttons: {
        "Create a task": addTask,
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
        allFields.removeClass( "ui-state-error" );
      }
    });

 
    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      addTask();
    });
 
    $( "#create-task" ).button().on( "click", function() {
      dialog.dialog( "open" );
    });
  };
  
    


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
 const taskID = $(this).attr('data-project-id');
 const tasks = readTasksFromStorage();

 tasks.forEach((task) => {
  if (task.id === task.id) {
    tasks.splice(tasks.indexOf(tasks), 1);
  }
 })

 saveTaskstoStorage (tasks);
 renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
 const tasks = readTasksFromStorage();
 const taskId = ui.draggable[0].dataset.projectId;
 const newStatus = event.target.id;

 for (let task of tasks) {
  if (projectId === taskId) {
    task.status = newStatus;
  }
 }
 localStorage.setItems('tasks', JSON.stringify(tasks));
 renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  readTasksFromStorage ();
  renderTaskList ();
  handleAddTask();
});

// function init(){
//   readTasksFromStorage ();
// }


// init()
