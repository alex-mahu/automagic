import dotenv from 'dotenv';

dotenv.config();

export const APP_URL:string = process.env['APP_URL']!;