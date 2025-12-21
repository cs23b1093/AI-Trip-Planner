import * as z from 'zod';

const feedbackSchema = z.object({
    feedback: z.string({ error: "feedback must be a string" })
               .max(400, "feeback must have at max 400 characters"),

    rating: z.number({ error: 'rating must be integer' })
             .min(1, { error: 'rating must greater value than 1'})
             .max(5, { error: 'rating must have less than value 5' })
             .int({ error: 'rating must be a integer' }),
             
})