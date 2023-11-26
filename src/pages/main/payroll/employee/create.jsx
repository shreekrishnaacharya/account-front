import {
    IResourceComponentsProps,
    useTranslate,
    useApiUrl,
} from "@refinedev/core";
import {
    Create,
    getValueFromEvent,
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

const { Text } = Typography;

export const EmployeeCreate = () => {
    const t = useTranslate();
    const {
        form,
        formProps,
        queryResult,
        mutationResult,
        saveButtonProps
    } = useForm();

    const errors = useErrorParser(form, mutationResult);
    return (
        <>
            <Create
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
            </Create >
        </>
    );
};
