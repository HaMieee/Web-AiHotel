import React, {useEffect, useState} from 'react';
import {map, chain} from "lodash";
import {initEcho} from "../../services/ws.service";

const WsExample = () => {
  const [usersRoom, setUsersRoom] = useState([]);

  useEffect(() => {
    if (!window.Echo) {
      window.Echo = initEcho();
    }
  }, []);

  const hotels = [
    { id: 1, name: 'Hotel A' },
    { id: 2, name: 'Hotel B' },
  ]
  const rooms = [
    { id: 1, name: 'Room 1', hotel_id: 1 },
    { id: 2, name: 'Room 2', hotel_id: 1 },
    { id: 3, name: 'Room 1', hotel_id: 2},
    { id: 4, name: 'Room 2', hotel_id: 2 },
    { id: 5, name: 'Room 3', hotel_id: 2 },
  ];

  const [hotelSelected, setHotelSelected] = useState(null);
  const [roomSelected, setRoomSelected] = useState(null);
  const [roomOldSelected, setRoomOldSelected] = useState(null);

  const applyJoin = () => {
    window.Echo?.leave(`presence.room.${roomOldSelected}`);

    window.Echo?.join(`presence.room.${roomSelected}`)
      .here((users) => {
        setUsersRoom(users);
      })
      .joining((user) => {
        setUsersRoom(prevState => [...prevState, user]);
      })
      .leaving((user) => {
        setUsersRoom(prevState => prevState.filter(u => u.id !== user.id));
      });
  }

  console.log('users room: ', usersRoom)

  return <>
    <select onChange={(event) => setHotelSelected(parseInt(event?.target?.value))}>Hotel
      <option value="0">Select Hotel</option>
      {map(hotels, function (item) {
        return <option value={item.id} key={`hotel_${item.id}`}>{item.name}</option>
      })}
    </select>

    <br/>
    <br/>

    {hotelSelected && <select onChange={(e) => {
      if (roomSelected) {
        setRoomOldSelected(roomSelected);
      }
      setRoomSelected(parseInt(e?.target?.value))
    }}> Room
      <option value="0">Select Room</option>
      {chain(rooms).filter(function (item) {
        return item.hotel_id === hotelSelected
      }).map(function (item) {
        return <option value={item.id} key={`hotel_${item.id}`}>{item.name}</option>
      }).value()}
    </select>}

    <br/>
    <br/>

    HotelId {hotelSelected} - RoomId {roomSelected}

    <br/>
    <br/>

    {hotelSelected && roomSelected && <a href="#" onClick={applyJoin}>Join</a>}

    <br/>
    User In Room

    {map(usersRoom, function (item) {
      return <div key={item.id}>
        - {item.name}
      </div>
    })}

  </>;
}

export default WsExample;