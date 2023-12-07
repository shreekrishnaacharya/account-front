import {
    useTranslate,
    IResourceComponentsProps,
    useShow,
} from "@refinedev/core";
import { DeleteButton, EditButton, List, SaveButton, Show, TextField, useEditableTable, useModalForm, useSelect } from "@refinedev/antd";
import {
    PlusCircleFilled,
} from "@ant-design/icons";
import {
    Table,
    Row,
    Col,
    Modal,
    Spin,
    Form,
    Select,
    Space,
    Button,
    Input,
} from "antd";
import { IEmployee, IPayroll } from "interfaces";
import { PayrollType } from "common/options";
import { useErrorParser } from "hooks";
import PayrollForm from "./_payroll"
import EmployeeCard from "./_employeeCard"
import AnnualDeduction from "./_annualDeduction"
import Summary from "./_summary"
import { useState } from "react";


export const EmployeeShow: React.FC<IResourceComponentsProps> = () => {
    const [dataUpdateTrack, setDataTrack] = useState(false)
    const { queryResult: employeeQueryResult } = useShow<IEmployee>();
    const employee = employeeQueryResult.data?.data;
    const payrollResource = "payroll/" + employee?.id
    const setUpdate = () => {
        setDataTrack(p => {
            return !p
        })
    }
    const { tableProps,
        isEditing,
        formProps: editableFormProps,
        editButtonProps,
        saveButtonProps,
        cancelButtonProps, } = useEditableTable<IPayroll>({
            resource: payrollResource,
            syncWithLocation: false,
            pagination: { pageSize: 100 },
            meta: { customQuery: { ledger: true } },
            onMutationSuccess: () => {
                setUpdate()
            }
        });
    const {
        form,
        mutationResult,
        modalProps: createModalProps,
        formProps: createFormProps,
        show: createModalShow,
        formLoading: createFormLoading,
    } = useModalForm<IPayroll>({
        action: "create",
        resource: payrollResource,
        syncWithLocation: true,
        onMutationSuccess: () => {
            setUpdate()
        }
    });

    const { selectProps: ledgerSelectProps } = useSelect({
        resource: "ledger",
        optionLabel: "name",
        optionValue: "id",
    });

    const t = useTranslate();
    const errors = useErrorParser(form, mutationResult);

    return (
        <Show contentProps={{ style: { background: "transparent", boxShadow: "none" } }}>
            <Row gutter={[16, 16]}>
                <Col sm={24} xl={18} lg={18} xs={24}>
                    <Row>
                        <Col xs={24}>
                            <List
                                resource={payrollResource}
                                breadcrumb={false}
                                title={"Payroll"}
                                createButtonProps={{
                                    hideText: true,
                                    color: "#EE2A1E",
                                    icon: <PlusCircleFilled />,
                                    onClick: () => {
                                        createModalShow();
                                    },
                                }}
                            >
                                <Form {...editableFormProps}>
                                    <Table
                                        {...tableProps}
                                        rowKey="id"
                                        size={"small"}
                                    >
                                        <Table.Column<IPayroll>
                                            dataIndex={["ledger", "name"]}
                                            title={t("common.ledger")}
                                            render={(value) => {
                                                return <TextField value={value} />;
                                            }}
                                        />
                                        <Table.Column<IPayroll>
                                            dataIndex={"type"}
                                            width={"15%"}
                                            title={t("common.type")}
                                            render={(value) => {
                                                return <TextField value={value} />;
                                            }}

                                        />
                                        <Table.Column<IPayroll>
                                            dataIndex={"amount"}
                                            width={"25%"}
                                            title={t("common.amount")}
                                            render={(value, record) => {
                                                if (isEditing(record.id)) {
                                                    return (
                                                        <Form.Item
                                                            name="amount"
                                                            style={{ margin: 0 }}
                                                            initialValue={record.amount}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    );
                                                }
                                                return <TextField value={value} />;
                                            }}
                                        />
                                        <Table.Column<IPayroll>
                                            fixed="right"
                                            width={"15%"}
                                            title={t("table.actions")}
                                            render={(_, record) => {
                                                if (isEditing(record.id)) {
                                                    return (
                                                        <Space>
                                                            <SaveButton
                                                                {...saveButtonProps}
                                                                hideText
                                                                size="small"
                                                            />
                                                            <Button
                                                                {...cancelButtonProps}
                                                                size="small"
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </Space>
                                                    );
                                                }
                                                return (
                                                    <Space>
                                                        <EditButton
                                                            {...editButtonProps(record.id)}
                                                            hideText
                                                            size="small"
                                                        />
                                                        <DeleteButton onSuccess={() => setUpdate()} size="small" resource={payrollResource} style={{ marginLeft: 5 }} hideText recordItemId={record.id} />
                                                    </Space>
                                                )
                                            }}
                                        />
                                    </Table>
                                </Form>
                            </List>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={11}>
                            <AnnualDeduction employeeId={employee?.id} setUpdate={setUpdate} />
                        </Col>
                        <Col xs={11} push={2}>
                            <Summary employeeId={employee?.id} dataUpdateTrack={dataUpdateTrack} />
                        </Col>
                    </Row>
                </Col>
                <Col sm={24} xl={6} lg={6} xs={24}>
                    <EmployeeCard employee={employee} />
                </Col>
            </Row>

            <Modal {...createModalProps} title={t("payroll.titles.create")}>
                <Spin spinning={createFormLoading}>
                    <Form {...createFormProps} layout="vertical">
                        <PayrollForm />
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
                    </Form>
                </Spin>
            </Modal>
        </Show>
    );
};
