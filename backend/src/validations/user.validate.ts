import * as z from 'zod';

export const userSchema = z.object({
    fullName: z.string({ error: 'please provide string for your name' })
               .min(3, { error: 'Too much short name' }),

    username: z.string({ error: 'please provide username as string' })
               .trim()
               .lowercase()
               .min(3, { error: 'username must have at least 3 characters' })
               .max(16, { error: 'username must have at max 16 characters' }),

    email: z.string({ error: 'please provide email as string' })
               .trim()
               .lowercase()
               .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { error: 'Invalid email address' }),

    password: z.string({ error: 'please provide password as string' })
               .min(8, { error: 'password must have at least 8 characters' })
               .max(16, { error: 'password must have at max 16 characters' })
               .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, { error: 'password must contain at least one uppercase letter, one lowercase letter, one number and one special character' }),

    plan: z.enum(['Free', 'Pro'], { error: 'plan must belong to free or pro only' }),

    address: z.string({ error: 'address must be a string' }),

    preferences: z.string({ error: 'preferences must be a string' }),

    trip: z.object({ trip: z.string({ error: 'tripId must be a string' }) }),

    authProvider: z.enum(['google', 'facebook', 'X'], { error: 'authProvider must belongs to enums only' })
})

export type User = z.infer<typeof userSchema>