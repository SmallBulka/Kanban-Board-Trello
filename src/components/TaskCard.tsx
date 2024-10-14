import { useState } from "react";
import DelIcon from "../icons/DelIcon";
import { Id, Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities'
import Check from "../icons/Check";


interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
}


function TaskCard( {task, deleteTask, updateTask}: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const {setNodeRef, attributes, listeners, transform, transition, isDragging, } = useSortable ({
      id: task.id,
      data:{
          type: "Task",
          task,
      },
      disabled: editMode,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
};
    const toggleEditMode = () => {
      setEditMode((prev) => !prev);
      setMouseIsOver(false);
    }
if (isDragging) {
  return <div ref={setNodeRef}
  style={style} className="bg-black
   p-2.5 h-[100px] min-h-[100px]
   items-center flex text-left 
   rounded-xl opacity-40
   hover:ring-2 hover:ring-inset  hover:ring-[#29A19C]  
   curcor-grabs relative"/>
}


if(editMode){
  return (<div 
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}
    onClick={toggleEditMode} 
    
    className="bg-gray-800
   p-2.5 h-[100px] min-h-[100px] 
   items-center flex text-left 
   rounded-xl 
   hover:ring-2 hover:ring-inset  hover:ring-[#29A19C] 
   curcor-grabs relative"
   >
    <textarea className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
    // value={task.content}
    autoFocus
    placeholder="Task content here"
    onBlur={toggleEditMode}
    onKeyDown={(e) => {
      if (e.key === 'Enter' && e.shiftKey) toggleEditMode();
    }}
    onChange={e => updateTask(task.id, e.target.value)}
    
    ></textarea>
   </div>)
}

  return (<div
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}
    onClick={toggleEditMode} 
    
    className="bg-gray-900
   p-2.5 h-[100px] min-h-[100px] pr-10
   items-center flex text-left 
   rounded-xl 
   hover:ring-2 hover:ring-inset  hover:ring-[#29A19C] 
   curcor-grabs relative task"
   onMouseEnter={()=> {
    setMouseIsOver(true);
   }}
   onMouseLeave={()=> {
    setMouseIsOver(false);
   }}
   >
    <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">{task.content}</p>
    {mouseIsOver && (
   <button onClick={() => {
    deleteTask(task.id);
   }}
   className="stroke-white absolute right-4 mt-2 top-1/2 -translate-y-1/ "><DelIcon/></button>
   )}<button onClick={() => {
    deleteTask(task.id);
   }}
   className="stroke-white absolute right-4  top-1/4 -translate-y-1/3 "><Check/></button>
   </div>
   
  ); 
}

export default TaskCard;