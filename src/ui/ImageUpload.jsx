import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, message, Modal } from "antd";
import ImgCrop from "antd-img-crop";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function ImageUpload({ onImageChange, reset, image, onRemoveImage }) {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // Handle the initial image coming from the parent
  useEffect(() => {
    if (image && typeof image === "string") {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: image,
          thumbUrl: image,
        },
      ]);
    }
  }, [image]);

  // Handle resetting the image
  useEffect(() => {
    if (reset) {
      setFileList([]);
      onImageChange(null); // Notify parent that image has been cleared
      onRemoveImage(); // Notify parent that image has been removed
    }
  }, [reset, onImageChange, onRemoveImage]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview || "");
    setPreviewOpen(true);
  };

  const handleChange = async ({ fileList }) => {
    setFileList(fileList.slice(-1)); // Ensure only the most recent file is shown

    const file = fileList[0];
    if (file) {
      if (file.status === "done") {
        const base64 = await getBase64(file.originFileObj);
        onImageChange(base64);
      } else if (file.status === "removed") {
        onImageChange(null);
      }
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage || Upload.LIST_IGNORE;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          customRequest={({ file, onSuccess }) => onSuccess("ok")}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          accept="image/*"
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </ImgCrop>
      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}

export default ImageUpload;
