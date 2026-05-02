import { Destination } from './destination.model';

export interface Trip {
    _id?: string;
    title: string;
    destination: Destination | string;
    price: number;
    durationInDays: number;
    startDate: Date | string;
    description?: string;
}