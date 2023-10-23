import {
    List,
    SaveButton,
    EditButton,
    TextField,
    useEditableTable,
    useModalForm,
    useSelect,
    getDefaultSortOrder,
    TagField
} from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";
import { Table, Form, Space, Button, Input, Select, Modal, Spin } from "antd";
import { ILedger } from "interfaces";
import LedgerForm from "./_form";
import { IsFixed } from "common/options";

export const LedgerList: React.FC = () => {

    const {
        tableProps,
        formProps,
        isEditing,
        saveButtonProps,
        cancelButtonProps,
        sorter,
        editButtonProps,
    } = useEditableTable<ILedger>({
        meta: { customQuery: { ledgerGroup: true } },
        // onSearch: (values) => {
        //     return [
        //         {
        //             field: "ledgerGroup",
        //             operator: "contains",
        //             value: "true",
        //         },
        //     ];
        // },
    });
    const t = useTranslate();
    const { selectProps: bsHeadSelectProps } = useSelect({
        resource: "ledger-group",
        optionLabel: "name",
        optionValue: "id"
    });
    const {
        modalProps: createModalProps,
        formProps: createFormProps,
        show: createModalShow,
        formLoading: createFormLoading,
    } = useModalForm<ILedger>({
        action: "create",
        syncWithLocation: true,
    });
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
                    >
                        <Table.Column<ILedger>
                            dataIndex="name"
                            title={t("common.name")}
                            sorter={{ multiple: 2 }}
                            defaultSortOrder={getDefaultSortOrder("name", sorter)}
                            render={(value, record) => {
                                if (isEditing(record.id)) {
                                    return (
                                        <Form.Item
                                            name="name"
                                            style={{ margin: 0 }}
                                        >
                                            <Input value={value} />
                                        </Form.Item>
                                    );
                                }
                                return <TextField value={value} />;
                            }}
                        />
                        <Table.Column<ILedger>
                            dataIndex="code"
                            title={t("common.code")}
                            sorter={{ multiple: 2 }}
                            render={(value, record) => {
                                if (isEditing(record.id)) {
                                    return (
                                        <Form.Item
                                            name="code"
                                            style={{ margin: 0 }}
                                        >
                                            <Input value={value} />
                                        </Form.Item>
                                    );
                                }
                                return <TextField value={value} />;
                            }}
                        />
                        <Table.Column<ILedger>
                            dataIndex={["ledgerGroup", "name"]}
                            sorter={{ multiple: 2 }}
                            title={t("common.group")}
                            render={(value, record) => {
                                if (isEditing(record.id)) {
                                    return (
                                        <Form.Item
                                            name="ledger_group_id"
                                            style={{ margin: 0 }}

                                        >
                                            <Select
                                                {...bsHeadSelectProps}
                                                value={{ value: record.ledger_group_id, label: record.ledgerGroup.name }}
                                            />
                                        </Form.Item>
                                    );
                                }
                                return <TextField value={value} />;
                            }}
                        />
                        <Table.Column<ILedger>
                            dataIndex={["ledgerGroup", "bs_type"]}
                            title={t("common.bsType")}
                            render={(value) => {
                                return <TextField value={value} />;
                            }}
                        />
                        <Table.Column<ILedger>
                            dataIndex="is_fixed"
                            title={t("common.isFixed")}
                            render={(value) => {
                                return <TagField color={value === IsFixed.FIXED ? "warning" : "success"} value={value} />;
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
                                if (record.is_fixed === IsFixed.FIXED) {
                                    return <></>
                                }
                                return (
                                    <EditButton
                                        {...editButtonProps(record.id)}
                                        hideText
                                        size="small"
                                    />
                                );
                            }}
                        />
                    </Table>
                </Form>
            </List>
            <Modal {...createModalProps}>
                <Spin spinning={createFormLoading}>
                    <Form {...createFormProps} layout="vertical">
                        <LedgerForm />
                    </Form>
                </Spin>
            </Modal>
        </>
    );
};