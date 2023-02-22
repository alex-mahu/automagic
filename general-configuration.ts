import dotenv from 'dotenv';

dotenv.config();

export const APP_URL:string = process.env['APP_URL'] || 'https://dev-qa-challenge.dev.sherpany.io'; // the url I was having it in .env file