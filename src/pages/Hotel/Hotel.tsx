import {Col, Row,  Pagination} from "react-bootstrap";
import ListHotels from "./ListHotels";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {manageHotelActions} from "../../redux/slices/manageHotel.slice";
import {RootState} from "../../redux/store";
import {IHotel} from "../../redux/types/hotel";
import {IPaginateResponse} from "../../redux/types/page";
import {isEmpty, map} from "lodash";
import PaginationComponent from "../../layouts/components/pagination/PaginationComponent";
import {useNavigate} from "react-router";

const Hotel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listHotelState = useSelector((state: RootState) => state.manageHotel.hotels);
    const metaState = useSelector((state: RootState) => state.manageHotel.paginate);

    const [listHotelData, setListHotelData] = useState<IHotel[]>([]);
    const [metaData, setMetaData] = useState<IPaginateResponse>({});
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        dispatch({
            type: `${manageHotelActions.getListHotelPending}_saga`,
            payload: {
                per_page: 3,
                page: currentPage,
            }
        })
    }, [currentPage]);

    useEffect(() => {
        setListHotelData(listHotelState);
        setMetaData(metaState);
    }, [listHotelState, metaState])

    const handleChangePage = (page: number) => {
        setCurrentPage(page)
    }

    const handleCheckHotel = (hotelId: number) => {
        navigate(`/hotel/${hotelId}`)
    }

    return (
        <>
            <div className={"container-fluid mt-3"}>
                <div>
                    <h3 style={{fontSize:'54px', fontFamily:'-moz-initial', fontStyle:'italic', textAlign:'center'}}>Most famous hotel in Ha Noi</h3>
                </div>
                <Row>
                    <Col className={'mt-2'} md={2} style={{border: 'solid 1px #CAB39E', borderRadius: '10px'}}>
                        <div className={'container-fluid  support'}>
                            <div>Help & Support</div>
                            <div>Hotline:</div>
                            <div>
                                <div>
                                    <span>Hà Nội</span>
                                    <span>19002310</span>
                                </div>
                                <div>
                                    <span>TP.HCM</span>
                                    <span>19000711</span>
                                </div>
                                <div>
                                    <span>CT</span>
                                    <span>19000608</span>
                                </div>
                            </div>
                            <div>Email:</div>
                            <div>aihotel123@gmail.com</div>
                        </div>
                    </Col>
                    <Col>
                        <ListHotels listHotelData={listHotelData} onCheckHotel={handleCheckHotel}/>
                        <div className={'d-flex justify-content-center'}>
                            <PaginationComponent totalPages={metaData.total_pages} currentPage={currentPage} onChangePage={handleChangePage} />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
};

export default Hotel;