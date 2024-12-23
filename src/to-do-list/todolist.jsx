import { useState, useReducer } from 'react';
import AddTask from './addtask';
import TasksList from './taskslist';

function taskReducer(state, action){
    switch (action.type){
        case "add":
            return [...state, {
                id: state.length,
                taskname: action.taskName,
                finished: false,
            }]
    }
}

export default function ToDoList() {
    const [tasks, dispatch] = useReducer(taskReducer, []);
    const [task, setTask] = useState("");

    function handleTaskInput(e){
        setTask(()=>e.target.value);
    }

    function handleAddTask(){
        console.log("hello")
        dispatch({type:"add", taskName: task});
    }

    console.log(tasks)
    return (
        <div className='container mx-auto mt-[8.5rem] mb-16'>
            <div className='flex justify-center items-center flex-col'>
                <AddTask handleAddTask={handleAddTask} handleTaskInput={handleTaskInput} />
                <TasksList tasks={tasks} />
            </div>
        </div>
    );
}