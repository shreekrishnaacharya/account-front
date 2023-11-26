import {
    useTranslate,
    IResourceComponentsProps,
    useNavigation,
} from "@refinedev/core";
import { List, ShowButton, TagField, useTable, EditButton } from "@refinedev/antd";
import { Table, Avatar, Dropdown, Menu, Space, Typography } from "antd";
import { IEmployee } from "interfaces";
import { Status } from "common/options";
import { PropsWithChildren } from "react";


export const PayrollPostList: React.FC<PropsWithChildren> = ({ children }) => {
    const t = useTranslate();

    const { tableProps } = useTable<IEmployee>({
        resource: "employee",
        meta: { customQuery: { ledger: true, status: Status.ACTIVE } },
    });
    return (
        <>
            <List>
                <Table
                    {...tableProps}
                    rowKey="id"
                    size="small"
                    rowClassName={""}
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
                        dataIndex={["ledger", "name"]}
                        title={t("common.ledger")}
                    />
                    <Table.Column
                        dataIndex={"amount_plus"}
                        title={t("common.dr")}
                    />
                    <Table.Column
                        dataIndex={"amount_minus"}
                        title={t("common.cr")}
                    />
                    <Table.Column<IEmployee>
                        fixed="right"
                        title={t("table.actions")}
                        render={(_, record) => (
                            <>
                                <ShowButton hideText size="small" recordItemId={record.id} />
                            </>
                        )}
                    />
                </Table>
            </List>
            {children}
        </>
    );
};
