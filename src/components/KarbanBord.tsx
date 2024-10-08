import { useMemo} from 'react'
import Pluslcon from '../icons/Pluslcon'
import { useState } from 'react';
import { Column, Id, Task } from '../types';
import ColumnContainer from './ColumnContainer';
import { DndContext, DragOverlay, DragStartEvent, DragEndEvent, useSensors, useSensor, PointerSensor, DragOverEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import TaskCard from './TaskCard';


function KarbanBord() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id),
[columns]);

  const [tasks, setTasks] = useState<Task[]>([]);

  const[activeColumn, setActiveColumn] = useState<Column|null> (null);

  const[activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor , {
      activationConstraint: {
        distance: 3 //3px
      }
    })
  )

  return (
<>
<div className=''>
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
      

      <DndContext 
      sensors={sensors} 
      onDragStart={onDragStart} 
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      >
      <div className='m-40 flex gap-4'>
        <div className='flex gap-4 '>
          <SortableContext items={columnsId}>
          {columns.map((col) =>(
            <ColumnContainer key={col.id} column={col} 
            deleteColumn={deleteColumn} 
            updateColumn={updateColumn} 
            createTask={createTask}
            tasks={tasks.filter(task => task.columnId === col.id)}
            deleteTask={deleteTask}
            updateTask={updateTask}
            
            />
          ))}</SortableContext>
        </div>
      <button onClick={()=>{
        createNewColumn()
      }} 
      className="
    h-[60px]
    w-[350px]
    min-w-[350px]
    cursor-pointer
    rounded-lg
    bg-gray-700
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
            {activeColumn && (<ColumnContainer column={activeColumn}
            deleteColumn={deleteColumn}
            updateColumn={updateColumn}
            createTask={createTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
            tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
            />
          )}
            {
              activeTask&&(<TaskCard task={activeTask}
              deleteTask={deleteTask} updateTask={updateTask}/>
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
  </div>
  </div>
  </>
  );

  function createTask(columnId:Id){
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`
    };
  
    setTasks([...tasks, newTask])
  }

  function createNewColumn(){
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd])
  }
function deleteTask(id: Id) {
  const newTasks = tasks.filter(task =>task.id !== id);
  setTasks(newTasks)
}

function updateTask(id: Id, content: string){
  const newTasks = tasks.map((task)=> {
if (task.id !== id) return task;
return {...task,content};
  });
  setTasks(newTasks)
}

  function deleteColumn(id: Id) {
    const filteredColumn = columns.filter((col) => col.id !== id);
    setColumns(filteredColumn);
    const newTasks = tasks.filter((t) => t.columnId !== id)
    setTasks(newTasks)
  }
  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
        return {...col, title};
    
    });
    setColumns(newColumns);
  }
  function onDragStart(event: DragStartEvent) {
    setActiveColumn(null)
    setActiveTask(null)
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column)
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task)
      return;
    
  }
}
  function onDragEnd (event: DragEndEvent) {
    const { active, over} = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    
    if (activeId === overId) return;

    setColumns ((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeId
      );

      const overColumnIndex = columns.findIndex(
        (col) => col.id === overId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }
  function onDragOver(event: DragOverEvent) {
    const { active, over} = event;
  if (!over) return;
  
  const activeId = active.id;
  const overId = over.id;
  
  if (activeId === overId) return;
  
  const isActiveATask = active.data.current?.type === 'Task';
  const isOverATask = over.data.current?.type === 'Task';
    if (!isActiveATask) return;

    if(isActiveATask && isOverATask){
      setTasks(tasks=> {
        const activeIndex = tasks.findIndex(t => t.id === activeId)

        const overIndex = tasks.findIndex(t => t.id === overId)
        
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
        



        return arrayMove(tasks,  activeIndex, overIndex)
      })
    }

    const isOverColumn = over.data.current?.type === 'Column'

    if (isActiveATask && isOverColumn){
      setTasks(tasks=> {
        const activeIndex = tasks.findIndex(t => t.id === activeId)

        
        
          tasks[activeIndex].columnId = overId;
        



        return arrayMove(tasks,  activeIndex, activeIndex)
      })
    }
  }
}
 



function generateId() {
  return Math.floor(Math.random() * 10001);
  }

export default KarbanBord