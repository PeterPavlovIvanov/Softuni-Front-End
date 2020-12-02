import { User } from './user';

export interface Twit {
    id: string,
    text: string;
    usersLike: [],
    usersDislike: [],
    username: string;
}