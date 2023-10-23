import {
    List,
    SaveButton,
    EditButton,
    TextField,
    useEditableTable,
    useSelect,
    getDefaultSortOrder,
    TagField
} from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";
import { Table, Form, Space, Button, Input } from "antd";
import { IFiscalYear } from "interfaces";
import { Status, YesNo } from "common/options";

export const FiscalYear: React.FC = () => {

    const {
        tableProps,
        formProps,
        isEditing,
        saveButtonProps,
        cancelButtonProps,
        sorter,
        editButtonProps,
    } = useEditableTable<IFiscalYear>();
    const t = useTranslate();
    const { selectProps: bsHeadSelectProps } = useSelect({
        resource: "ledger-group",
        optionLabel: "name",
        optionValue: "id"
    });
    return (
        <>
            <List>
                <Form {...formProps}>
                    <Table
                        {...tableProps}
                        rowKey="id"
                    >
                        <Table.Column<IFiscalYear>
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
                        <Table.Column<IFiscalYear>
                            dataIndex="opening_np"
                            title={t("common.fromDateNp")}
                            render={(value, record) => {
                                if (isEditing(record.id)) {
                                    return (
                                        <Form.Item
                                            name="opening_np"
                                            style={{ margin: 0 }}
                                        >
                                            <Input value={value} />
                                        </Form.Item>
                                    );
                                }
                                return <TextField value={value} />;
                            }}
                        />
                        <Table.Column<IFiscalYear>
                            dataIndex="closing_np"
                            title={t("common.toDateNp")}
                            render={(value, record) => {
                                if (isEditing(record.id)) {
                                    return (
                                        <Form.Item
                                            name="opening_np"
                                            style={{ margin: 0 }}
                                        >
                                            <Input value={value} />
                                        </Form.Item>
                                    );
                                }
                                return <TextField value={value} />;
                            }}
                        />
                        <Table.Column<IFiscalYear>
                            dataIndex="opening_en"
                            title={t("common.fromDateEn")}
                            render={(value, record) => {
                                if (isEditing(record.id)) {
                                    return (
                                        <Form.Item
                                            name="opening_en"
                                            style={{ margin: 0 }}
                                        >
                                            <Input value={value} />
                                        </Form.Item>
                                    );
                                }
                                return <TextField value={value} />;
                            }}
                        />
                        <Table.Column<IFiscalYear>
                            dataIndex="closing_en"
                            title={t("common.toDateEn")}
                            render={(value, record) => {
                                if (isEditing(record.id)) {
                                    return (
                                        <Form.Item
                                            name="closing_en"
                                            style={{ margin: 0 }}
                                        >
                                            <Input value={value} />
                                        </Form.Item>
                                    );
                                }
                                return <TextField value={value} />;
                            }}
                        />
                        <Table.Column<IFiscalYear>
                            dataIndex="bill_no"
                            title={t("fiscalYear.fields.billNo")}
                            render={(value, record) => {
                                if (isEditing(record.id)) {
                                    return (
                                        <Form.Item
                                            name="bill_no"
                                            style={{ margin: 0 }}
                                        >
                                            <Input value={value} />
                                        </Form.Item>
                                    );
                                }
                                return <TextField value={value} />;
                            }}
                        />
                        <Table.Column<IFiscalYear>
                            dataIndex="is_closed"
                            title={t("fiscalYear.fields.isClosed")}
                            render={(value) => {
                                return <TagField color={value === YesNo.NO ? "warning" : "success"} value={value} />;
                            }}
                        />
                        <Table.Column<IFiscalYear>
                            dataIndex="is_active"
                            title={t("common.status")}
                            render={(value) => {
                                return <TagField color={value === Status.INACTIVE ? "warning" : "success"} value={value} />;
                            }}
                        />
                        <Table.Column<IFiscalYear>
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
        </>
    );
};