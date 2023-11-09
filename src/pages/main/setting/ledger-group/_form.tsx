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
    const { selectProps: bsHeadSelectProps } = useSelect({
        resource: "ledger-group/bshead",
        optionLabel: "label",
        optionValue: "value"
    });
    const t = useTranslate();
    return (
        <Row gutter={[64, 0]} wrap>
            <Col xs={24} lg={16}>
                <Form.Item
                    label={t("ledger_group.fields.name")}
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
                    label={t("ledger_group.fields.bsHead")}
                    name="bs_head"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        {...bsHeadSelectProps}
                    />
                </Form.Item>
            </Col>
        </Row>
    )
}