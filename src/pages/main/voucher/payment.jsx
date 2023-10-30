import { useTranslate } from "@refinedev/core";

import {
    Card, Col, Form, Input, Row,
} from "antd";

import VoucherForm from "./_form";
import { Create, useForm } from "@refinedev/antd";
import { useErrorParser, useNepaliDateConverter } from "hooks";
import { Typography } from 'antd';

export const PurchaseEntry = () => {
    const t = useTranslate();
    const {
        formProps,
        saveButtonProps,
        queryResult,
        form,
        mutationResult
    } = useForm({
        action: "create",
        syncWithLocation: true,
    });
    const { nepaliDate, englishDate, handleNepaliDateChange, handleEnglishDateChange } = useNepaliDateConverter({ type: "en" });
    const { Text } = Typography;
    const errors = useErrorParser(mutationResult.error?.response.data);


    return (
        <Card
            style={{
                margin: "8px",
            }}
            bodyStyle={{ minHeight: "500px" }}
        >
            <Create
                isLoading={queryResult?.isFetching}
                saveButtonProps={saveButtonProps}
            >
                <Form {...formProps}>
                    <div>
                        <Row gutter={[24, 20]} wrap>
                            <Col span={4} push={20}>
                                <Form.Item
                                    label={t("common.date")}
                                    name="transaction_date_en"
                                    initialValue={englishDate}
                                >
                                    <Input type={"date"} value={englishDate} onChange={handleEnglishDateChange} />
                                </Form.Item>
                                <Form.Item
                                    label={t("common.date")}
                                    name="transaction_date_np"
                                    initialValue={nepaliDate}
                                    noStyle
                                >
                                    <Input type="hidden" value={nepaliDate} onChange={handleNepaliDateChange} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <VoucherForm multiCr={false} />
                    {errors.message.length > 0 && (
                        <Row gutter={[24, 20]} wrap style={{ marginTop: 20 }}>
                            <Col span={24} style={{ color: "red" }}>
                                <ul>
                                    {
                                        errors.message.map(e => {
                                            return <li>{e}</li>
                                        })
                                    }
                                </ul>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Create>
        </Card>
    );
};
