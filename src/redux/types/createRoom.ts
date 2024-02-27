import {IHotel} from "./hotel";
import {IRoomType} from "./roomType";

export type ICreateRoom = {
    id?: number;
    code?: string;
    floor?: number;
    hotel?: string;
    room_type?: string;
}