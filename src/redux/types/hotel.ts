import { IRoomType } from './roomType';

export type IHotel = {
  id?: number;
  name?: string;
  address?: string;
  description?: string;
  files?: [];
  room_types?: IRoomType[];
};
