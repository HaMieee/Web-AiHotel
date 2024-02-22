import {IHotel} from "./hotel";
import {IRoomType} from "./roomType";

export type IRoom = {
    id?: number;
    code?: string;
    floor?: number;
    hotel?: IHotel;
    room_type?: IRoomType;
}