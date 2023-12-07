import {
    List,
    SaveButton,
    EditButton,
    TextField,
    useEditableTable,
    useModalForm,
    useSelect,
    getDefaultSortOrder,
    TagField,
    DeleteButton
} from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";
import { Table, Form, Space, Button, Input, Select, Modal, Spin, Row, Col } from "antd";
import { ILedger, IPayrollSetting } from "interfaces";
import PayrollSettingForm from "./_form";
import { useErrorParser } from "hooks";

export const PayrollList: React.FC = () => {

    const {
        tableProps,
        formProps,
        isEditing,
        saveButtonProps,
        cancelButtonProps,
        sorter,
        editButtonProps,
    } = useEditableTable<ILedger>({
        meta: { customQuery: { ledger: true } }
    });
    const t = useTranslate();
    const { selectProps: ledgerSelectProps } = useSelect({
        resource: "ledger",
        optionLabel: "name",
        optionValue: "id"
    });
    const {
        form,
        mutationResult,
        modalProps: createModalProps,
        formProps: createFormProps,
        show: createModalShow,
        formLoading: createFormLoading,
    } = useModalForm<ILedger>({
        action: "create",
        syncWithLocation: true,
    });
    const errors = useErrorParser(form, mutationResult);
    return (
        <>
            <List
                createButtonProps={{
                    onClick: () => {
                        createModalShow();
                    },
                }}
            >
                <Form {...formProps}>
                    <Table
                        {...tableProps}
                        rowKey="id"
                        size="small"
                    >
                        <Table.Column<IPayrollSetting>
                            dataIndex={["ledger", "name"]}
                            sorter={{ multiple: 2 }}
                            title={t("common.ledger")}
                            render={(value) => {
                                return <TextField value={value} />;
                            }}
                        />
                        <Table.Column<IPayrollSetting>
                            dataIndex="max_amount"
                            title={t("common.amount")}
                            render={(value, record) => {
                                if (isEditing(record.id)) {
                                    return (
                                        <Form.Item
                                            name="max_amount"
                                            style={{ margin: 0 }}
                                            initialValue={record.max_amount}
                                        >
                                            <Input />
                                        </Form.Item>
                                    );
                                }
                                return <TextField value={value} />;
                            }}
                        />
                        <Table.Column<ILedger>
                            title="Actions"
                            dataIndex="actions"
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
                                    <>
                                        <EditButton
                                            {...editButtonProps(record.id)}
                                            hideText
                                            size="small"
                                            style={{ margin: "0px 5px" }}
                                        />
                                        <DeleteButton
                                            recordItemId={record.id}
                                            hideText
                                            size="small"
                                        />
                                    </>
                                );
                            }}
                        />
                    </Table>
                </Form>
            </List>
            <Modal {...createModalProps}>
                <Spin spinning={createFormLoading}>
                    <Form {...createFormProps} layout="vertical">
                        <PayrollSettingForm />
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
        </>
    );
};