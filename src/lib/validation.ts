import { z } from 'zod';

export const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  tagline: z.string().max(200, 'Tagline must be less than 200 characters').optional(),
  location: z.string().max(100).optional(),
});

export const socialLinkSchema = z.object({
  platform: z.enum([
    'instagram',
    'whatsapp',
    'tiktok',
    'github',
    'linkedin',
    'email',
    'upscrolled',
    'telegram',
    'discord',
    'portfolio',
    'twitter',
  ]),
  label: z.string().min(1, 'Label is required').max(100),
  url: z.string().url('Must be a valid URL'),
  username: z.string().max(100).optional(),
  is_active: z.boolean().default(true),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});