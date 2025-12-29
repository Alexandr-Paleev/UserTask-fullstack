import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
    PORT: z.coerce.number().default(5001),
    JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
    POSTGRES_HOST: z.string().min(1, "POSTGRES_HOST is required"),
    POSTGRES_PORT: z.coerce.number().default(5432),
    POSTGRES_USER: z.string().min(1, "POSTGRES_USER is required"),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DB: z.string().min(1, "POSTGRES_DB is required"),
    CORS_ORIGIN: z.string().default('http://localhost:3000'),
})

export const env = envSchema.parse(process.env)
