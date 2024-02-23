import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ICreateUser } from '../../../redux/types/dtos/createUser';

type ICreateUserModal = {
    isShow: boolean;
    onClose: () => void;
    onCreateUser: (payload: ICreateUser) => void;
}
const CreateUserModal: React.FC<ICreateUserModal> = ({
    isShow = false,
    onClose,
    onCreateUser,
}) => {
    const [formCreateUser, setFormCreateUser] = useState<ICreateUser>({
        name:'',
        address:'',
        phone:'',
        identification:'',
        email:'',
        age: 0,
        password:'',
        role_type: ''
    });
    const [selectedRole, setSelectedRole] = useState('customer');

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    useEffect(() => {
        if (!isShow) {
            handleClearValue()
        }
    }, [isShow])

    const handleClearValue = () => {
        setFormCreateUser({
            name:'',
            address:'',
            phone:'',
            identification:'',
            email:'',
            age: 0,
            password:'',
            role_type: ''
        })
    }

    const handleCreateUser = async () => {
        const userData: ICreateUser = {
            name: formCreateUser.name,
            address: formCreateUser.address,
            age: formCreateUser.age,
            email:formCreateUser.email,
            identification:formCreateUser.identification,
            phone:formCreateUser.phone ,
            password: formCreateUser.password,
            role_type: selectedRole,
        }
        onCreateUser(userData);
    }
    
    return(
        <>
            <Modal show={isShow} onHide={onClose} size={'lg'} backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={'container-fluid'}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Họ và Tên</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Họ và Tên"
                                    value={formCreateUser.name}
                                    onChange={e => setFormCreateUser({
                                        ...formCreateUser,
                                        name: e.target.value,
                                    })}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Địa chỉ:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Địa chỉ"
                                    value={formCreateUser.address}
                                    onChange={e => setFormCreateUser({
                                        ...formCreateUser,
                                        address: e.target.value,
                                    })}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>SĐT</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="SĐT"
                                    value={formCreateUser.phone}
                                    onChange={e => setFormCreateUser({
                                        ...formCreateUser,
                                        phone: e.target.value,
                                    })}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>CCCD</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="CCCD"
                                    value={formCreateUser.identification}
                                    onChange={e => setFormCreateUser({
                                        ...formCreateUser,
                                        identification: e.target.value,
                                    })}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Email"
                                    value={formCreateUser.email}
                                    onChange={e => setFormCreateUser({
                                        ...formCreateUser,
                                        email: e.target.value,
                                    })}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Tuổi</Form.Label>
                                <Form.Control
                                    required
                                    type="Number"
                                    placeholder="Tuổi"
                                    value={formCreateUser.age}
                                    onChange={e => setFormCreateUser({
                                        ...formCreateUser,
                                        age: Number(e.target.value),
                                    })}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md={6}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Password"
                                    value={formCreateUser.password}
                                    onChange={e => setFormCreateUser({
                                        ...formCreateUser,
                                       password: e.target.value,
                                    })}
                                />
                            </Form.Group>
                        </Row>
                        <Form.Select aria-label="Default select example" onChange={handleRoleChange} defaultValue={selectedRole}>
                            <option value="customer">Customer</option>
                            <option value="employee">Employee</option>
                        </Form.Select>
                        
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Đóng
                    </Button>
                    <Button variant="success" onClick={handleCreateUser}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateUserModal