import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//components
import Header from '../Header'
import Footer from '../Footer'
//Pages
import Home from '../../pages/Home'
import Message from '../../pages/Message'
import List from '../../pages/List'

//firebase
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth'
import db from '../../firebase'
import {
  doc,
  getDoc,
  onSnapshot,
  collection,
  orderBy,
} from '@firebase/firestore'

function Index() {
  const auth = getAuth()
  const [user, setUser] = useState()
  const [authed, setAuthed] = useState()
  const [currentUser, setCurrentUser] = useState()
  const [messageHome, setMessageHome] = useState(
    'You need to be admin to access this page'
  )

  const [appointments, setAppointments] = useState([])
  const [appointmentsNeedMessage, setAppointmentsNeedMessage] = useState([])
  const [appointmentsfinalMessage, setAppointmentsfinalMessage] = useState([])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setMessageHome('Loading...')
        setUser(user)
        setAuthed(true)
      } else {
        setUser(null)
        setAuthed(false)
        setCurrentUser(null)
      }
    })
  })

  useEffect(() => {
    if (!currentUser && user) {
      getUserDetails(user?.uid).then((user) => {
        setCurrentUser(user)
      })
    }
  }, [currentUser, user])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'appointments'),
      orderBy('date', 'desc'),
      (snapshot) => {
        const appointments = []
        const appointmentsNeedMessage = []
        const appointmentsfinalMessage = []
        snapshot.forEach((doc) => {
          appointments.push({ ...doc.data(), id: doc.id })

          if (
            new Date(doc.data().date.toDate()).getTime() <=
              new Date().getTime() - 432000000 &&
            new Date(doc.data().date.toDate()).getTime() >=
              new Date().getTime() - 604800000 &&
            !doc.data().messageReminder
          ) {
            appointmentsNeedMessage.push({ ...doc.data(), id: doc.id })
          }

          if (
            new Date(doc.data().date.toDate()).getTime() <=
              new Date().getTime() - 604800000 &&
            !doc.data().finalMessage
          ) {
            appointmentsfinalMessage.push({ ...doc.data(), id: doc.id })
          }
        })

        setAppointments(appointments)
        setAppointmentsNeedMessage(appointmentsNeedMessage)
        setAppointmentsfinalMessage(appointmentsfinalMessage)
      }
    )
    return () => unsubscribe()
  }, [])

  const getUserDetails = async (id) => {
    const docRef = doc(db, 'users', id)
    const docData = await getDoc(docRef)
    return new Promise((resolve, reject) => {
      if (docData.exists()) {
        let document = docData.data()
        document.id = id
        resolve(document)
      } else {
        reject('no such document')
      }
    })
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setAuthed(false)
        setUser(null)
        setCurrentUser(null)
      })
      .catch((error) => console.log(error.code))
  }

  return (
    <Router>
      <Header
        authed={authed}
        handleLogout={handleLogout}
        setMessageHome={setMessageHome}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {currentUser?.admin ? (
                <Home currentUser={currentUser} messageHome={messageHome} />
              ) : (
                <main>
                  <h1>{messageHome}</h1>
                </main>
              )}
            </>
          }
        />
        <Route
          path="/message"
          element={
            <>
              {currentUser?.admin ? (
                <Message
                  appointments={appointmentsNeedMessage}
                  finalMessages={appointmentsfinalMessage}
                />
              ) : (
                <main>
                  <h1>{messageHome}</h1>
                </main>
              )}
            </>
          }
        />
        <Route
          path="/list"
          element={
            <>
              {currentUser?.admin ? (
                <List appointments={appointments} />
              ) : (
                <main>
                  <h1>{messageHome}</h1>
                </main>
              )}
            </>
          }
        />
      </Routes>
      <Footer />
    </Router>
  )
}

export default Index
