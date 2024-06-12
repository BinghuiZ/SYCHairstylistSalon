'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, {
  Draggable,
  DropArg,
} from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useState } from 'react'

interface Event {
  title: string
  start: Date | string
  allDay: boolean
  id: number
}

export default function Home() {
  const [events, setEvents] = useState([
    { title: 'event 1', start: '2021-09-01', allDay: true, id: 1 },
    { title: 'event 2', start: '2021-09-02', allDay: true, id: 2 },
    { title: 'event 3', start: '2021-09-03', allDay: true, id: 3 },
    { title: 'event 4', start: '2021-09-04', allDay: true, id: 4 },
    { title: 'event 5', start: '2021-09-05', allDay: true, id: 5 },
  ])
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number | null>(null)
  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    start: '',
    allDay: true,
    id: 0,
  })

  return (
    <>
      <nav>
        <h1>Calendar</h1>
      </nav>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div className='grid grid-cols-10'>
          <div className='col-span-8'>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'resourceTimelineWook, dayGridMonth, timeGridWeek',
              }}
              events={allEvents}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              // dateClick={{}}
              // drop={{}}
              // eventClick={{}}
            />
          </div>
          <div
            id='draggable-el'
            className='ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50'
          >
            <h1 className='font-bold text-lg text-center'>Drag Event</h1>
            {events.map((event) => (
              <div
                className='fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white'
                title={event.title}
                key={event.id}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
