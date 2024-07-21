import React, { useMemo} from 'react'
import Pluslcon from '../icons/Pluslcon'
import { useState } from 'react';
import { Column, Id } from '../types';
import ColumnContainer from './ColumnContainer';
import { DndContext, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

function KarbanBord() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id),
[columns]);

  const[activeColumn, setActiveColumn] = useState<Column|null> (null);

  return (
    <div className='
    m-auto
    flex
    min-h-screen
    w-full
    items-center

    overflow-x-auto
    overflow-y-hidden
    px-[40px]
    '>
      <DndContext onDragStart={onDragStart}>
      <div className='m-auto flex gap-4'>
        <div className='flex gap-4'>
          <SortableContext items={columnsId}>
          {columns.map((col) =>(
            <ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn}/>
          ))}</SortableContext>
        </div>
      <button onClick={()=>{
        createNewColumn()
      }} className="
    h-[60px]
    w-[350px]
    min-w-[350px]
    cursor-pointer
    rounded-lg
    bg-[#2C3440]
    p-4
    border-amber-200
    ring-[#29A19C]
    hover:ring-2
    flex
    gap-2
    
    "><div className="
    stroke-white
    hover:stroke-[#29A19C]
    "><Pluslcon/></div>
      
    Hello world!
  </button>
      </div>
      {createPortal(
          <DragOverlay>
            {activeColumn && <ColumnContainer column={activeColumn}
            deleteColumn={deleteColumn}
            />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
  </div>
  );
  function createNewColumn(){
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd])
  }
  function deleteColumn(id: Id) {
    const filteredColumn = columns.filter((col) => col.id !== id);
    setColumns(filteredColumn);
  }
  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column)
      return;
    }
  }
  
}




function generateId() {
  return Math.floor(Math.random() * 10001);
}

export default KarbanBord