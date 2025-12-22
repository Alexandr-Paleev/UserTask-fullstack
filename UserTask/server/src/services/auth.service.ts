import { getRepository } from 'typeorm'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Account from '../models/account.entity'
import CityService from './city.service'

class AuthService {
  private accountRepository
  private cityService: CityService

  constructor() {
    this.accountRepository = getRepository(Account)
    this.cityService = new CityService()
  }

  public register = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase()
    const existing = await this.accountRepository.findOne({ where: { email: normalizedEmail } })
    if (existing) {
      const error: any = new Error('Email already registered')
      error.status = 409
      throw error
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const account = this.accountRepository.create({
      email: normalizedEmail,
      passwordHash,
    })
    await this.accountRepository.save(account)

    // Seed cities on first auth (best effort, does not block register)
    try {
      await this.cityService.ensureSeeded()
    } catch (e) {
      console.warn('Failed to seed cities on register:', e)
    }

    return this.issueToken(account.id)
  }

  public login = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase()
    const account = await this.accountRepository.findOne({ where: { email: normalizedEmail } })
    if (!account) {
      const error: any = new Error('Invalid email or password')
      error.status = 401
      throw error
    }

    const ok = await bcrypt.compare(password, account.passwordHash)
    if (!ok) {
      const error: any = new Error('Invalid email or password')
      error.status = 401
      throw error
    }

    // Seed cities on first auth (best effort, does not block login)
    try {
      await this.cityService.ensureSeeded()
    } catch (e) {
      console.warn('Failed to seed cities on login:', e)
    }

    return this.issueToken(account.id)
  }

  private issueToken = (accountId: number) => {
    const secret = process.env.JWT_SECRET
    if (!secret) {
      const error: any = new Error('JWT_SECRET is not configured')
      error.status = 500
      throw error
    }

    const token = jwt.sign({ accountId }, secret, { expiresIn: '7d' })
    return { token, accountId }
  }
}

export default AuthService
