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
import { doc, getDoc } from '@firebase/firestore'

function Index() {
  const auth = getAuth()
  const [user, setUser] = useState()
  const [authed, setAuthed] = useState()
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
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

  const getUserDetails = async (id) => {
    //console.log('...getting user details', id)
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
      <Header authed={authed} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {currentUser?.admin ? (
                <Home currentUser={currentUser} />
              ) : (
                <main>
                  <h1>You need to login to access this page</h1>
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
                <Message />
              ) : (
                <main>
                  <h1>You need to login to access this page</h1>
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
                <List />
              ) : (
                <main>
                  <h1>You need to login to access this page</h1>
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
