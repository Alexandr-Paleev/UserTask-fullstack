import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Request } from 'express'

export type AuthRequest = Request & { accountId?: number }

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.header('authorization')
  if (!header || !header.toLowerCase().startsWith('bearer ')) {
    return res.status(401).send('Missing Authorization header')
  }

  const token = header.slice('bearer '.length).trim()
  const secret = process.env.JWT_SECRET
  if (!secret) {
    return res.status(500).send('JWT_SECRET is not configured')
  }

  try {
    const payload = jwt.verify(token, secret) as { accountId?: number }
    if (!payload?.accountId) {
      return res.status(401).send('Invalid token')
    }
    req.accountId = payload.accountId
    return next()
  } catch {
    return res.status(401).send('Invalid token')
  }
}
