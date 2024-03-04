import React, { useEffect, useState } from 'react';
import { Button, Col, Image, Offcanvas, Row } from 'react-bootstrap';
import './HotelRooms.css';
import RoomDetail from './RoomDetail';
import { IRoom } from '../../redux/types/room';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { manageRoomActions } from '../../redux/slices/manageRoom.slice';
import { RootState } from '../../redux/store';
import { IRoomDetail } from '../../redux/types/dtos/roomDetail';

type IHotelRooms = {
  roomsData: IRoom[];
};

const HotelRooms: React.FC<IHotelRooms> = ({ roomsData = [] }) => {
  const dispatch = useDispatch();
  const roomDetailState = useSelector(
    (state: RootState) => state.manageRoom.roomDetail,
  );
  const [show, setShow] = useState(false);
  const [groupedRooms, setGroupedRooms] = useState({});
  const [roomDetail, setRoomDetail] = useState<IRoomDetail>({});

  useEffect(() => {
    setGroupedRooms(groupRoomsByFloor(roomsData));
  }, [roomsData]);

  useEffect(() => {
    setRoomDetail(roomDetailState);
  }, [roomDetailState]);

  const handleClose = () => setShow(false);

  const groupRoomsByFloor = rooms => {
    const groupedRooms = {};
    rooms.forEach(room => {
      if (!groupedRooms[room.floor]) {
        groupedRooms[room.floor] = [];
      }
      groupedRooms[room.floor].push(room);
    });
    return groupedRooms;
  };

  const handleShowDetail = (room_id: number) => {
    dispatch({
      type: `${manageRoomActions.getRoomDetailPending}_saga`,
      payload: room_id,
    });
    setShow(true);
  };

  return (
    <>
      <div className={'container-fluid'}>
        {!isEmpty(groupedRooms) &&
          Object.keys(groupedRooms).map((floor, f_index) => (
            <div className={'container-floors'} key={f_index}>
              <div className={'floor'}>
                <h5>Tầng {floor}</h5>
              </div>
              <div className={'rooms container-fluid'}>
                <Row>
                  {groupedRooms[floor].map((room, r_index) => (
                    <Col sm={4} key={r_index}>
                      <div className={'container-room'}>
                        <Image
                          src={
                            'https://i.pinimg.com/564x/81/ff/8b/81ff8be11f48e4ced51bacb31eab8146.jpg'
                          }
                          rounded
                          className={'object-fit-cover h-100'}
                          style={{ width: '40%' }}
                        />
                        <div
                          className={'ms-3'}
                          style={{ width: '60%', height: '100%' }}
                        >
                          <div>
                            <h4 className={'custom-inline'}>P.{room.code}</h4>
                            <div className={'room-title'}>
                              <div>{room.room_type.name}</div>
                            </div>
                            <p
                              style={{
                                marginTop: '3%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                maxHeight: '100%',
                                fontSize: '13px',
                              }}
                            >
                              {room.room_type.description}
                            </p>
                          </div>
                          <div
                            className={'d-flex'}
                            style={{
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <div className={'room-price'}>
                              ${room.room_type.price}
                            </div>
                            <div>
                              <Button
                                size={'sm'}
                                onClick={() => handleShowDetail(room.id)}
                              >
                                Detail
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          ))}
      </div>

      <RoomDetail show={show} handleClose={handleClose} roomData={roomDetail} />
    </>
  );
};

export default HotelRooms;
