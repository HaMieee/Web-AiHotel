import {IRoomType} from "../roomType";

export type IUpdateHotel = {
    hotel_id?: string;
    name?: string;
    description?: string;
    address?: string;
    room_types?: number[];
}