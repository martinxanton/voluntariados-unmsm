import * as dotenv from 'dotenv';

dotenv.config();

export const PORT: number = parseInt(process.env.PORT || '3000', 10);
export const API_USERS_URL: string = process.env.API_USERS_URL || '';
export const API_POSTS_URL: string = process.env.API_POSTS_URL || '';
export const API_RECOMMENDER_URL: string = process.env.API_RECOMMENDER_URL || '';
