import React from "react";
import { Button, Table } from "antd";
import { useQuery } from "react-query";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getBlogs } from "../../../../supabase/blogs/get-blogs";

const BlogsTable: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogsList"],
    queryFn: getBlogs,
  });

  const formatDate = (date: string) => {
    return dayjs(date).format("YYYY/MM/DD - HH:mm");
  };

  const handleEdit = (id: number) => {
    console.log("Editing blog with ID:", id);
    navigate(`edit/${id}`);
  };

  if (isError || !blogs) {
    return <div>Error loading blogs or no data available.</div>;
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
    },
    {
      title: "Title (KA)",
      dataIndex: "title_ka",
      key: "title_ka",
    },
    {
      title: "Title (EN)",
      dataIndex: "title_en",
      key: "title_en",
    },
    {
      title: "Description (KA)",
      dataIndex: "description_ka",
      key: "description_ka",
      ellipsis: true,
    },
    {
      title: "Description (EN)",
      dataIndex: "description_en",
      key: "description_en",
      ellipsis: true,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => formatDate(date),
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (url: string) => (
        <img
          src={`${
            import.meta.env.VITE_SUPABASE_BLOG_IMAGES_STORAGE_URL
          }/${url}`}
          alt="Blog"
          style={{ width: 100, height: 50, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Edit",
      dataIndex: "id",
      key: "edit",
      render: (id: number) => (
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
          onClick={() => navigate("/admin/blogs/create")}
          type="primary"
          icon={<PlusOutlined />}
        >
          Create Blog
        </Button>
      )}
      loading={isLoading}
      columns={columns}
      dataSource={blogs}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default BlogsTable;
