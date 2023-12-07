import {
    useTranslate,
    IResourceComponentsProps,
    useNavigation,
} from "@refinedev/core";
import { List, ShowButton, TagField, useTable, EditButton } from "@refinedev/antd";
import { Table, Avatar, Dropdown, Menu, Space, Typography } from "antd";
import { IEmployee } from "interfaces";
import { Status } from "common/options";


export const EmployeeList: React.FC<IResourceComponentsProps> = () => {
    const { show, edit } = useNavigation();
    const t = useTranslate();

    const { tableProps } = useTable<IEmployee>({
        meta: { customQuery: { ledger: true } },
    });
    return (
        <List>
            <Table
                {...tableProps}
                rowKey="id"
                size="small"
            >
                <Table.Column
                    key="name"
                    title={t("employee.fields.name")}
                    render={(record) => (
                        <Space>
                            <Avatar size={30} src={record.img} />
                            <Typography.Text style={{ wordBreak: "inherit" }}>
                                {record.name}
                            </Typography.Text>
                        </Space>
                    )}
                />
                <Table.Column
                    dataIndex="email"
                    title={t("employee.fields.email")}
                />
                <Table.Column
                    dataIndex={["ledger", "name"]}
                    title={t("common.ledger")}
                />
                <Table.Column
                    dataIndex="status"
                    title={t("employee.fields.status")}
                    render={(value) => {
                        return <TagField color={value === Status.INACTIVE ? "warning" : "success"} value={value} />;
                    }}
                />
                <Table.Column<IEmployee>
                    fixed="right"
                    title={t("table.actions")}
                    render={(_, record) => (
                        <>
                            <ShowButton  size="small" hideText recordItemId={record.id} />
                            <EditButton size="small" style={{ marginLeft: 5 }} hideText recordItemId={record.id}/>
                        </>
                    )}
                />
            </Table>
        </List>
    );
};
