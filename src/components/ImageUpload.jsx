import React, { useEffect, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Image, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import toast from "react-hot-toast";

function ImageUpload({ onImageChange, reset, image }) {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // Handle file upload
  const handleChange = async ({ fileList }) => {
    const latestFile = fileList.slice(-1)[0]; // Get the most recent file
    if (latestFile && latestFile.status === "done" && !latestFile.thumbUrl) {
      latestFile.thumbUrl = await getBase64(latestFile.originFileObj);
    }
    setFileList(fileList.slice(-1)); // Keep only the most recent file
    onImageChange(latestFile?.originFileObj || null); // Send the file to the parent component
  };

  // Handle file preview
  const handlePreview = async (file) => {
    try {
      let preview = file.url || file.preview;

      if (!preview && file.originFileObj) {
        preview = await getBase64(file.originFileObj);
      }

      if (typeof preview === "string") {
        setPreviewImage(preview);
        setPreviewOpen(true);
      } else {
        console.error("Preview is not a valid string:", preview);
        toast.error("Preview is not a valid string");
      }
    } catch (error) {
      console.error("Error in handlePreview:", error);
      toast.error("Error in handlePreview");
    }
  };

  // Handle file upload progress
  const handleProgress = (event, file) => {
    console.log(`File: ${file.name}, Progress: ${event.percent}%`);
  };

  // Convert file to base64
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage || Upload.LIST_IGNORE;
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          customRequest={({ file, onSuccess }) => {
            // Mock uploading, invoke onSuccess immediately
            onSuccess("ok");
          }}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          accept="image/*"
          progress={{
            strokeColor: {
              "0%": "#108ee9",
              "100%": "#87d068",
            },
            strokeWidth: 3,
            format: (percent) =>
              percent && `${parseFloat(percent.toFixed(2))}%`,
          }}
          onProgress={handleProgress}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </ImgCrop>
      {previewImage && (
        <Image
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: () => !previewOpen && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
}

export default ImageUpload;
