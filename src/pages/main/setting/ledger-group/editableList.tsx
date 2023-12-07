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
import { Table, Form, Space, Button, Input, Select, Modal, Spin, Row, Col } from "antd";
import { ILedgerGroup } from "interfaces";
import LedgerGroupForm from "./_form";
import { IsFixed } from "common/options";
import { useErrorParser } from "hooks";

export const LedgerGroupList: React.FC = () => {

    const {
        tableProps,
        formProps,
        isEditing,
        saveButtonProps,
        cancelButtonProps,
        sorter,
        editButtonProps,
    } = useEditableTable<ILedgerGroup>();
    const t = useTranslate();
    const { selectProps: bsHeadSelectProps } = useSelect({
        resource: "ledger-group/bshead",
        optionLabel: "label",
        optionValue: "value"
    });
    const {
        form,
        mutationResult,
        modalProps: createModalProps,
        formProps: createFormProps,
        show: createModalShow,
        formLoading: createFormLoading,
    } = useModalForm<ILedgerGroup>({
        action: "create",
        syncWithLocation: true,
    });
    const errors = useErrorParser(form, mutationResult);
    // console.log(bsHeadSelectProps)
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
                        {/* <Table.Column dataIndex="id" title="ID" /> */}
                        <Table.Column<ILedgerGroup>
                            dataIndex="name"
                            title={t("ledger_group.fields.name")}
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
                        <Table.Column<ILedgerGroup>
                            dataIndex="bs_head"
                            title={t("ledger_group.fields.bsHead")}
                            sorter={{ multiple: 2 }}
                            render={(value, record) => {
                                if (isEditing(record.id)) {
                                    return (
                                        <Form.Item
                                            name="bs_head"
                                            style={{ margin: 0 }}

                                        >
                                            <Select
                                                {...bsHeadSelectProps}
                                                value={{ value: record.bs_head, label: record.bs_head }}
                                            />
                                        </Form.Item>
                                    );
                                }
                                return <TextField value={value} />;
                            }}
                        />
                        <Table.Column<ILedgerGroup>
                            dataIndex="bs_type"
                            title={t("common.bsType")}
                            render={(value) => {
                                return <TextField value={value} />;
                            }}
                        />
                        <Table.Column<ILedgerGroup>
                            dataIndex="account_side"
                            title={t("ledger_group.fields.accountSide")}
                            render={(value) => {
                                return <TextField value={value.toUpperCase()} />;
                            }}
                        />

                        <Table.Column<ILedgerGroup>
                            dataIndex="is_fixed"
                            title={t("ledger_group.fields.isFixed")}
                            render={(value) => {
                                return <TagField color={value === IsFixed.FIXED ? "warning" : "success"} value={value} />;
                            }}
                        />
                        <Table.Column<ILedgerGroup>
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
                        <LedgerGroupForm />
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