import bodyParser from 'body-parser'
import expressSession from 'express-session'
import sessionFileStore from 'session-file-store'
const FileStore = sessionFileStore(expressSession)

const session = {
  secret: 'geheimnis',
  saveUninitialized: true,
  store: new FileStore({ path: '/tmp/sessions', secret: 'geheimnis' }),
  resave: false,
  rolling: true,
  httpOnly: true,
  cookie: { maxAge: 604800000 } // week
}

export const config = {
  session: expressSession(session),
  bodyParser: bodyParser.json()
}
