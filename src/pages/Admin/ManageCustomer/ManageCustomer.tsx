import { useEffect, useState } from "react";
import {Button} from "react-bootstrap";
import { BsFillHouseAddFill } from "react-icons/bs";
import TableManage from "../../../layouts/components/table/TableManage";
import { useDispatch, useSelector } from "react-redux";
import { manageCustomerActions } from "../../../redux/slices/manageCustomer.slice";
import { ICustomer } from "../../../redux/types/customer";
import { RootState } from "../../../redux/store";
import { map } from "lodash";
import { useNavigate } from "react-router";

const typeActions = ['delete', 'detail'];

const ManageCustomer = () => {
    const customersState: ICustomer[] = useSelector((state: RootState) => state.manageCustomer.customers);
    const dispatch = useDispatch()
    const [showCreate, setShowCreate] = useState(false);
    const [customerData, setCustomerData] = useState<ICustomer[]>([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        dispatch({
            type: `${manageCustomerActions.getListCustomerPending}_saga`,
        });
    }, [])

    useEffect(() => {
        setCustomerData(buildCustomerData(customersState));
    }, [customersState])

    const buildCustomerData = (data: ICustomer[]) => {
        const newData = data.map(c => {
            return {
                id: c.id,
                name: c.name,
                phone: c.phone,
                address: c.address,
                identification: c.identification,
                age: c.age,
                email: c.email,
            }
        })
        return newData;
    }

    const handleOnAction = (recordId, action) => {
        if (action === 'detail') {
            return navigate(`/manage-customer/${recordId}`)
        }
    }

    console.log(customersState)
    return(
        <>
             <div className={'float-end p-2'}>
                <Button variant={'success'}
                        className={'d-flex align-items-center'}
                        onClick={() => setShowCreate(true)}
                >
                    <BsFillHouseAddFill className={'me-2'}/>
                    Thêm
                </Button>
            </div>
            <TableManage 
            headers={['STT', 'Name', 'Phone', 'Address', 'Identification', 'Age', 'Email', 'Actions']}
            data={customerData}
            useIdx={true}
            actions={map(typeActions, (action) => ({ type: action }))}
            onAction={handleOnAction}
            />
        </>
    )
}

export default ManageCustomer