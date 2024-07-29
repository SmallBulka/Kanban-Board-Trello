import { useSortable } from "@dnd-kit/sortable";
import DelIcon from "../icons/DelIcon";
import { Column,  Id} from "../types"
import {CSS} from "@dnd-kit/utilities"
import { useState } from "react";



interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
}

function ColumnContainer( props: Props) {
    const {column, deleteColumn, updateColumn} = props;

    const[editMode, setEditMode] = useState(false); 

    const {setNodeRef, attributes, listeners, transform, transition, isDragging,} = useSortable ({
        id: column.id,
        data:{
            type: "Column",
            column,
        },
    });

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
    bg-[#2C3440]
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
    bg-[#2C3440]
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
    bg-gray-950
    h-[60px]
    text-md
    cursor-grab
    rounded-md
    rounded-b-none
    p-3
    font-bold
    border-[#2C3440]
    border-4
    flex
    justify-between
    items-center
    ">
        <div className="flex gap-2">
        <div className="
        flex
        justify-center
        items-center
        bg-[#2C3440]
        px-2
        py-1
        text-sm
        rounded-full
        ">0</div>
    {!editMode && column.title}
    {editMode && (
        <input 
        value={column.title}
        onChange={(e) => updateColumn(column.id, e.target.value)}
        autoFocus
        onBlur={() => {
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
    hover:bg-[#2C3440]
    rounded
    px-1
    py-2
    ">
        <DelIcon/>
    </button>
    </div>
    
    {/* column  task*/}
    <div className="flex flex-grow">Content</div>
    {/* column  footer*/}
    <div>footer</div>
    </div>
}

export default ColumnContainer