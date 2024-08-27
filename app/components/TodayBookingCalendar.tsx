'use client'

import { Booking } from '@prisma/client'
import { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

const TodayBookingCalendar = ({ bookings }: { bookings: Booking[] }) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    // Convert bookings to FullCalendar events
    const calendarEvents = bookings.map((booking) => ({
      id: booking.id,
      title: booking.title || 'Booking',
      start: booking.startDateTime,
      end: booking.endDateTime,
    }))
    setEvents(calendarEvents as any)
  }, [bookings])

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView='timeGridDay'
      events={events}
      headerToolbar={{
        left: '',
        center: 'title',
        right: '',
      }}
      allDaySlot={false}
      slotMinTime='06:00:00'
      slotMaxTime='24:00:00'
    />
  )
}

export default TodayBookingCalendar
