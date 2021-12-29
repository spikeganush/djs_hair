import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

function Home({ currentUser }) {
  const [value, onChange] = useState(new Date())
  const [customerName, setCustomerName] = useState()
  const [customerEmail, setCustomerEmail] = useState()
  const [customerPhone, setCustomerPhone] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  console.log(value)
  console.log(customerName)
  console.log(customerEmail)
  console.log(customerPhone)

  const registerHandler = (e) => {
    e.preventDefault()
    setLoading(true)
  }

  return (
    <main>
      {!currentUser ? (
        <h1>You need to be admin to access this page</h1>
      ) : (
        <>
          <h1 className="welcome">Welcome {currentUser.displayName}</h1>
          <h2>Select the appointment date:</h2>
          <Calendar onChange={onChange} value={value} />
          <form className="add-customer__form">
            {error && <span className="error-message">{error}</span>}
            <div className="form-group">
              <label htmlFor="name">Customer name:</label>
              <input
                type="text"
                required
                id="name"
                placeholder="Customer name"
                onChange={(e) => setCustomerName(e.target.value)}
                value={customerName}
                tabIndex={1}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Customer email:</label>
              <input
                type="email"
                required
                id="email"
                placeholder="Enter email"
                onChange={(e) => setCustomerEmail(e.target.value)}
                value={customerEmail}
                tabIndex={2}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Customer phone number:</label>
              <input
                type="tel"
                required
                id="phone"
                placeholder="Phone number"
                onChange={(e) => setCustomerPhone(e.target.value)}
                value={customerPhone}
                tabIndex={2}
              />
            </div>
            <button
              disabled={loading}
              className="button"
              onClick={registerHandler}
            >
              {loading ? 'Register ...' : 'Register'}
            </button>
          </form>
        </>
      )}
    </main>
  )
}

export default Home
