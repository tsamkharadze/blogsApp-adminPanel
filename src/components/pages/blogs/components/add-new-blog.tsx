import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../../supabase";
interface BlogFormValues {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  id: string;
}

const AddBlog: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  console.log(imageFile);
  const handleFinish = async (values: BlogFormValues) => {
    try {
      if (!imageFile) {
        message.error("Please select an image");
        return;
      }

      const { error: uploadError } = await supabase.storage
        .from("blog_images")
        .upload(imageFile.name, imageFile);

      if (uploadError) {
        throw uploadError;
      }

      const { error: insertError } = await supabase.from("blogs").insert({
        title_ka: values.title_ka,
        title_en: values.title_en,
        description_ka: values.description_ka,
        description_en: values.description_en,
        image_url: imageFile.name,
        user_id: values.id,
      });

      if (insertError) {
        throw insertError;
      }

      message.success("Blog created successfully!");
      navigate("/admin/blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
      message.error("Failed to create blog post");
    }
  };

  const handleImageUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Image must be smaller than 5MB!");
      return false;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    return false;
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview("");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <h2>Create a New Blog</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          title_ka: "",
          title_en: "",
          description_ka: "",
          description_en: "",
        }}
      >
        <Form.Item
          label="Title (Georgian)"
          name="title_ka"
          rules={[
            {
              required: true,
              message: "Please enter the blog title in Georgian",
            },
            { min: 5, message: "Title must be at least 5 characters" },
          ]}
        >
          <Input placeholder="Enter blog title in Georgian" />
        </Form.Item>

        <Form.Item
          label="Title (English)"
          name="title_en"
          rules={[
            {
              required: true,
              message: "Please enter the blog title in English",
            },
            { min: 5, message: "Title must be at least 5 characters" },
          ]}
        >
          <Input placeholder="Enter blog title in English" />
        </Form.Item>

        <Form.Item
          label="Description (Georgian)"
          name="description_ka"
          rules={[
            {
              required: true,
              message: "Please enter the blog description in Georgian",
            },
            { min: 10, message: "Description must be at least 10 characters" },
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter blog description in Georgian"
          />
        </Form.Item>

        <Form.Item
          label="Description (English)"
          name="description_en"
          rules={[
            {
              required: true,
              message: "Please enter the blog description in English",
            },
            { min: 10, message: "Description must be at least 10 characters" },
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter blog description in English"
          />
        </Form.Item>

        <Form.Item label="Image" required>
          <Upload
            accept="image/*"
            beforeUpload={handleImageUpload}
            onRemove={handleImageRemove}
            maxCount={1}
            showUploadList={{
              showPreviewIcon: true,
              showRemoveIcon: true,
            }}
          >
            {!imageFile && (
              <Button icon={<UploadOutlined />}>Click to upload image</Button>
            )}
          </Upload>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
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
          <Button type="primary" htmlType="submit">
            Create Blog
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

export default AddBlog;
