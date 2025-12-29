import 'dotenv/config'
import 'reflect-metadata'
import { createConnection, getRepository } from 'typeorm'
import config from './ormconfig'
import Account from './models/account.entity'
import bcrypt from 'bcryptjs'

    ; (async () => {
        try {
            await createConnection(config)
            console.log('Database connected...')

            const accountRepository = getRepository(Account)
            const email = 'paleev045@gmail.com'
            const newPassword = 'qwerty123456'

            const account = await accountRepository.findOne({ where: { email } })

            if (!account) {
                console.log(`Account with email ${email} not found.`)
                process.exit(1)
            }

            console.log(`Resetting password for ${email}...`)
            const passwordHash = await bcrypt.hash(newPassword, 10)

            account.passwordHash = passwordHash
            await accountRepository.save(account)

            console.log('Password reset successfully.')
            process.exit(0)
        } catch (error) {
            console.error('Error resetting password:', error)
            process.exit(1)
        }
    })()
