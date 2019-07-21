import React, { Component, useEffect, useState } from 'react'
import 'isomorphic-unfetch'
import { auth, db, googleAuthProvider } from '../../lib/firebase/client'
import { User } from '../../lib/firebase/type'
import { Request } from 'express'

interface Message {
  id: string
  text: string
}

interface Props {
  user?: User
  value?: string
  messages?: Message[]
  unsubscribe?: () => void
}

interface InitialProps {
  req: Request
}

const Auth = (props: Props) => {
  const [user, setUser] = useState(props.user)
  const [messages, setMessages] = useState<Message[]>(props.messages)
  const [value, setValue] = useState<string>(!props.value ? '' : props.value)
  const [unsubscribe, setUnsubscribe] = useState()

  useEffect(() => {
    console.log('useEffect')
    if (user) addDbListener()
    auth.onAuthStateChanged(async (user: User) => {
      console.log('onAuthStateChanged')
      if (user) {
        console.log('userいるよ')
        setUser(user)
        const token = await user.getIdToken()
        console.log('これtokenだよ', token)
        await fetch('/api/login', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ token })
        })
        console.log('status: logged in')
        console.log('call: addDbListener')
        addDbListener()
      } else {
        setUser(user)
        await fetch('/api/logout', {
          method: 'POST',
          credentials: 'same-origin'
        })
        removeDbListener()
      }
    })
  }, [])

  const addDbListener = () => {
    console.log('called: addDbListener')
    let unsubscribe = db.collection('messages').onSnapshot(
      (querySnapshot: firebase.firestore.QuerySnapshot) => {
        console.log('call: querySnapshot')
        let messages = [] as Message[]
        querySnapshot.forEach(
          (doc: firebase.firestore.QueryDocumentSnapshot) => {
            console.log('call: QueryDocumentSnapshot')
            const message = {
              id: doc.id,
              text: doc.data().text
            }

            messages = [...messages, message]
          }
        )
        console.log('ここここ', messages)
        if (messages) setMessages(messages)
      },
      (error: Error) => {
        console.error(error)
      }
    )
    setUnsubscribe(unsubscribe)
  }

  const removeDbListener = () => {
    if (unsubscribe) {
      console.log('call: removeDbListener')
      unsubscribe()
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const date = new Date().getTime()
    console.log('call: handleSubmit', value)
    db.collection('messages')
      .doc(`${date}`)
      .set({
        id: date,
        text: value
      })
    setValue('')
  }

  const handleLogin = () => {
    auth.signInWithPopup(googleAuthProvider)
  }

  const handleLogout = () => {
    auth.signOut()
  }

  return (
    <div>
      {console.log('user: ', user)}
      {console.log('value:', value)}
      {console.log('messages:', messages)}
      {console.log('unsubscribe:', unsubscribe)}

      {user ? (
        <>
          <h1>This is a certified page.</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      {user && (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type={'text'}
              onChange={handleChange}
              placeholder={'add message...'}
              value={value}
            />
          </form>
          <ul>
            {messages &&
              messages.map((message: Message, index: number) => (
                <li key={index}>{message.text}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Auth.getInitialProps = async ({ req }: any) => {
//   console.log('call: **** getInitialProps ****')
//   const user = req ? req.decodedToken : null
//   // don't fetch anything from firebase if the user is not found
//   const snap =
//     user &&
//     (await req.firebaseServer
//       .database()
//       .ref('messages')
//       .once('value'))
//   const messages = snap && snap.val()
//   return { user, messages }
// }

export default Auth
