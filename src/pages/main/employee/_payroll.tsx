import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelect } from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";
import {
    Form,
    Row,
    Col,
    Select,
    Typography,
    Input,
    Button
} from "antd";

const { Title } = Typography;
export default () => {
    const { selectProps: groupSelectProps } = useSelect({
        resource: "ledger",
        optionLabel: "name",
        optionValue: "id",
    });
    const t = useTranslate();

    return (
        <>
            <div style={{ backgroundColor: "#eee", padding: "10px 7px 0px" }} >
                <Row gutter={[24, 20]} wrap>
                    <Col span={10} >
                        <Title level={5} >{t("common.ledger").toUpperCase()}</Title>
                    </Col>
                    <Col span={4}>
                        <Title level={5}>{t("common.type")}</Title>
                    </Col>
                    <Col span={6}>
                        <Title level={5}>{t("common.amount")}</Title>
                    </Col>
                    <Col span={4}>
                        <Title level={5}>{t("common.action").toUpperCase()}</Title>
                    </Col>
                </Row>
            </div>
            <div style={{ padding: "20px 20px 0px" }} >
                <Form.List name="payroll" initialValue={[{}]}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={[24, 20]} wrap>
                                    <Col span={10}>
                                        <Form.Item
                                            label={false}
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
                                            label={false}
                                            {...restField}
                                            name={[name, "type"]}
                                        >
                                            <Select
                                                style={{ width: "100%" }}
                                                options={[{ id: "plus", label: "Plus", value: "plus" }, { id: "minus", label: "Minus", value: "minus" }]}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            noStyle
                                            name={[name, "amount"]}
                                        >
                                            <Input
                                                addonBefore={"Rs"}
                                                placeholder="amount"
                                                type="number"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4} style={{ textAlign: "center" }}>
                                        {(key === 0) ? (
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
        </>
    )
}