import express, { Application, NextFunction, Request, Response } from 'express'
import next from 'next'
import { auth, firebaseAdmin } from '../../src/lib/firebase/admin'

export default (req: any, res: any) => {
  if (!!req) req.decodedToken = null
  res.json({ status: true })
}
