import { ClearOutlined, ClockCircleOutlined, CloseOutlined, DeleteOutlined, EditFilled, PlusCircleFilled, PlusOutlined, SaveFilled } from "@ant-design/icons";
import { EditButton, List, SaveButton, Show, TextField, useEditableTable, useForm, useModalForm, useSelect } from "@refinedev/antd";
import { useOne, useTranslate } from "@refinedev/core";
import {
    Typography,
    Card,
    Space,
    Empty,
    Spin,
    Modal,
    Form,
    Row,
    Col,
    Table,
    Button,
    Input
} from "antd";
import { useEffect, useState } from "react";

function FormList({ setFormState, formState, form }: any) {
    return (
        <Form.List name="annualDeduction"
            initialValue={Object.values(formState)}
        >
            {(_fields) => (
                <>
                    {Object.values(formState).map(({ amount, ledger_id, ledger }: any, name: number) => <Row key={name}>
                        <Col sm={20} xl={11}><Typography.Text>{ledger}</Typography.Text></Col>
                        <Col sm={4} xl={1}>:</Col>
                        <Col sm={24} xl={12}>
                            <Form.Item
                                name={[name, `amount`]}
                                noStyle
                                initialValue={amount | 0}
                            >
                                <Input type="number"
                                    onChange={(e) => {
                                        const amt = parseFloat(e.target.value)
                                        setFormState((p: any) => {
                                            return {
                                                ...p,
                                                [ledger_id]: { ledger, ledger_id, amount: amt }
                                            }
                                        })
                                    }} />
                            </Form.Item>
                            <Form.Item
                                name={[name, `ledger_id`]}
                                initialValue={ledger_id}
                                noStyle
                                hidden
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    )}
                </>
            )}
        </Form.List>
    )
}


export default ({ employeeId }: any) => {
    const [formState, setFormState] = useState({});
    const [isEditing, setEditing] = useState(false);
    const { data: annualDeduction, isLoading } = useOne<any>({
        resource: `annual-deduction`,
        id: employeeId
    });
    const t = useTranslate();
    const { form, formLoading, formProps, saveButtonProps } = useForm<any>({
        resource: "annual-deduction",
        id: employeeId,
        action: "edit",
        redirect: false,
        onMutationSuccess: () => {
            setEditing(false)
        }
    });

    useEffect(() => {
        let data: any = {}
        annualDeduction?.data.forEach((e: any) => {
            data[e.ledger_id] = { amount: e.amount, ledger_id: e.ledger_id, ledger: e.ledger.name }
        })
        form.setFieldValue("annualDeduction", Object.values(data))
        setFormState(data)
    }, [annualDeduction?.data])

    useEffect(() => {
        form.setFieldValue("annualDeduction", Object.values(formState))
    }, [formState])

    // console.log(annualDeduction)
    return (
        <Card title={"Annual Deduction"}
            extra={
                isEditing ? (
                    <>

                        <Button
                            type="link"
                            style={{ color: "#28b50dbd" }}
                            {...saveButtonProps}
                        ><SaveFilled /></Button>
                        <Button
                            type="link"
                            style={{ color: "red" }}
                            onClick={() => {
                                setEditing(false)
                            }}
                        ><CloseOutlined /></Button>
                    </>
                ) : (<Button
                    type="link"
                    onClick={() => {
                        setEditing(true)
                    }}
                ><EditFilled /></Button>)
            }
        >
            {isLoading && formLoading ? (
                <center><Spin /></center>
            ) : (
                <Form {...formProps}>
                    <Space
                        direction="vertical"
                        style={{
                            width: "100%",
                        }}
                    >
                        {formState ? (
                            <>
                                {isEditing ? (
                                    <FormList formState={formState} setFormState={setFormState} form={form} />
                                ) : (Object.values(formState).map(({ amount, ledger }: any, name: number) => <Row key={name}>
                                    <Col sm={20} xl={11}><Typography.Text>{ledger}</Typography.Text></Col>
                                    <Col sm={4} xl={1}>:</Col>
                                    <Col sm={24} xl={12}><strong>Rs. {amount}</strong></Col>
                                </Row>
                                )
                                )}
                                <hr />
                                <Row>
                                    <Col sm={20} xl={11}><Typography.Text>{t('annualDeduction.text.total')}</Typography.Text></Col>
                                    <Col sm={4} xl={1}>:</Col>
                                    <Col sm={24} xl={12}><b> Rs. {annualDeduction?.data && annualDeduction.data.reduce((total: number, a: any) => total + a.amount, 0)}</b></Col>
                                </Row>
                            </>
                        ) : (
                            <Empty />
                        )}
                    </Space>
                </Form>
            )}
        </Card>
    )
}