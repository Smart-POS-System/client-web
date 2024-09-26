import {
  Modal,
  Steps,
  Input,
  Form,
  Radio,
  Button,
  DatePicker,
  AutoComplete,
} from "antd";
import { useState } from "react";

const { Step } = Steps;
const { RangePicker } = DatePicker;

function AddStockForm({ existingProducts, visible, onClose, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({});
  //   const [isBarcodeDisabled, setIsBarcodeDisabled] = useState(false);
  const [productType, setProductType] = useState("add"); // 'add' or 'update'
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleCancel = () => {
    // setFormData({});
    form.resetFields();
    setCurrentStep(0);
    onClose();
  };

  const handleNext = (values) => {
    setFormData((prev) => ({
      ...prev,
      ...values,
    }));
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    form
      .validateFields()
      .then((values) => {
        const finalData = { ...formData, ...values };
        onSubmit(finalData); // Pass collected data to parent
        onClose(); // Close modal after submission
        handleCancel();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleSelect = (value) => {
    console.log("Selected Product:", value); // Optional: Handle selected value
    setSelectedProduct(value);
    const product = existingProducts.find(
      (item) => item.product_name === value
    );
    if (product) {
      form.setFieldsValue({ barcode: product.barcode });
    }
  };

  const handleSearch = (value) => {
    const filteredOptions = existingProducts
      .filter((item) =>
        item.product_name.toLowerCase().includes(value.toLowerCase())
      )
      .map((item) => ({
        value: item.product_name,
      }));
    setOptions(filteredOptions);
  };

  const steps = [
    {
      title: "Select/ Add Product",
      content: (
        <Form form={form} onFinish={handleNext} id={`form-0`}>
          <Form.Item
            name="productName"
            label="Product Name"
            rules={[{ required: true, message: "Product name is required" }]}
          >
            <AutoComplete
              options={options}
              onSearch={handleSearch}
              onSelect={handleSelect}
              placeholder="Search for a product"
            >
              <Input />
            </AutoComplete>
          </Form.Item>
          <Form.Item
            name="unitWeight"
            label="Unit Weight"
            rules={[{ required: true, message: "Unit Weight is required" }]}
          >
            <Input type="number" step={"0.001"} />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Select/ Add Item",
      content: (
        <Form form={form} onFinish={handleNext} id={`form-1`}>
          <Form.Item
            name="buyingPrice"
            label="Buying Price"
            rules={[{ required: true, message: "Buying Price is required" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="sellingPrice"
            label="Selling Price"
            rules={[{ required: true, message: "Selling Price is required" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="mfd-exp"
            label="MFD - EXP"
            rules={[
              {
                required: true,
                message: "Manufactured and Expiring dates are required",
              },
            ]}
          >
            <RangePicker size={"middle"} />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Add New Stock",
      content: (
        <Form form={form} onFinish={handleFinish} id={`form-2`}>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: "Quantity is required" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="barcode"
            label="Barcode"
            rules={[{ required: true, message: "Barcode is required" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <Modal
      title={"Add New Stock"}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Steps current={currentStep}>
        {steps.map((step, index) => (
          <Step key={index} title={step.title} />
        ))}
      </Steps>
      <div>{steps[currentStep].content}</div>
      <div className="mt-6 flex justify-end">
        {currentStep > 0 && (
          <Button className="mx-2" onClick={handlePrev}>
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button type="primary" htmlType="submit" form={`form-${currentStep}`}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={handleFinish}>
            Done
          </Button>
        )}
      </div>
    </Modal>
  );
}

export default AddStockForm;
