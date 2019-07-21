import React from 'react'
import { Provider } from 'react-redux'
import { NextComponentType } from 'next'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import initializeStore from '../src/states/store'
import Auth from '../src/components/auth'

interface Props {
  Component: NextComponentType<any, any, any>
  pageProps: any
  store: any
}

class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }: any) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
          <Auth />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(initializeStore)(MyApp)
