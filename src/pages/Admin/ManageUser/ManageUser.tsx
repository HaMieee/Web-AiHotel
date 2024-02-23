import { useEffect, useState } from "react";
import {Button} from "react-bootstrap";
import { BsFillHouseAddFill } from "react-icons/bs";
import TableManage from "../../../layouts/components/table/TableManage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { map } from "lodash";
import { useNavigate } from "react-router";
import CreateUserModal from "../../../layouts/components/modals/CreateUserModal";
import { ICreateUser } from "../../../redux/types/dtos/createUser";
import { manageUserActions } from "../../../redux/slices/manageUser.slice";
import { IUser } from "../../../redux/types/user";

const typeActions = ['delete', 'detail'];

const ManageUser = () => {
    const manageUserState = useSelector((state: RootState) => state.manageUser.users);
    const dispatch = useDispatch()
    const [showCreate, setShowCreate] = useState(false);
    const [userData, setUserData] = useState<IUser[]>([]);
    const [roleType, setRoleType] = useState('customer');
    const navigate = useNavigate();

    
    useEffect(() => {
        dispatch({
            type: `${manageUserActions.getListUserPending}_saga`,
            payload: {
                per_page: 5,
                page: 1,
                role_type: roleType,
            }
        });
    }, [])

    useEffect(() => {
        setUserData(buildUserData(manageUserState));
        setShowCreate(false);
    }, [manageUserState])

    const buildUserData = (data: IUser[]) => {
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

    const handleFetchDataUsers = (roleType: string) => {
                dispatch({
            type: `${manageUserActions.getListUserPending}_saga`,
            payload: {
                per_page: 3,
                page: 1,
                role_type: roleType,
            }
        });
        setRoleType(roleType)
    }

    const handleOnAction = (recordId, action) => {
        if (action === 'detail') {
            return navigate(`/manage-customer/${recordId}`)
        }
    }

    const handleCreateUser = (createUserData: ICreateUser) => {
        dispatch({
            type: `${manageUserActions.createUserPending}_saga`,
            payload: createUserData,
        })
    }
    return(
        <>
            
            <div className='user'>
                    <button className={roleType === 'customer' ? 'active' : ''} onClick={() => handleFetchDataUsers('customer')}>Khách hàng</button>
                    <button className={roleType === 'employee' ? 'active' : ''} onClick={() => handleFetchDataUsers('employee')}>Nhân viên </button>
            </div>

            <div className={'d-flex float-end p-2'} onClick={() => setShowCreate(true)}>
                <Button variant={'success'}
                        className={'d-flex align-items-center'}
                        style={{marginTop:'14px', marginRight:'15px'}}
                >
                    <BsFillHouseAddFill className={'me-2'}/>
                    Thêm
                </Button>
            </div>
            <TableManage 
            headers={['STT', 'Name', 'Phone', 'Address', 'Identification', 'Age', 'Email', 'Actions']}
            data={userData}
            useIdx={true}
            actions={map(typeActions, (action) => ({ type: action }))}
            onAction={handleOnAction}
            />

            <CreateUserModal
                isShow={showCreate}
                onClose={() => setShowCreate(false)}
                onCreateUser={handleCreateUser}
            />
        </>
    )
}

export default ManageUser