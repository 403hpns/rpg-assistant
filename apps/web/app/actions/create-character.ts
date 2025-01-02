'use server';

import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';
import apiClient from '@/lib/axios';

const formSchema = z.object({
  firstName: z.string().min(1).trim(),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  race: z.string().min(1).trim(),
  currentProffesion: z.string().min(1).trim(),
  previousProffesion: z.string().min(1).trim().optional(),
  sex: z.string(),
  age: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: 'Age must be a positive number',
    })
    .transform((value) => Number(value)),
  weight: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: 'Weight must be a positive number',
    })
    .transform((value) => Number(value)),
  height: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: 'Height must be a positive number',
    })
    .transform((value) => Number(value)),
  eyeColor: z.string().min(1).optional(),
  starSign: z.string().min(1).optional(),
  placeOfBirth: z.string().min(1).optional(),
  siblings: z
    .string()
    .refine(
      (value) => value === '' || (!isNaN(Number(value)) && Number(value) >= 0),
      {
        message: 'Siblings must be a non-negative number',
      }
    )
    .optional()
    .transform((value) => (value === '' ? undefined : Number(value))),
  description: z.string().optional(),
});

export async function createCharacter(prevState: any, formData: FormData) {
  console.log('elo');
  try {
    const validation = formSchema.safeParse(Object.fromEntries(formData));

    console.log('validation ', validation.success);

    if (!validation.success) {
      return {
        statusCode: 400,
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const { data, status } = await apiClient.post(
      '/api/v1/characters',
      validation.data
    );

    if (status === 201 && data.success) {
      toast({
        description: 'Character created successfully',
      });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      switch (error.status) {
        case 401: {
          toast({
            title: 'Error',
            description: 'Unauthorized',
          });
        }

        case 404: {
          toast({
            title: 'Error',
            description: 'Character not found',
          });
          break;
        }
      }
    }
  }
}
