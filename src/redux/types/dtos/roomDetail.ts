import {IHotel} from "../hotel";
import {IRoomType} from "../roomType";
import {IReservation} from "../reservation";

export type IRoomDetail = {
    id?: number;
    code?: string;
    floor?: number;
    hotel?: IHotel;
    room_type?: IRoomType;
    reservations?: IReservation[];
}