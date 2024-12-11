import { Button, Drawer, Modal, Popconfirm, theme } from "antd";
import React, { useState } from "react";

interface Categories {
  categoryId: number;
  categoryName: string;
  createAt: Date;
  updateAt: Date;
  isDelete: boolean;
}

interface Brands {
  brandId: number;
  brandName: string;
  createAt: Date;
  updateAt: Date;
  isDelete: boolean;
}

interface Props {
  listCategory?: Array<Categories>;
  listBrand?: Array<Brands>;
  title: string;
}

export const ModalDrawer: React.FC<Props> = ({
  title,
  listBrand,
  listCategory,
}) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="">
        <Button type="primary" onClick={showDrawer}>
          {title + " Management"}
        </Button>
        <Drawer title={"Create " + title} onClose={onClose} open={open}>
          <div>
            <input
              type="text"
              placeholder={"Name " + title}
              className="border rounded px-2 py-1 w-[80%]"
            />
            <button className="float-right p-1 border rounded bg-blue-600 text-white  ">
              Create
            </button>
          </div>
          <h1 className="font-bold py-2">{title} List</h1>
          <div>
            {listBrand?.map((item) => (
              <div className="flex justify-between">
                <p>{item.brandName}</p>
                <Popconfirm
                  title="Delete product?"
                  description="Are you sure to delete?"
                  //   onConfirm={confirm}
                  //   onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger className="border-none p-0 m-0 font-medium">
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            ))}
            {listCategory?.map((item) => (
              <div className="flex justify-between ">
                <p>{item.categoryName}</p>
                <Popconfirm
                  title="Delete product?"
                  description="Are you sure to delete?"
                  //   onConfirm={confirm}
                  //   onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger className="border-none p-0 m-0 font-medium">
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    </>
  );
};
