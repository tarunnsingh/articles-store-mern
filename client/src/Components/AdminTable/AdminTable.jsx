import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AdminService from "../../Services/AdminService";

const AdminTable = () => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    AdminService.getAllUsers().then((res) => {
      setUserList(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <Table striped bordered hover style={{ marginTop: "2rem" }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Articles Count</th>
        </tr>
      </thead>
      <tbody>
        {userList
          ? userList.map((user, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{user.originalName}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.todos.length}</td>
                </tr>
              );
            })
          : null}
      </tbody>
    </Table>
  );
};

export default AdminTable;
