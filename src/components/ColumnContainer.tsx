import { SortableContext, useSortable } from "@dnd-kit/sortable";
import DelIcon from "../icons/DelIcon";
import { Column,  Id, Task} from "../types"
import {CSS} from "@dnd-kit/utilities"
import { useMemo, useState } from "react";
import Pluslcon from "../icons/Pluslcon";
import TaskCard from "./TaskCard";



interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
    updateTask: (id: Id, content: string) => void;
    createTask: (columnId: Id) => void;
    deleteTask: (id: Id) => void;
    tasks: Task[];

}

function ColumnContainer( props: Props) {
    const {column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask} = props;

    const[editMode, setEditMode] = useState(false); 

    const {setNodeRef, attributes, listeners, transform, transition, isDragging, } = useSortable ({
        id: column.id,
        data:{
            type: "Column",
            column,
        },
        disabled: editMode,
    });
    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
    }, [tasks]);
        

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return <div ref={setNodeRef}
        style = {style}
        className="
  h-[500px]
    w-[350px]
    opacity-40
    min-h-[500px]
    rounded-md
    bg-[#393e46]
    border-2
    border-[#29A19C]
    
    flex
    flex-col
  "></div>
    }
    
  return <div 
  ref={setNodeRef}
  style = {style}
  className="
  

  h-[500px]
    w-[350px]
    min-h-[500px]
    rounded-md
    bg-[#393e46]
    flex
    flex-col
  "
  >
    {/* column  title*/}
    
    <div
    onClick={() => {
        setEditMode(true)
    }}
    {...attributes}
    {...listeners}
    
    className="
    bg-gray-800
    h-[60px]
    text-md
    cursor-grab
    rounded-md
    rounded-b-none
    p-3
    font-bold
    border-[#393e46]
    border-4
    flex
    justify-between
    items-center
    ">
        <div className="flex gap-2">
        {/* <div className="
        flex
        justify-center
        items-center
        bg-[#2C3440]
        px-2
        py-1
        text-sm
        rounded-full
        "></div> */}
    {!editMode && column.title}
    {editMode && (
        <input 
        className="bg-[#232931] focus:border-[#29A19C] border rounded outline-none px-2"
        value={column.title}
        onChange={(e) => updateColumn(column.id, e.target.value)}
        autoFocus
        onBlur={() => {
            setEditMode(false);
        }} 
        onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            setEditMode(false);
        }}
        />
    )}
    </div>
    <button 
    onClick={() => {
        deleteColumn(column.id)
    }}
    className="
    stroke-gray-500
    hover:stroke-white
    hover:bg-[#232931]
    rounded
    px-1
    py-2
    ">
        <DelIcon/>
    </button>
    </div>
    
    {/* column  task*/}
    <div className="flex flex-grow flex-col gap-4 p-2
    overflow-x-hidden overflow-y-auto
    ">
        <SortableContext items={tasksIds}>
        {
        tasks.map((task) => (
            <TaskCard key={task.id} task={task} deleteTask={deleteTask} 
            updateTask={updateTask}/>
        )) }
        </SortableContext>
       </div> 
    {/* column  footer*/}
    
    <button className="flex gap-2 items-center
    border-[#393e46] border-2 rounded-md p-4
    border-x-[#393e46]
    hover:bg-gray-800 hover:text-[#29A19C]
    active:bg-[#232931]"
    onClick={()=> {
        createTask(column.id)
    }}> <div className="
    stroke-white"><Pluslcon/></div>
    
    
       
        Add Tasks
        </button>
    </div>
}

export default ColumnContainer