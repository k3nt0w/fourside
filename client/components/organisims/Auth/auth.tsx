import React, { Component, useEffect, useState } from 'react'
import 'isomorphic-unfetch'
import { auth, db, googleAuthProvider } from '../../../../lib/firebase/client'
import { User } from '../../../../lib/firebase/type'
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

export default class Auth extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.state = {
      user: this.props.user,
      value: '',
      messages: this.props.messages
    }

    this.addDbListener = this.addDbListener.bind(this)
    this.removeDbListener = this.removeDbListener.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(this: any) {
    if (this.state.user) this.addDbListener()
    auth.onAuthStateChanged((user: User) => {
      if (user) {
        this.setState({ user: user })
        return user
          .getIdToken()
          .then((token: any) => {
            return fetch('/api/login', {
              method: 'POST',
              headers: new Headers({ 'Content-Type': 'application/json' }),
              credentials: 'same-origin',
              body: JSON.stringify({ token })
            })
          })
          .then(() => this.addDbListener())
      } else {
        this.setState({ user: null })
        // eslint-disable-next-line no-undef
        fetch('/api/logout', {
          method: 'POST',
          credentials: 'same-origin'
        }).then(() => this.removeDbListener())
      }
    })
  }

  addDbListener() {
    let unsubscribe = db.collection('messages').onSnapshot(
      (querySnapshot: firebase.firestore.QuerySnapshot) => {
        let messages = [] as Message[]
        querySnapshot.forEach((doc: any) => {
          const message = {
            id: doc.id,
            text: doc.data().text
          }
          messages = [...messages, message]
        })
        if (messages) this.setState({ messages })
      },
      (error: any) => {
        console.error(error)
      }
    )
    this.setState({ unsubscribe })
  }

  removeDbListener(this: any) {
    if (this.state.unsubscribe) {
      this.state.unsubscribe()
    }
  }

  handleChange(event: any) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(this: any, event: any) {
    event.preventDefault()
    const date = new Date().getTime()
    db.collection('messages')
      .doc(`${date}`)
      .set({
        id: date,
        text: this.state.value
      })
    this.setState({ value: '' })
  }

  handleLogin() {
    auth.signInWithPopup(googleAuthProvider)
  }

  handleLogout() {
    auth.signOut()
  }

  render(this: any) {
    const { user, value, messages } = this.state

    return (
      <div>
        {user ? (
          <>
            <h1>This is a certified page.</h1>
            <button onClick={this.handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={this.handleLogin}>Login</button>
        )}
        {user && (
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type={'text'}
                onChange={this.handleChange}
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
}
