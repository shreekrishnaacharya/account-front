
import {
    getValueFromEvent,
} from "@refinedev/antd";
import {
    Form,
    Upload,
    Input,
    Space,
    Avatar,
    Row,
    Col,
    Radio,
    DatePicker,
    Typography
} from "antd";

import InputMask from "react-input-mask";
// import { IEmployee } from "interfaces";
import { EmploymentType, Gender, Marriage, Status } from "common/options";
import * as dayjs from 'dayjs'
import { useTranslate } from "@refinedev/core";
import { useNepaliDateConverter } from "hooks";
import ReactQuill from 'react-quill';

const { Text } = Typography;

export const EmployeeForm = () => {
    const t = useTranslate();
    const { nepaliDate: dob_np, englishDate: dob_en, handleNepaliDateChange: handleDobEn, handleEnglishDateChange: handleDobNp } = useNepaliDateConverter({ type: "en" });
    const { nepaliDate: doj_np, englishDate: doj_en, handleNepaliDateChange: handleDojEn, handleEnglishDateChange: handleDojNp } = useNepaliDateConverter({ type: "en" });

    return <>
        <Row gutter={20}>
            <Col xs={24} sm={24} lg={8}>
                <Form.Item>
                    <Form.Item
                        name="avatar"
                        valuePropName="fileList"
                        getValueFromEvent={getValueFromEvent}
                        noStyle
                    >
                        <Upload.Dragger
                            name="file"
                            // action={`${apiUrl}/media/upload`}
                            listType="picture"
                            maxCount={1}
                            multiple
                            style={{
                                border: "none",
                                width: "100%",
                                background: "none",
                            }}
                        >
                            <Space direction="vertical" size={2}>
                                <Avatar
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        maxWidth: "200px",
                                    }}
                                    src="/images/user-default-img.png"
                                    alt="Employee Image"
                                />
                                <Text
                                    style={{
                                        fontWeight: 800,
                                        fontSize: "16px",
                                        marginTop: "8px",
                                    }}
                                >
                                    {t(
                                        "employee.fields.images.description",
                                    )}
                                </Text>
                                <Text style={{ fontSize: "12px" }}>
                                    {t("employee.fields.images.validation")}
                                </Text>
                            </Space>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={16}>
                <Row gutter={10}>
                    <Col xs={24} lg={12}>
                        <Form.Item
                            label={t("employee.fields.name")}
                            name="name"
                            required
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Form.Item
                            label={t("employee.fields.email")}
                            name="email"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Form.Item
                            label={t("employee.fields.phone1")}
                            name="phone1"
                        >
                            <InputMask mask="(999) 999 99 99">
                                {/* 
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore */}
                                {(props) => {
                                    return <Input {...props} />;
                                }}
                            </InputMask>
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Form.Item
                            label={t("employee.fields.phone2")}
                            name="phone2"
                        >
                            <InputMask mask="(999) 999 99 99">
                                {/* 
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore */}
                                {(props) => {
                                    return <Input {...props} />;
                                }}
                            </InputMask>
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Form.Item
                            label={t("employee.fields.gender")}
                            name="gender"
                            required
                        >
                            <Radio.Group>
                                {Object.values(Gender).map(e => {
                                    return <Radio key={e} value={e}>{e}</Radio>
                                })}
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Form.Item
                            label={t("employee.fields.employment")}
                            name="employment"
                            required
                        >
                            <Radio.Group>
                                {Object.values(EmploymentType).map(e => {
                                    return <Radio key={e} value={e}>{e}</Radio>
                                })}
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Form.Item
                            label={t("employee.fields.marriage")}
                            name="married"
                            required
                        >
                            <Radio.Group>
                                {Object.values(Marriage).map(e => {
                                    return <Radio key={e} value={e}>{e}</Radio>
                                })}
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Form.Item
                            label={t("common.status")}
                            name="status"
                            required
                        >
                            <Radio.Group>
                                {Object.values(Status).map(e => {
                                    return <Radio key={e} value={e}>{e}</Radio>
                                })}
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={20}>
            <Col xs={24} lg={12}>
                <Form.Item
                    label={t("employee.fields.dob_en")}
                    name="dob_en"
                    initialValue={dayjs(dob_en)}
                >
                    <DatePicker
                        value={dayjs(dob_en)}
                        onChange={(dayjs, dateString) => handleDobEn(dateString)}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item
                    label={t("employee.fields.dob_np")}
                    name="dob_np"
                    initialValue={dob_np}
                    noStyle
                >
                    <Input type="hidden"
                        value={dob_np}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item
                    label={t("employee.fields.doj_en")}
                    name="doj_en"
                    initialValue={dayjs(doj_en)}
                >
                    <DatePicker
                        value={dayjs(doj_en)}
                        onChange={(dayjs, dateString) => handleDojEn(dateString)}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item
                    label={t("employee.fields.doj_np")}
                    name="doj_np"
                    initialValue={doj_np}
                    noStyle
                >
                    <Input type="hidden"
                        value={doj_np}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
                <Form.Item
                    label={t("employee.fields.ledger_name")}
                    name="ledger_name"
                    required
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item
                    label={t("employee.fields.ledger_code")}
                    name="ledger_code"
                    required
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item
                    label={t("employee.fields.address1")}
                    name="address1"
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item
                    label={t("employee.fields.address2")}
                    name="address2"
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item
                    label={t("employee.fields.bank_no")}
                    name="bank_no"
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
                <Form.Item
                    label={t("employee.fields.type")}
                    name="type"
                >
                    <Input />
                </Form.Item>
            </Col>

        </Row>
        <Form.Item
            label={t("employee.fields.qualification")}
            name="qualification"
        >
            <ReactQuill theme="snow" />
        </Form.Item>

    </>
}