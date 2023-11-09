import { useSelect } from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";
import {
    Form,
    Input,
    Row,
    Col,
    Select,
} from "antd";

export default () => {
    const { selectProps: groupSelectProps } = useSelect({
        resource: "ledger-group",
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
        <Row gutter={[64, 0]} wrap>
            <Col xs={6} lg={6}>
                <Form.Item
                    label={t("common.name")}
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("common.code")}
                    name="code"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={t("common.group")}
                    name="ledger_group_id"
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
    )
}