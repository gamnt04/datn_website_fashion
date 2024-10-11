import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Row, Col, Table, Tag, Image, Space, Modal, Divider } from 'antd';
import { SearchOutlined, ShoppingOutlined, UserOutlined, DollarOutlined, CalendarOutlined, HomeOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

interface Order {
  orderNumber: string;
  totalPrice: number;
  status: string;
  customerInfo: {
    userName: string;
    phone: string;
    email: string;
    address: string;
  };
  createdAt: string;
  items: {
    productId: {
      _id: string;
      name_product: string;
      image_product: string;
      description_product: string;
    };
    quantity: number;
    price_item: number;
    color_item: string;
    name_size: string;
    total_price_item: number;
  }[];
}

const statusMapping: { [key: string]: string } = {
  "1": "Chờ xác nhận",
  "2": "Đang chuẩn bị hàng",
  "3": "Đang vận chuyển",
  "4": "Giao hàng thành công",
  "5": "Giao hàng thất bại",
  "6": "Hoàn thành",
  "7": "Hủy",
};
const statusColorMapping: { [key: string]: string } = {
    "1": "orange", // Chờ xác nhận
    "2": "blue",   // Đang chuẩn bị hàng
    "3": "yellow", // Đang vận chuyển
    "4": "green",  // Giao hàng thành công
    "5": "red",    // Giao hàng thất bại
    "6": "purple", // Hoàn thành
    "7": "gray",   // Hủy
  };
  
const TrackOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { phone: string }) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:2004/api/v1/orders_phone?phone=${values.phone}`);
      const fetchedOrders = response.data.orders;
      setOrders(fetchedOrders || []);
      if (fetchedOrders.length === 0) {
        message.warning('Không tìm thấy đơn hàng nào.');
      }
    } catch (error) {
      message.error('Không tìm thấy đơn hàng nào');
    }
    setLoading(false);
  };

  // Cấu hình các cột hiển thị cho danh sách các đơn hàng
  const orderColumns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (orderNumber: string) => <Tag color="blue">{orderNumber}</Tag>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => new Date(createdAt).toLocaleString(),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice: number) => `${totalPrice.toLocaleString()}đ`,
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => (
          <Tag color={statusColorMapping[status] || "default"}>
            {statusMapping[status]}
          </Tag>
        ),
      },
      {
        title: 'Xem chi tiết',
        key: 'action',
        render: (text: any, record: Order) => (
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => setSelectedOrder(record)}
          >
            Xem chi tiết
          </Button>
        ),
      },
  ];

  // Cấu hình các cột hiển thị cho sản phẩm trong đơn hàng
  const productColumns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productId',
      key: 'name_product',
      render: (product: { name_product: string; image_product: string }) => (
        <Space>
          <Image
            width={50}
            src={product.image_product}
            alt={product.name_product}
            style={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
          />
          <Text style={{ fontWeight: 'bold' }}>{product.name_product}</Text>
        </Space>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Kích cỡ',
      dataIndex: 'name_size',
      key: 'name_size',
    },
    {
      title: 'Màu sắc',
      dataIndex: 'color_item',
      key: 'color_item',
      render: (color: string) => <Tag color="blue">{color}</Tag>,
    },
    {
      title: 'Giá',
      dataIndex: 'price_item',
      key: 'price_item',
      render: (price: number) => `${price.toLocaleString()}đ`,
    },
    {
      title: 'Tổng',
      dataIndex: 'total_price_item',
      key: 'total_price_item',
      render: (total: number) => <Text strong>{`${total.toLocaleString()}đ`}</Text>,
    },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Tiêu đề và mô tả */}
      <Card
  style={{
    marginBottom: '20px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    textAlign: 'center',
  }}
>
  <Title level={2}>Tra cứu Đơn Hàng</Title>
  <Text type="secondary">Nhập số điện thoại của bạn để theo dõi trạng thái đơn hàng.</Text>
  
  <Form onFinish={onFinish} layout="inline" style={{ justifyContent: 'center', marginTop: '20px' }}>
  <Form.Item
  name="phone"
  rules={[
    { required: true, message: 'Vui lòng nhập số điện thoại!' },
    {
      pattern: /^(0[3|5|7|8|9][0-9]{8})$/, // Regular expression for Vietnamese phone numbers
      message: 'Số điện thoại không hợp lệ! Vui lòng nhập lại.',
    },
  ]}
>
  <Input placeholder="Nhập số điện thoại" style={{ width: '300px', borderRadius: '8px' }} />
</Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" loading={loading} icon={<SearchOutlined />} style={{ borderRadius: '8px' }}>
        Tra cứu
      </Button>
    </Form.Item>
  </Form>
</Card>

<Card
  style={{
    marginBottom: '20px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  }}
>
  <Image
    src="https://hoanghamobile.com/Content/web/content-icon/icon-youknow.png"
    width={170} // Increased width for a larger image
    style={{ marginRight: '20px' }} // Add margin for spacing
  />
  <Text
    style={{
      flex: 1,
      textAlign: 'center',
      margin: '0 10px',
      fontSize: '16px', // Increased font size
      color: '#333', // Darker text color for better readability
    }}
  >
    ĐĂNG NHẬP SẼ GIÚP BẠN QUẢN LÝ ĐƠN HÀNG CỦA MÌNH VÀ TRẢI NGHIỆM WEBSITE TỐT HƠN
  </Text>
  <Link to="/login">
  <Button type="primary" style={{ borderRadius: '8px', padding: '10px 20px' }}>
    Đăng Nhập
  </Button>
  </Link>
</Card>


      {/* Hiển thị danh sách các đơn hàng nếu có nhiều đơn hàng */}
      {orders.length > 0 && (
        <Card
          title={<Title level={4}><ShoppingOutlined /> Danh sách đơn hàng</Title>}
          style={{ marginBottom: '20px', padding: '20px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}
        >
          <Table
            dataSource={orders}
            columns={orderColumns}
            pagination={false}
            rowKey="orderNumber"
          />
        </Card>
      )}

      {/* Modal hiển thị chi tiết đơn hàng khi người dùng chọn */}
      <Modal
  visible={!!selectedOrder}
  title="Chi tiết đơn hàng"
  onCancel={() => setSelectedOrder(null)}
  footer={null}
  width={800}
>
  {selectedOrder && (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12} md={8}>
          <Text strong><ShoppingOutlined /> Mã đơn hàng:</Text> 
          <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.orderNumber}</Tag>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Text strong><CalendarOutlined /> Ngày mua:</Text> 
          <Text>{new Date(selectedOrder.createdAt).toLocaleString()}</Text>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Text strong><DollarOutlined /> Tổng tiền:</Text> 
          <Tag color="green" style={{ marginLeft: '8px' }}>{selectedOrder.totalPrice.toLocaleString()}đ</Tag>
        </Col>
      </Row>

      {/* <Steps current={parseInt(selectedOrder.status) - 1} style={{ marginBottom: '20px' }}>
        {Object.entries(statusMapping).map(([key, value]) => (
          <Step key={key} title={value} />
        ))}
      </Steps> */}
<Row style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
  {Object.entries(statusMapping).map(([key, value], index, array) => (
    <Col key={key} style={{ display: 'flex', alignItems: 'center' }}>
      <Text
        style={{
          fontWeight: selectedOrder?.status === key ? 'bold' : 'normal',
          fontSize: '16px',
          color: selectedOrder?.status === key ? '#1890ff' : '#8c8c8c', // Màu xanh cho trạng thái hiện tại, xám cho trạng thái khác
        }}
      >
        {value}
      </Text>

      {index !== array.length - 1 && (
        <Divider type="vertical" style={{ height: '20px', margin: '0 10px', borderColor: '#d9d9d9' }} />
      )}
    </Col>
  ))}
</Row>

      {/* Thông tin khách hàng */}
      <Card
        title={<Title level={4}><UserOutlined /> Thông tin khách hàng</Title>}
        style={{ marginBottom: '20px', padding: '20px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        {/* <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>

          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>

        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Text strong><UserOutlined /> Tên khách hàng:</Text> 
            <Tag color="blue" style={{ marginLeft: '8px' }}>{selectedOrder.customerInfo.userName}</Tag>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>SĐT:</Text> <Text>{selectedOrder.customerInfo.phone}</Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Text strong>Email:</Text> <Text>{selectedOrder.customerInfo.email}</Text>
          </Col>
          <Col span={24}>
            <Text strong><HomeOutlined /> Địa chỉ:</Text> 
            <Text>{selectedOrder.customerInfo?.address || 'Không có địa chỉ'}</Text>
          </Col>
        </Row> */}
      </Card>

      {/* Thông tin sản phẩm */}
      <Card
        title={<Title level={4}><ShoppingOutlined /> Thông tin sản phẩm</Title>}
        style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}
      >
        <Table
          dataSource={selectedOrder.items}
          columns={productColumns}
          pagination={false}
          rowKey={(record) => record.productId._id}
        />
      </Card>
    </>
  )}
</Modal>
    </div>
  );
};

export default TrackOrder;
