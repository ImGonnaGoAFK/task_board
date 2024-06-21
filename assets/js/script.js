// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

function readTasksFromStorage() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  console.log(tasks);
  if (!tasks) {
    tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
  return tasks;
  
}
$( function() {
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
        let taskList = JSON.parse(localStorage.getItem("tasks"));
        let filledInput = true;

        if ((task.val === "") || (dueDate.val === "") || (description.val === "")) {
            alert("please make sure all fields are filled in."); 
            filledInput = false;
        }
        else {
            filledInput = true;
        }

        let taskEntry = {
            task: $('#task').val(),
            dueDate: $('#dueDate').val(),
            description: $('#discription').val(),
        };
        
        $('#task').value = '';
        $('dueDate').value ='';
        $('#discription').value ='';
      
        if (filledInput) {
            taskList.push(taskEntry);
            localStorage.setItem('tasks', JSON.stringify(taskList));
            dialog.dialog("close");
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
  } );


// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>').addClass ('card task-card draggable my-3').attr('data-task-id', task-id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.type);
    const cardDueDate =$('<p>').addClass('card-text').text(task.cardDueDate)
    const taskDeleteBtn = $('<button>').addClass('btn btn-danger delete').text('Delete').attr('data-task-id', task-id);
    taskDeleteBtn.on('click', handleDeleteTask);

    if (task.dueDate && project.status !== 'done') {
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
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}



// Todo: create a function to handle adding a new task
function handleAddTask(event){}
    


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
 
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

function init(){
  readTasksFromStorage ();
}


init()
