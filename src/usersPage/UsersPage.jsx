import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Avatar, List } from "antd";
import { useUsersStore } from "../index";

function UsersPage() {

    const [ color, setColor] = useState('')
    const randomColor = () =>{
      let red = parseInt(Math.random()*255)
      let blue = parseInt(Math.random()*255)
      let green = parseInt(Math.random()*255)
      setColor(red+', '+green+', '+ blue)
    }

    const { users, setUsers } = useUsersStore()

  const fetchUsers = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    return response.data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  useEffect( ()=>{
    if(data) setUsers(data)
  }, [data, setUsers])

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;



  
  

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(item) => (
          <List.Item style={{ width: 500 }}>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{ backgroundColor: '#2831e2', verticalAlign: "middle" }}
                  size="large"
                  gap={1}
                >
                  {item.name[0]}
                </Avatar>
              }
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.email}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default UsersPage;
