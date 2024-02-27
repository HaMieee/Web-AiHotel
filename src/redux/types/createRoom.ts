import {IHotel} from "./hotel";
import {IRoomType} from "./roomType";

export type ICreateRoom = {
    id?: number;
    floor?: number;
    hotel_id?: number;
    room_type_id?: number;
}