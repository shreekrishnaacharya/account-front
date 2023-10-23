import { DeleteOutlined, FileAddFilled, MailOutlined, PlusCircleOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useSelect } from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";
import {
    Form,
    Row,
    Col,
    Select,
    Typography,
    Table,
    Input,
    Space,
    Button
} from "antd";
import Column from "antd/es/table/Column";

const { Title } = Typography;
export default () => {
    const { selectProps: groupSelectProps } = useSelect({
        resource: "ledger",
        optionLabel: "name",
        optionValue: "id",
        onSearch: (value) => [
            {
                field: "name",
                operator: "eq",
                value,
            }
        ],
    });
    const t = useTranslate();
    return (
        <div className="ant-table-wrapper">
            <table style={{ width: "auto", minWidth: "100%", tableLayout: "auto" }}>
                <thead className="ant-table-thead">
                    <tr>
                        <th style={{ width: "50%", textAlign: "center" }} aria-label={t("common.account")} className="ant-table-cell" tab-index={0} scope="col">
                            <div className="ant-table-column-sorters">
                                <span className="ant-table-column-title">{t("common.account")}</span>
                            </div>
                        </th>
                        <th style={{ width: "20%", textAlign: "center" }} aria-label={t("common.account")} className="ant-table-cell" tab-index={0} scope="col">
                            <div className="ant-table-column-sorters">
                                <span className="ant-table-column-title">{t("common.dr")}</span>
                            </div>
                        </th>
                        <th style={{ width: "20%", textAlign: "center" }} aria-label={t("common.account")} className="ant-table-cell" tab-index={0} scope="col">
                            <div className="ant-table-column-sorters">
                                <span className="ant-table-column-title">{t("common.cr")}</span>
                            </div>
                        </th>
                        <th style={{ width: "10%", textAlign: "center" }} aria-label={t("common.account")} className="ant-table-cell" tab-index={0} scope="col">
                            <div className="ant-table-column-sorters">
                                <span className="ant-table-column-title">{t("common.action")}</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <Form.List name="drEntry">
                        {(fields, { add, remove }) => (
                            <>
                                <tr>
                                    <td style={{ width: "50%" }} className="ant-table-cell" tab-index={0} scope="col">
                                        <Form.Item
                                            label={t("common.by")}
                                            name="ledger_id"
                                            style={{ textAlign: "left", padding: "0px 20px" }}
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Select
                                                {...groupSelectProps}
                                            />
                                        </Form.Item>
                                    </td>
                                    <td style={{ width: "20%", textAlign: "center" }} className="ant-table-cell" tab-index={0} scope="col">
                                        <Form.Item
                                            name={"amount"}
                                            style={{ textAlign: "left", padding: "0px 20px" }}
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </td>
                                    <td style={{ width: "20%", textAlign: "center" }} className="ant-table-cell" tab-index={0} scope="col">
                                    </td>
                                    <td style={{ width: "10%", textAlign: "center" }} className="ant-table-cell" tab-index={0} scope="col">
                                        <Button
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={() => add()}
                                        />
                                    </td>
                                </tr>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row key={key} gutter={12} align="middle">
                                        <Col span={11}>
                                            <Form.Item
                                                noStyle
                                                {...restField}
                                                name={[name, "name"]}
                                            >
                                                <Input
                                                    addonBefore={<UserOutlined />}
                                                    placeholder="Contact name"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={11}>
                                            <Form.Item
                                                noStyle
                                                name={[name, "email"]}
                                            >
                                                <Input
                                                    addonBefore={<MailOutlined />}
                                                    placeholder="Contact email"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}>
                                            <Button
                                                type="primary"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => remove(name)}
                                            />
                                        </Col>
                                    </Row>
                                ))}
                            </>
                        )}
                    </Form.List>
                </tbody>
            </table>
            <Row gutter={[64, 0]} wrap color={"grey"}>
                <Col xs={6} lg={16}>
                    <Title level={5}>{t("common.account").toUpperCase()}</Title>
                </Col>
                <Col xs={6} lg={3}>
                    <Title level={5}>{t("common.dr")}</Title>
                </Col>
                <Col xs={6} lg={3}>
                    <Title level={5}>{t("common.cr")}</Title>
                </Col>
                <Col xs={6} lg={2}>
                    <Title level={5}>{t("common.action").toUpperCase()}</Title>
                </Col>
            </Row>
            <Row gutter={[64, 0]} wrap>
                <Col xs={24} lg={16}>
                    <Form.Item
                        label={t("common.by")}
                        name="ledger_id"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            {...groupSelectProps}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[64, 0]} wrap>
                <Col xs={24} lg={16}>
                    <Form.Item
                        label={t("common.to")}
                        name="ledger_id"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            style={{ marginLeft: 50 }}
                            {...groupSelectProps}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </div>
    )
}