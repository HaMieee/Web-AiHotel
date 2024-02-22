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

const Hotel = () => {
    const dispatch = useDispatch();
    const listHotelState = useSelector((state: RootState) => state.manageHotel.hotels);
    const metaState = useSelector((state: RootState) => state.manageHotel.paginate);

    const [listHotelData, setListHotelData] = useState<IHotel[]>([]);
    const [metaData, setMetaData] = useState<IPaginateResponse>({});
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        dispatch({
            type: `${manageHotelActions.getListHotelPending}_saga`,
            payload: {
                per_page: 4,
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

    return (
        <>
            <div className={"container-fluid mt-3"}>
                <Row>
                    <Col md={4} style={{border: 'solid 1px #CAB39E', borderRadius: '10px'}}>
                        <div className={'container-fluid'}>Page support</div>
                    </Col>
                    <Col>
                        <ListHotels listHotelData={listHotelData}/>
                        <div className={'d-flex float-end'}>
                            <PaginationComponent totalPages={metaData.total_pages} currentPage={currentPage} onChangePage={handleChangePage} />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
};

export default Hotel;