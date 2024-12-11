import React from "react";
import type { PopconfirmProps } from "antd";
import { Button, message, Popconfirm } from "antd";
import API_ENDPOINTS from "../../../../services/apiConfig";
import MakeRequest from "../../../../services/Fetch/MakeRequest";

const pathDeleteProduct = (id: number) => API_ENDPOINTS.DeleteProduct(id);

interface DeleteProductProps {
  data: number;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ data }) => {
  const confirm: PopconfirmProps["onConfirm"] = async () => {
    try {
      await MakeRequest(pathDeleteProduct(data), "DELETE");
    } catch (error) {
      message.error("delete failure from backend");
    }
    message.success("Deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const cancel: PopconfirmProps["onCancel"] = () => {
    message.error("delete failure");
  };
  return (
    <Popconfirm
      title="Delete product?"
      description="Are you sure to delete?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Button danger className="border-none p-0 m-0 font-medium">Delete</Button>
    </Popconfirm>
  );
};

export default DeleteProduct;
