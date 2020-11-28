import { User } from './user';

export interface Twit {
    text: string;
    likes: number;
    dislikes: number;
    user: User;
}