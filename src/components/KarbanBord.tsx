import React from 'react'
import Pluslcon from '../icons/Pluslcon'
import { useState } from 'react';
import { Column } from '../types';

function KarbanBord() {
  const [columns, setColumns] = useState<Column[]>([]);

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
      <div className='m-auto flex gap-4'>
        <div className='flex gap-4'>
          {columns.map((col) =>(
            <div>{col.title}</div>
          ))}
        </div>
      <button onClick={()=>{
        createNewColumn()
      }} className="
    h-[60px]
    w-[350px]
    min-w-[350px]
    cursor-pointer
    rounded-lg
    bg-slate-800
    p-4
    border-amber-200
    ring-rose-500
    hover:ring-2
    flex
    gap-2
    ">
      <Pluslcon/>
    Hello world!
  </button>
      </div>
    
  </div>
  );
  function createNewColumn(){
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd])
  }
}

function generateId() {
  return Math.floor(Math.random() * 10001);
}

export default KarbanBord