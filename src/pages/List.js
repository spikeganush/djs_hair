import React from 'react'
//firebase components
import { doc, deleteDoc } from 'firebase/firestore'
import db from '../firebase'

function List({ appointments }) {
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'appointments', id))
      .then(() => {})
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <main>
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
            <button
              className="button_delete"
              onClick={() => handleDelete(appointment.id)}
            >
              Delete
            </button>
          </div>
        ))}
    </main>
  )
}

export default List
