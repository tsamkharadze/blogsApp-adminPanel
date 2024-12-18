import React from "react";
import { Button, Table } from "antd";
import { useQuery } from "react-query";
import { getUsersListInAdmin } from "../../../../supabase/users/get-users";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

// Define the type for a user
interface User {
  id: string;
  email: string;
  email_confirmed_at: string;
  last_sign_in_at: string;
  created_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
}

const UsersTable: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["usersInAdmin"],
    queryFn: getUsersListInAdmin,
  });

  const handleEdit = (id: string) => {
    console.log("Editing user with ID:", id);
    navigate(`edit/${id}`);
  };

  const formatDate = (date?: string | null) => {
    return date ? dayjs(date).format("YYYY/MM/DD - HH:mm") : "";
  };
  if (isError || !users) {
    return <div>Error loading users or no data available.</div>;
  }
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Email Confirmed At",
      dataIndex: "email_confirmed_at",
      key: "email_confirmed_at",
      render: formatDate,
    },
    {
      title: "Last Sign-In",
      dataIndex: "last_sign_in_at",
      key: "last_sign_in_at",
      render: formatDate,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: formatDate,
    },
    {
      title: "Provider",
      dataIndex: "app_metadata",
      key: "provider",
      render: (app_metadata: User["app_metadata"]) => app_metadata.provider,
    },
    {
      title: "Edit",
      dataIndex: "id",
      key: "edit",
      render: (id: string) => (
        <EditOutlined
          onClick={() => handleEdit(id)}
          style={{
            cursor: "pointer",
            color: "blue",
            fontSize: "18px",
            transition: "color 0.3s ease",
          }}
        />
      ),
    },
  ];

  return (
    <Table
      title={() => (
        <Button
          onClick={() => navigate("create")}
          type="primary"
          icon={<PlusOutlined />}
        >
          Create User
        </Button>
      )}
      loading={isLoading}
      columns={columns}
      dataSource={users}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default UsersTable;
