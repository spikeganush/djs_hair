import React from 'react'

function Home({ currentUser }) {
  return (
    <main>
      {!currentUser ? (
        <h1>You need to be admin to access this page</h1>
      ) : (
        <h1>Welcome {currentUser?.displayName}</h1>
      )}
    </main>
  )
}

export default Home
