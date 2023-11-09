import {
    useTranslate,
} from "@refinedev/core";
import {
    Create,
    Edit,
    useForm,
} from "@refinedev/antd";
import {
    Form,
    Typography,
    Row,
    Col,
} from "antd";
import { useErrorParser } from "hooks";
import * as dayjs from 'dayjs'
import { EmployeeForm } from "./_form";
import { useEffect } from "react";

// const { Text } = Typography;

export const EmployeeEdit = () => {
    const t = useTranslate();
    const {
        form,
        formProps,
        queryResult,
        mutationResult,
        saveButtonProps,

    } = useForm();
    const dob_en = form.getFieldValue("dob_en");
    const doj_en = form.getFieldValue("doj_en");
    // console.log(queryResult)
    form.setFieldValue("dob_en", dayjs(dob_en))
    form.setFieldValue("doj_en", dayjs(doj_en))
    form.setFieldValue("ledger_name", queryResult.data?.data.ledger.name)
    form.setFieldValue("ledger_code", queryResult.data?.data.ledger.code)
    const errors = useErrorParser(form, mutationResult);
    return (
        <>
            <Edit
                isLoading={queryResult?.isFetching}
                saveButtonProps={saveButtonProps}
            >
                <Form
                    {...formProps}
                    style={{ marginTop: 30 }}
                    layout="vertical"
                    onFinish={(e) => {
                        console.log(e)
                        formProps.onFinish({
                            ...e,
                            dob_en: dayjs(e.dob_en).format("YYYY-MM-DD"),
                            doj_en: dayjs(e.doj_en).format("YYYY-MM-DD")
                        })
                    }}
                >
                    <EmployeeForm />
                    {errors.length > 0 && (
                        <Row gutter={[24, 20]} wrap style={{ marginTop: 20 }}>
                            <Col span={24} style={{ color: "red" }}>
                                <ul>
                                    {
                                        errors.map(e => {
                                            return <li key={e}>{e}</li>
                                        })
                                    }
                                </ul>
                            </Col>
                        </Row>
                    )}
                </Form >
            </Edit >
        </>
    );
};
