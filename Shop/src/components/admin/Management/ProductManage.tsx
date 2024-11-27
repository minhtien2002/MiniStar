import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber } from 'antd';

const ProductManage: React.FC = () => {
    const [products, setProducts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        // Fetch products from API or database
        // Example: setProducts(fetchedProducts);
    }, []);

    const handleAddProduct = () => {
        setEditingProduct(null);
        setIsModalVisible(true);
    };

    const handleEditProduct = (product: any) => {
        setEditingProduct(product);
        setIsModalVisible(true);
    };

    const handleDeleteProduct = (productId: number) => {
        // Delete product logic
        // Example: setProducts(products.filter(product => product.id !== productId));
    };

    const handleModalOk = (values: any) => {
        if (editingProduct) {
            // Update product logic
            // Example: setProducts(products.map(product => product.id === editingProduct.id ? values : product));
        } else {
            // Add product logic
            // Example: setProducts([...products, { ...values, id: new Date().getTime() }]);
        }
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Stock', dataIndex: 'stock', key: 'stock' },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
                <>
                    <Button onClick={() => handleEditProduct(record)}>Edit</Button>
                    <Button onClick={() => handleDeleteProduct(record.id)} danger>Delete</Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={handleAddProduct}>Add Product</Button>
            <Table dataSource={products} columns={columns} rowKey="id" />
            <Modal
                title={editingProduct ? 'Edit Product' : 'Add Product'}
                visible={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <Form
                    initialValues={editingProduct || { name: '', price: 0, stock: 0 }}
                    onFinish={handleModalOk}
                >
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingProduct ? 'Update' : 'Add'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductManage;