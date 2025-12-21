import * as z from 'zod';

export const tripSchema = z.object({
    title: z.string({ error: 'title must be a string' })
            .max(40, { error: 'title must have at max 40 characters only' }),

    totalCost: z.number({ error: 'total cost must be a number' }),

    startDate: z.date({ error: 'Invalid format! start date must be date format' }),

    endDate: z.date('Invalid format! start date must be date format'),

    
    places: z.array(z.object({
        placeId: z.string(),
        quantity: z.number()
    })),

    itineraryItems: z.array(z.object({
        
    })),

    feedback: z.object({
        
    })
})