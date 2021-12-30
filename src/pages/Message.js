import React from 'react'

function Message({ appointments, finalMessages }) {
  return (
    <main>
      {appointments && <h1>Reminder (more than 5 days)</h1>}
      {/* map appointments to list and show a card for each appointment */}
      {appointments &&
        appointments.map((appointment) => (
          <div className="appointment-card" key={appointment.id}>
            <h2>Name: {appointment.customerName}</h2>
            <p>Email: {appointment.customerEmail}</p>
            <p>Phone: {appointment.customerPhone}</p>
            <p>
              Appointment date:{' '}
              {appointment.date.toDate().toLocaleString([], {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })}
            </p>
          </div>
        ))}
      {finalMessages && (
        <h1 className="finale-message-title">
          Finale message (more than 7 days)
        </h1>
      )}
      {/* map appointments to list and show a card for each appointment */}
      {finalMessages &&
        finalMessages.map((finalMessage) => (
          <div className="appointment-card" key={finalMessage.id}>
            <h2>Name: {finalMessage.customerName}</h2>
            <p>Email: {finalMessage.customerEmail}</p>
            <p>Phone: {finalMessage.customerPhone}</p>
            <p>
              Appointment date:{' '}
              {finalMessage.date.toDate().toLocaleString([], {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })}
            </p>
          </div>
        ))}
    </main>
  )
}

export default Message
