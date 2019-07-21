import express, { Application, NextFunction, Request, Response } from 'express'
import next from 'next'
import { auth, firebaseAdmin } from '../lib/firebase/admin'
import { config } from './config'

const port = (!!process.env.PORT && parseInt(process.env.PORT, 10)) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server: Application = express()

  server.use(config.bodyParser)
  server.use(config.session)

  server.use((req: Request, _: Response, next: NextFunction) => {
    req.firebaseServer = firebaseAdmin
    next()
  })

  server.post('/api/login', (req: Request, res: Response) => {
    if (!req.body) return res.sendStatus(400)

    const token = req.body.token
    auth
      .verifyIdToken(token)
      .then(decodedToken => {
        req.session.decodedToken = decodedToken
        return decodedToken
      })
      .then(decodedToken => res.json({ status: true, decodedToken }))
      .catch((error: Error) => res.json({ error }))
  })

  server.post('/api/logout', (req: Request, res: Response) => {
    req.session.decodedToken = null
    res.json({ status: true })
  })

  server.get('*', (req: Request, res: Response) => {
    return handle(req, res)
  })

  server.listen(port, (err: Error) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
