import React from 'react';
import Table from 'react-bootstrap/Table';

type ITableManage = {
    headers: string[];
    // data: [];
}
const TableManage: React.FC<ITableManage> = ({
    headers,
    // data = []
                     }) => {
    return (
        <Table striped bordered hover variant="light">
            <thead>
            <tr>
                {headers.map((header, header_index) => (
                    <th key={header_index}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
            <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
            </tr>
            </tbody>
        </Table>
    );
}

export default TableManage;