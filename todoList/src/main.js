import ToDoList from "./todolist.js";

var testData = [
  { id: "id1", name: "task1", isComplete: false },
  { id: "id2", name: "task2", isComplete: false },
  { id: "id3", name: "task3", isComplete: true },
  { id: "id4", name: "task4", isComplete: false }
];

var nodes = document.querySelectorAll( ".js-todo" );
var todoList1 = new ToDoList( nodes[0] );
var todoList2 = new ToDoList( nodes[1], testData );

