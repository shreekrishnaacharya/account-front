import { DeleteOutlined, MailOutlined, PlusCircleOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
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
    Button,
    Tag,
    Divider
} from "antd";

const { TextArea } = Input

const { Title } = Typography;
export default ({ multiDr = true, multiCr = true }) => {
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
        <>
            <div style={{ backgroundColor: "#eee", padding: "20px 20px 10px", borderTopLeftRadius: 20, borderTopRightRadius: 20 }} >
                <Row gutter={[24, 20]} wrap>
                    <Col span={14} >
                        <Title level={5} >{t("common.account").toUpperCase()}</Title>
                    </Col>
                    <Col span={4}>
                        <Title level={5}>{t("common.dr")}</Title>
                    </Col>
                    <Col span={4}>
                        <Title level={5}>{t("common.cr")}</Title>
                    </Col>
                    <Col span={2}>
                        <Title level={5}>{t("common.action").toUpperCase()}</Title>
                    </Col>
                </Row>
            </div>
            <div style={{ backgroundColor: "#18ff161c", padding: "20px 20px 0px" }} >
                <Form.List name="drEntry" initialValue={[{}]}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={[24, 20]} wrap>
                                    <Col span={14}>
                                        <Form.Item
                                            label={t("common.by")}
                                            {...restField}
                                            name={[name, "ledger_id"]}
                                        >
                                            <Select
                                                {...groupSelectProps}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            noStyle
                                            name={[name, "amount"]}
                                        >
                                            <Input
                                                addonBefore={"Rs"}
                                                placeholder="Dr amount"
                                                type="number"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}></Col>
                                    <Col span={2} style={{ textAlign: "center" }}>
                                        {(key === 0 && multiDr) ? (
                                            <Button
                                                type="primary"
                                                icon={<PlusOutlined />}
                                                onClick={() => add()}
                                            />
                                        ) : (
                                            <Button
                                                type="primary"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => remove(name)}
                                            />
                                        )}
                                    </Col>
                                </Row>
                            ))}
                        </>
                    )}
                </Form.List>
            </div>
            <div style={{ backgroundColor: "#1677ff1c", padding: "20px 20px 0px" }} >
                <Form.List name="crEntry" initialValue={[{}]}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={[24, 20]} wrap>
                                    <Col span={14}>
                                        <Form.Item
                                            label={t("common.to")}
                                            {...restField}
                                            name={[name, "ledger_id"]}
                                        >
                                            <Select
                                                {...groupSelectProps}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}></Col>
                                    <Col span={4}>
                                        <Form.Item
                                            noStyle
                                            name={[name, "amount"]}
                                        >
                                            <Input
                                                addonBefore={"Rs"}
                                                placeholder="Cr amount"
                                                type="number"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={2} style={{ textAlign: "center" }}>
                                        {(key === 0 && multiCr) ? (
                                            <Button
                                                type="primary"
                                                icon={<PlusOutlined />}
                                                onClick={() => add()}
                                            />
                                        ) : (
                                            <Button
                                                type="primary"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => remove(name)}
                                            />
                                        )}
                                    </Col>
                                </Row>
                            ))}
                        </>
                    )}
                </Form.List>
            </div>
            <div style={{ backgroundColor: "#5a4fff45", padding: "20px 20px 20px", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} >
                <Row gutter={[24, 20]} wrap >
                    <Col span={14} >
                        <Title level={5} >{t("common.total").toUpperCase()}</Title>
                    </Col>
                    <Col span={4}>
                        <Input addonBefore={"Rs"} value={100} readOnly />
                    </Col>
                    <Col span={4}>
                        <Input addonBefore={"Rs"} value={100} readOnly />
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Row gutter={[24, 20]} wrap style={{ marginTop: 20 }}>
                    <Col span={24} >
                        <Form.Item
                            name={"narration"}
                        >
                            <TextArea rows={4}
                                placeholder="Enter your narration here"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </div>
        </>
    )
}