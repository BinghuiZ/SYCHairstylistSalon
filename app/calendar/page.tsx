'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, {
  Draggable,
  DropArg,
} from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState } from 'react'
import BookingDetail from './_components/BookingDetail'
import { Booking } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const CalendarPage = () => {
  const [allBookings, setAllBookings] = useState<Booking[]>([])
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const fetchBookings = async (start: string, end: string) => {
    try {
      const response = await axios.get('/api/bookings', {
        params: { start, end },
      })
      const bookings = await response.data
      setAllBookings([...allBookings, ...bookings])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    let draggableEl = document.getElementById('draggable-el')
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          let title = eventEl.getAttribute('title')
          let id = eventEl.getAttribute('data')
          let start = eventEl.getAttribute('start')
          return { title, id, start }
        },
      })
    }
  }, [])

  function datesSetHandler(arg: { start: Date; end: Date }) {
    fetchBookings(arg.start.toISOString(), arg.end.toISOString())
  }

  function handleDateClick(arg: { date: Date; dateStr: string }) {
    setShowModal(true)
  }

  function handleDeleteModal(data: {
    event: { id: string; extendedProps: { clientId: string } }
  }) {
    router.push(
      `/clients/${data.event.extendedProps.clientId}/bookings/${data.event.id}`
    )
  }

  const addModal = (
    <BookingDetail showModal={showModal} setShowModal={setShowModal} />
  )

  return (
    <>
      <main className='flex min-h-screen flex-col items-center justify-between p-18'>
        <div className='grid grid-cols-10 w-full max-w-5xl'>
          <div className='col-span-10'>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth timeGridWeek',
              }}
              events={allBookings.map((booking) => ({
                id: booking.id.toString(),
                title: booking.title,
                start: booking.startDateTime,
                end: booking.endDateTime,
                clientId: booking.clientId,
              }))}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              // drop={(data) => addEvent(data)}
              eventClick={(data) => handleDeleteModal(data)}
              datesSet={datesSetHandler}
            />
          </div>
        </div>

        {addModal}
      </main>
    </>
  )
}

export default CalendarPage
