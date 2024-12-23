import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../../../supabase";
import { useEditBlogs } from "../../../../react-query/mutation/blog/edit/edit-blogs";
import { useGetSingleBlog } from "../../../../react-query/query/blogs/blogs";

interface FormValues {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  image_url?: string;
}

const BlogEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(""); // Current image URL
  const [newImagePreview, setNewImagePreview] = useState<string>(""); // Preview for the new image

  const { data: blog, isLoading, isError } = useGetSingleBlog(id);

  const { mutate: updateBlogMutation, isLoading: updateLoading } =
    useEditBlogs();

  useEffect(() => {
    if (blog) {
      form.setFieldsValue({
        title_ka: blog.title_ka,
        title_en: blog.title_en,
        description_ka: blog.description_ka,
        description_en: blog.description_en,
        image_url: blog.image_url || "",
      });
      setImageUrl(
        `${import.meta.env.VITE_SUPABASE_BLOG_IMAGES_STORAGE_URL}/${
          blog.image_url
        }`
      );
    }
  }, [blog, form]);

  const handleFinish = async (values: FormValues) => {
    if (imageFile) {
      const { error } = await supabase.storage
        .from("blog_images")
        .upload(imageFile.name, imageFile);

      if (error) {
        message.error("Failed to upload image. Please try again.");
        return;
      }

      values.image_url = imageFile.name;
    }

    updateBlogMutation(
      { id, ...values },
      {
        onSuccess: () => {
          message.success("Blog updated successfully!");
          navigate("/admin/blogs");
        },
        onError: () => {
          message.error("Failed to update blog. Please try again.");
        },
      }
    );
  };

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setNewImagePreview(URL.createObjectURL(file));
    return false;
  };
  const handleDeleteNewImage = () => {
    setImageFile(null);
    setNewImagePreview("");
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

        <Form.Item label="Current Image">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Current"
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "contain",
                marginBottom: "12px",
              }}
            />
          ) : (
            <div>No current image available</div>
          )}
        </Form.Item>

        <Form.Item label="New Image">
          <Upload
            multiple={false}
            accept="image/*"
            beforeUpload={handleImageUpload}
            maxCount={1}
            onRemove={handleDeleteNewImage}
          >
            <Button icon={<UploadOutlined />}>Click to upload new image</Button>
          </Upload>
          {newImagePreview && (
            <img
              src={newImagePreview}
              alt="New Preview"
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "contain",
                marginTop: "12px",
              }}
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={updateLoading}>
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
