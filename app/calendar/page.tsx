'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, {
  Draggable,
  DropArg,
} from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import BookingDetail from './_components/BookingDetail'
import { Booking } from '@prisma/client'
import axios from 'axios'

const CalendarPage = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [allBookings, setAllBookings] = useState<Booking[]>([])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number | null>(null)

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings')
      const bookings = await response.data
      setAllBookings(bookings)
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
    fetchBookings()
  }, [])

  function handleDateClick(arg: { date: Date; dateStr: string }) {
    setShowModal(true)
  }

  function addEvent(data: DropArg) {
    
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    setShowDeleteModal(true)
    setIdToDelete(Number(data.event.id))
  }

  function handleDelete() {
    setAllEvents(
      allEvents.filter((event) => Number(event.id) !== Number(idToDelete))
    )
    setShowDeleteModal(false)
    setIdToDelete(null)
  }

  function handleCloseModal() {
    setShowModal(false)
    setShowDeleteModal(false)
    setIdToDelete(null)
  }

  const deleteModal = () => {
    return (
      <Transition.Root show={showDeleteModal} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setShowDeleteModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>
          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel
                  className='relative transform overflow-hidden rounded-lg
                     bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'
                >
                  <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                    <div className='sm:flex sm:items-start'>
                      <div
                        className='mx-auto flex h-12 w-12 flex-shrink-0 items-center 
                        justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'
                      >
                        <ExclamationTriangleIcon
                          className='h-6 w-6 text-red-600'
                          aria-hidden='true'
                        />
                      </div>
                      <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                        <Dialog.Title
                          as='h3'
                          className='text-lg leading-6 font-medium text-gray-900'
                        >
                          Delete Event
                        </Dialog.Title>
                        <div className='mt-2'>
                          <p className='text-sm text-gray-500'>
                            Are you sure you want to delete this event?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                    <button
                      type='button'
                      className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
                        font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      type='button'
                      className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                        shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
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
              }))}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              drop={(data) => addEvent(data)}
              eventClick={(data) => handleDeleteModal(data)}
            />
          </div>
        </div>

        {addModal}
        {deleteModal()}
      </main>
    </>
  )
}

export default CalendarPage
