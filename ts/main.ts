// @ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#due-date");
picker.setMin(new Date()); // Set to today's date

class ToDoItem{
    title:string;
    dueDate:Date;
    isCompleted:boolean;
}

window.onload = function(){
    let addItem = document.getElementById("add")
    addItem.onclick = main;
    
    loadSavedItems();
}

function clear(){
    
    let incompleteItems = document.getElementById("incomplete-items")
    incompleteItems.innerHTML = "";

    let completeItems = document.getElementById("complete-items")
    completeItems.innerHTML = "";

    alert("You cleared the page!")
}


function loadSavedItems(){
    let itemArray = getToDoItems(); // read from storage
    
    for(let i = 0; i < itemArray.length; i++){
        let currItem = itemArray[i];
        displayToDoItem(currItem);
    }
    
}

function main(){
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}

function getInputById(id:string):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}

/**
 * Check form data is valid
 */
function isValid():boolean{
    return true;
}

/**
 * Get all input off form and wrap in
 * a ToDoItem object
 */
function getToDoItem():ToDoItem{
    let myItem = new ToDoItem();
        // get title from user
        let titleInput = getInput("title");
        myItem.title = titleInput.value;

        // get due date
        let dueDateInput = getInput("due-date");
        myItem.dueDate = new Date(dueDateInput.value);
        console.log(myItem);
        console.log(dueDateInput.value);

        // get isCompleted
        let isCompleted = getInput("is-complete");
        myItem.isCompleted = isCompleted.checked;
        
        return myItem;
    }

function getInput(id):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}

/**
 * Display given ToDoItem on the web page
 */
function displayToDoItem(item:ToDoItem):void{
    // ex. <h3>Record JS Lecture</h3>
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;
    
    // ex. <p>September 6th 2020</p>
    let itemDate = document.createElement("p");
   // itemDate.innerText = item.dueDate.toDateString();
    let dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();

    // ex. <div class="completed"></div> or <div class = "todo"></div>
    let itemDiv = document.createElement("div");

    itemDiv.onclick = markAsComplete;

    itemDiv.classList.add("todo");
    if(item.isCompleted){
        itemDiv.classList.add("completed");
    }

    /* <div class="completed">
            <h3> Record JS Lecture</h3>
            <p>September 6th 2020</p>
       </div>
    */
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);


    if(item.isCompleted){
        let completedToDos = document.getElementById("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else{
        let incompleteToDos = document.getElementById("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }

}

/**
 * Marks the ToDoItem as completed
 */
function markAsComplete(){
    let itemDiv = <HTMLElement>this;
    console.log(itemDiv);
    itemDiv.classList.add("completed");

    let completedItems = document.getElementById("complete-items");
    console.log(completedItems);
    completedItems.appendChild(itemDiv);
}
/**
 * Stores ToDoItems in a web storage
 */ 

function saveToDo(item:ToDoItem):void{
    let currItems = getToDoItems();
    if(currItems == null){ // No items found
        currItems = new Array();
    }
    currItems.push(item); // Add the new item to the curr item list

    let currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}


const todokey = "todo";

/**
 * Get stored ToDo items or return null if
 * none are found
 */
function getToDoItems():ToDoItem[]{
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem[] = JSON.parse(itemString);
    return item;
}