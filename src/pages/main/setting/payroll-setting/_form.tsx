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
    const { selectProps: ledgerSelectProps } = useSelect({
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
        <Row gutter={[64, 0]} wrap>
            <Col xs={24} lg={24}>
                <Form.Item
                    label={t("common.ledger")}
                    name="ledger_id"
                    required
                >
                    <Select
                        {...ledgerSelectProps}
                    />
                </Form.Item>
                <Form.Item
                    label={t("payrollSetting.fields.amount")}
                    name="max_amount"
                >
                    <Input />
                </Form.Item>
            </Col>
        </Row>
    )
}