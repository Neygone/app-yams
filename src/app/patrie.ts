import { Favorite } from "./priority";

export interface Pastrie {
    id: string;
    ref: string;
    name: string;
    description: string;
    url: string;
    quantity: number;
    order: number;
    tags?: Array<string>;
    like?: string;
    priority: Favorite;
}