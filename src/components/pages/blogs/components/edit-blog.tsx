import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getBlogById } from "../../../../supabase/blogs/get-blogs";
import { updateBlog } from "../../../../supabase/blogs/edit-blog";
import { supabase } from "../../../../supabase";

const BlogEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery(["blog", id], () => getBlogById(id as string), {
    enabled: !!id,
  });

  const mutation = useMutation(updateBlog, {
    onSuccess: () => {
      message.success("Blog updated successfully!");
      navigate("/admin/blogs");
    },
    onError: () => {
      message.error("Failed to update blog. Please try again.");
    },
  });

  useEffect(() => {
    if (blog) {
      form.setFieldsValue({
        title_ka: blog.title_ka,
        title_en: blog.title_en,
        description_ka: blog.description_ka,
        description_en: blog.description_en,
        image_url: blog.image_url || "",
      });
      setImageUrl(blog.image_url || "");
    }
  }, [blog, form]);

  const handleFinish = async (values: any) => {
    console.log(values);
    // mutation.mutate({ id, ...values });
  };

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    return false; // Prevent auto-upload
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blog details.</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <h2>Edit Blog</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          title_ka: "",
          title_en: "",
          description_ka: "",
          description_en: "",
          image_url: "",
        }}
      >
        <Form.Item
          label="Title (KA)"
          name="title_ka"
          rules={[
            { required: true, message: "Please enter the Georgian title" },
          ]}
        >
          <Input placeholder="Enter Georgian title" />
        </Form.Item>

        <Form.Item
          label="Title (EN)"
          name="title_en"
          rules={[
            { required: true, message: "Please enter the English title" },
          ]}
        >
          <Input placeholder="Enter English title" />
        </Form.Item>

        <Form.Item
          label="Description (KA)"
          name="description_ka"
          rules={[
            {
              required: true,
              message: "Please enter the Georgian description",
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter Georgian description" />
        </Form.Item>

        <Form.Item
          label="Description (EN)"
          name="description_en"
          rules={[
            { required: true, message: "Please enter the English description" },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter English description" />
        </Form.Item>

        <Form.Item label="Image" name="image_url">
          <Upload
            multiple={false}
            accept="image/*"
            beforeUpload={handleImageUpload}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Current Image">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "contain",
                marginBottom: "12px",
              }}
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={mutation.isLoading}>
            Save Changes
          </Button>
          <Button
            style={{ marginLeft: "12px" }}
            onClick={() => navigate("/admin/blogs")}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BlogEdit;
