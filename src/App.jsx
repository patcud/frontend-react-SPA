import { useRef, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Radio, Row, Space, Select, Table } from 'antd';
import { addUser, removeUser, editUser } from './features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { v1 as uuid } from 'uuid'
import dayjs from 'dayjs';

const { Option } = Select;

const NumbericInput = (props) => {
  const { onChange } = props
  const handleChange = (e) => {
    const { value } = e.target;
    const reg = /^\d*$/;
    if (reg.test(value) || value === '') {
      onChange(value);
    }
  }

  return (
    <Input
      {...props}
      onChange={handleChange}
    />
  )
}

function App() {
  // For Numberic Check
  const [citizenID1, setCitizenID1] = useState("");
  const [citizenID2, setCitizenID2] = useState("");
  const [citizenID3, setCitizenID3] = useState("");
  const [citizenID4, setCitizenID4] = useState("");
  const [citizenID5, setCitizenID5] = useState("");
  const [tel, setTel] = useState("");
  
  const [form] = Form.useForm();
  
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  // For Delete Data
  const [selectedRows, setSelectedRows] = useState([]);
  const handleRemoveUser = () => {
    dispatch(removeUser(selectedRows));
    setSelectedRows([]);
  }

  // For Edit Data
  const [editID, setEditID] = useState(null);
  const formRef = useRef(null);
  const handlePressEdit = (record) => {
    setEditID(record.id);

    formRef.current?.setFieldsValue({
      title: record.title,
      firstname: record.firstname,
      lastname: record.lastname,
      birthdate: dayjs(record.birthdate),
      nationality: record.nationality,
      citizenID1: record.citizenID1,
      citizenID2: record.citizenID2,
      citizenID3: record.citizenID3,
      citizenID4: record.citizenID4,
      citizenID5: record.citizenID5,
      gender: record.gender,
      pretel: record.pretel,
      posttel: record.posttel,
      passport: record.passport,
      salary: record.salary
    });
  };

  const columns = [
    {
      title: 'ชื่อ',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => `${record.title} ${record.firstname} ${record.lastname}`,
      sorter: (a, b) => (a.title + ' ' + a.firstname + ' ' + a.lastname).localeCompare(b.title + ' ' + b.firstname + ' ' + b.lastname),
    },
    {
      title: 'เพศ',
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender),
    },
    {
      title: 'หมายเลขโทรศัพท์มือถือ',
      key: 'tel',
      render: (_, record) => `${record.pretel} - ${record.posttel}`,
      sorter: (a, b) => (a.pretel + ' - ' + a.posttel).localeCompare(b.pretel + ' - ' + b.posttel),
    },
    {
      title: 'สัญชาติ',
      dataIndex: 'nationality',
      key: 'nationality',
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
    },
    {
      title: 'จัดการ',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => handlePressEdit(record)}>แก้ไข</Button>
        </Space>
      )
    }
  ];

  const rowSelection = {
    selectedRows,
    onChange: (selectedRowKeys) => {
      setSelectedRows(selectedRowKeys);
    },
  };

  const deleteButtonDisabled = selectedRows.length === 0;

  const onReset = () => {
    form.resetFields();
    formRef.current = null;
    setEditID(null);
  };

  const onFinish = (value) => {
    const userData = {
      title: value.title,
      firstname: value.firstname,
      lastname: value.lastname,
      birthdate: value.birthdate.$d.toString(),
      nationality: value.nationality,
      citizenID1: value.citizenID1,
      citizenID2: value.citizenID2,
      citizenID3: value.citizenID3,
      citizenID4: value.citizenID4,
      citizenID5: value.citizenID5,
      gender: value.gender,
      pretel: value.pretel,
      posttel: value.posttel,
      passport: value.passport,
      salary: value.salary
    };

    if (editID) {
      userData.id = editID
      dispatch(editUser(userData));

      formRef.current = null;
      setEditID(null);
    } else {
      userData.id = uuid();
      dispatch(addUser(userData));
    }
    form.resetFields();
  };

  return (
    <div>
      <header>
        <h1 className="title">การจัดการหน้าฟอร์ม</h1>
      </header>
      <div className="container">
        <div className="form-field">
          <Form form={form} ref={formRef} onFinish={onFinish}>
            {editID && 
            <Space style={{ paddingBottom: '1em', color: 'red' }}>
              แก้ไขข้อมูลของ ID: {editID}
            </Space>}
            <Row gutter={8}>
              <Col span={6}>
                <Form.Item
                  name="title"
                  label="คำนำหน้า"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="คำนำหน้า"
                    allowClear
                  >
                    <Option value="นาย">นาย</Option>
                    <Option value="นาง">นาง</Option>
                    <Option value="นางสาว">นางสาว</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  name="firstname"
                  label="ชื่อจริง"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  name="lastname"
                  label="นามสกุล"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={6}>
                <Form.Item name="birthdate" label="วันเกิด" rules={[{ required: true }]}>
                  <DatePicker format="MM-DD-YYYY" placeholder="เดือน/วัน/ปี" />
                </Form.Item>
              </Col>
              <Col span={10} offset={1}>
                <Form.Item name="nationality" label="สัญชาติ" rules={[{ required: true }]}>
                  <Select 
                    options={[{ label: 'Thai', value: 'Thai'},{ label: 'American', value: 'American'}]}
                    placeholder="- - กรุณาเลือก - -"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={5}>
                <Form.Item name='citizenID1' label='เลขบัตรประชาชน'>
                  <NumbericInput maxLength={1} value={citizenID1} onChange={setCitizenID1} />
                </Form.Item>
              </Col>
              -
              <Col span={4}>
                <Form.Item name='citizenID2'>
                  <NumbericInput maxLength={4} value={citizenID2} onChange={setCitizenID2} />
                </Form.Item>
              </Col>
              -
              <Col span={4}>
                <Form.Item name='citizenID3'>
                  <NumbericInput maxLength={5} value={citizenID3} onChange={setCitizenID3} />
                </Form.Item>
              </Col>
              -
              <Col span={3}>
                <Form.Item name='citizenID4'>
                  <NumbericInput maxLength={2} value={citizenID4} onChange={setCitizenID4} />
                </Form.Item>
              </Col>
              -
              <Col span={2}>
                <Form.Item name='citizenID5'>
                  <NumbericInput maxLength={1} value={citizenID5} onChange={setCitizenID5} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Form.Item name='gender' label='เพศ' rules={[{ required: true }]}>
                <Radio.Group>
                  <Radio value='male'>ผู้ชาย</Radio>
                  <Radio value='female'>ผู้หญิง</Radio>
                  <Radio value='undefine'>ไม่ระบุ</Radio>
                </Radio.Group>
              </Form.Item>
            </Row>
            <Row gutter={24}>
              <Col span={7}>
                <Form.Item name='pretel' label='หมายเลขโทรศัพท์มือถือ' rules={[{ required: true }]}>
                  <Select>
                    <Option value='06'>06</Option>
                    <Option value='08'>08</Option>
                    <Option value='09'>09</Option>
                  </Select>
                </Form.Item>
              </Col>
              -
              <Col span={6}>
                <Form.Item name='posttel'>
                  <NumbericInput maxLength={8} value={tel} onChange={setTel} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item name='passport' label='หนังสือเดินทาง'>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item name='salary' label='เงินเดือนที่คาดหวัง' rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col offset={4}>
                <Button htmlType='button' onClick={onReset}>
                  ล้างข้อมูล
                </Button>
              </Col>
              <Col offset={2}>
                <Button htmlType='submit'>
                  ส่งข้อมูล
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <br/>
        <div className='table'>
          <Button onClick={handleRemoveUser} disabled={deleteButtonDisabled}>ลบข้มูล</Button>
          <Table
            style={{ marginTop: '1rem' }}
            rowSelection={{ ...rowSelection }}
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={user}
          />
        </div>
      </div>
    </div>
  )
}

export default App
