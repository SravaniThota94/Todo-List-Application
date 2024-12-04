let todolist_heading = document.createElement("h1")
todolist_heading.textContent = "Todo-List Application";
todolist_heading.classList.add("todo_heading")
let div_container = document.getElementById("divcontainer")
div_container.appendChild(todolist_heading)

let sub_container = document.createElement("div")
sub_container.classList.add("d-flex","flex-row","justify-content-center")
div_container.appendChild(sub_container)

let sub_div = document.createElement("div")
sub_div.classList.add("sub_div", "p-3");
sub_container.appendChild(sub_div)

let create_task = document.createElement("h1")
create_task.textContent = "Create Task"
create_task.classList.add("task_style")
sub_div.appendChild(create_task)

let course_box = document.createElement("input")
course_box.id = "usertext"
course_box.type = "text"
course_box.placeholder = " What needs to be done..?";
course_box.classList.add("course_style")
sub_div.appendChild(course_box)

let add_button = document.createElement("button")
add_button.textContent = "Add"
add_button.classList.add("btn-dark","addbutton")
add_button.onclick = function(){
    adding_todo_item()
}
sub_div.appendChild(add_button)

let my_task = document.createElement("p")
my_task.textContent = "My Tasks"
my_task.classList.add("my_task_style","ml-4")
sub_div.appendChild(my_task)


let unordered = document.createElement("ul")
sub_div.appendChild(unordered)

function gettodoitemsfromlocal(){
    let stringified_items = localStorage.getItem("todo_items")
    let parsed_items = JSON.parse(stringified_items)

    if (stringified_items === null){
        return []
    }else{
        return parsed_items
    }
}
let todo_items =  gettodoitemsfromlocal()
/*let todo_items = [{
    text: "Learn Python Programming",
    uniqueNo : 1
},
{
    text: "Learn SQL query",
    uniqueNo : 2
},
{
    text: "Learn HTML",
    uniqueNo : 3
}
]*/
let uniqueNo_count = todo_items.length

function checked_box_line_through(labelId,checkbox_uniqueId,todo_id){
    let check_box = document.getElementById(checkbox_uniqueId)
    let label_Id = document.getElementById(labelId)

   /* if (check_box.checked === true){
        label_Id.classList.add("checked")
    }else{
        label_Id.classList.remove("checked")
    }*/
   //toggle checks,the label is tick or not.if it is tick css style will be add else no
    label_Id.classList.toggle("checked")
    
    let checking_line = todo_items.findIndex(function(each_todo){
        let todoItem =  "todo" + each_todo.uniqueNo;
        if (todoItem === todo_id){
            return true
        }else{
            return false
        }
  
    })
    let todo_Object = todo_items[checking_line];
    if (todo_Object.isChecked === true){
        todo_Object.isChecked = false;
    }else{
        todo_Object.isChecked = true;
    }
}

function deleting_todo_item(todo_id){
    let todoId = document.getElementById(todo_id)
    unordered.removeChild(todoId)
    let finding_index = todo_items.findIndex(function(eachtodo){
        let todoItem =  "todo" + eachtodo.uniqueNo;
        if (todoItem === todo_id){
            return true
        }else{
            return false
        }    
    })
    todo_items.splice(finding_index,1);
    console.log(todo_items)
}


//label_1

function todoList_application(todo){
    let checkbox_uniqueId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todo_id = "todo" + todo.uniqueNo;

    let ordered = document.createElement("li")
    ordered.classList.add("d-flex","flex-row","mb-3")
    ordered.id = todo_id
    unordered.appendChild(ordered)

    let check_box = document.createElement("input")
    check_box.type = "checkbox"
    check_box.id = checkbox_uniqueId;
    check_box.checked = todo.isChecked;
    check_box.onclick = function(){
        checked_box_line_through(labelId,checkbox_uniqueId,todo_id)
    }
    ordered.appendChild(check_box)

    let checkbox_div = document.createElement("div")
    checkbox_div.classList.add("checkboxdiv","ml-3","d-flex","flex-row","justify-content-between")
    ordered.appendChild(checkbox_div)

    let label = document.createElement("label")
    label.setAttribute("for",checkbox_uniqueId);
    label.textContent = todo.text
    label.id = labelId;
    label.classList.add("ml-3","label_style")
    if(todo.isChecked === true){
        label.classList.add("checked")
    }
    checkbox_div.appendChild(label)

    let del_container = document.createElement("div")
    del_container.classList.add("mr-3")
    checkbox_div.appendChild(del_container)

    let delete_icon = document.createElement("i")
    delete_icon.classList.add("far","fa-trash-alt")
    delete_icon.onclick = function(){
        deleting_todo_item(todo_id)
    }
    del_container.appendChild(delete_icon)
    
}

let save_button = document.createElement("button")
save_button.classList.add("btn-dark","addbutton")
save_button.textContent = "Save";
save_button.style ="float: right"
save_button.onclick = function(){
    localStorage.setItem("todo_items",JSON.stringify(todo_items))
}
sub_div.appendChild(save_button);

function adding_todo_item(){
    let userinput = document.getElementById("usertext")
    let user_value = userinput.value

    if (user_value === ""){
        alert("Enter valid text")
        return;
    }

    uniqueNo_count = uniqueNo_count + 1
    let new_todo_item = {
        text: user_value,
        uniqueNo: uniqueNo_count,
        isChecked: false
    };
    todo_items.push(new_todo_item)//adding new todo in local
    todoList_application(new_todo_item);
    userinput.value = " ";

}

for(let todo of todo_items){
    todoList_application(todo)
}

//label_2 

/*let ordered2 = document.createElement("li")
ordered2.classList.add("d-flex","flex-row","mb-3")
unordered.appendChild(ordered2)

let check_box2 = document.createElement("input")
check_box2.type = "checkbox"
check_box2.id = "checkbox_id"
ordered2.appendChild(check_box2)

let checkbox_div2 = document.createElement("div")
checkbox_div2.classList.add("checkboxdiv","ml-3","d-flex","flex-row","justify-content-between");
ordered2.appendChild(checkbox_div2)

let label2 = document.createElement("label")
label2.setAttribute("for","checkbox_id");
label2.textContent = "Sql query"
label2.classList.add("ml-3","label_style")
checkbox_div2.appendChild(label2)

let del_container2 = document.createElement("div")
del_container2.classList.add("mr-3")
checkbox_div2.appendChild(del_container2)

let delete_icon2 = document.createElement("i")
delete_icon2.classList.add("far","fa-trash-alt")
del_container2.appendChild(delete_icon2)*/








