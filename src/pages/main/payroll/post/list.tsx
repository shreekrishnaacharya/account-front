import {
    useTranslate,
    IResourceComponentsProps,
    useNavigation,
    useCreate,
    useNotification,
} from "@refinedev/core";
import { List, ShowButton, TagField, useTable, EditButton, RefreshButton } from "@refinedev/antd";
import { Table, Avatar, Dropdown, Menu, Space, Typography, Modal, Select, Tag, Button, Input } from "antd";
import { IEmployee } from "interfaces";
import { Status } from "common/options";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { TableRowSelection } from "antd/es/table/interface";
import { ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import { MonthList } from "common/all.enum";
import nepalidate1 from "common/nepalidate1";
import { useNepaliDateConverter } from "hooks";
import { Link } from "react-router-dom";
enum SelectionType {
    ALL = "all",
    OTHER = "other"
}
export const PayrollPostList: React.FC<PropsWithChildren> = ({ children }) => {
    const t = useTranslate();
    const { nepaliDate, englishDate, handleNepaliDateChange, handleEnglishDateChange } = useNepaliDateConverter({ type: "en" });
    const currenMonth = useMemo(() => {
        const nepali = new nepalidate1(new Date());
        return Object.values(MonthList)[nepali.getMonth()];
    }, []);
    const [currentMonth, setMonth] = useState<MonthList>(currenMonth);
    const [selectedType, setSelectedType] = useState<any>(SelectionType.ALL);
    const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
    const { tableProps, tableQueryResult } = useTable<IEmployee>({
        meta: { customQuery: { ledger: true, status: Status.ACTIVE } },
        filters: {
            permanent: [
                {
                    field: "month",
                    operator: "eq",
                    value: currentMonth,
                },
            ]
        }
    });

    const tableData = tableQueryResult.data
    useEffect(() => {
        if (selectedType == SelectionType.ALL) {
            if (tableQueryResult.data != undefined) {
                const emid = tableQueryResult.data.data.map(e => e.id)
                setSelectedRowKeys(emid);
            }
        }
    }, [tableQueryResult.data, selectedType]);

    const rowSelection: TableRowSelection<IEmployee> = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedType(SelectionType.OTHER);
        },
        selections: [
            {
                key: 'all_current',
                text: 'All Current Page',
                onSelect: (changeableRowKeys) => {
                    setSelectedRowKeys(changeableRowKeys);
                    setSelectedType(SelectionType.OTHER);
                },
            },
            {
                key: 'all',
                text: 'All ' + tableData?.total,
                onSelect: (changeableRowKeys) => {
                    setSelectedType(SelectionType.ALL);
                    setSelectedRowKeys(changeableRowKeys);
                },
            }
        ]
    };

    const { mutate } = useCreate();
    const onConfirm = () => {
        mutate({
            resource: "payroll-post",
            values: {
                all: selectedType,
                employees: selectedRowKeys,
                month: currentMonth,
                transaction_date_en: englishDate,
                transaction_date_np: nepaliDate
            },
        });
    }
    const [modal, contextHolder] = Modal.useModal();

    const confirm = () => {
        modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to post salary to ' + (selectedType == SelectionType.ALL ? "all" : selectedRowKeys.length) + " selected employee(s)?",
            okText: 'Yes',
            cancelText: 'Cancel',
            onOk: onConfirm
        });
    };


    return (
        <>
            <List
                canCreate={false}
                headerButtons={({ defaultButtons }) => (
                    <>
                        <RefreshButton />
                        <>
                            <Input type={"date"} value={englishDate} onChange={(e) => handleEnglishDateChange(e.target.value)} />
                            <Input type="hidden" value={nepaliDate} onChange={(e) => handleNepaliDateChange(e.target.value)} /></>
                        <Select onChange={(e) => { setMonth(e) }} value={currentMonth} options={Object.values(MonthList).map(e => { return { label: e, value: e } })} />
                        <Button type="primary" style={{ color: "white" }} onClick={confirm}>{t("common.post")}</Button>
                    </>
                )}
            >
                <Table
                    {...tableProps}
                    rowKey="id"
                    size="small"
                    rowClassName={""}
                    rowSelection={rowSelection}
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
                    <Table.Column
                        dataIndex={"plus"}
                        title={t("common.post") + " " + t("common.dr")}
                        render={(value) => {
                            if (value.length) {
                                return value.map((e: string) => <TagField color={"success"} value={e} />);
                            }
                            return "";
                        }}
                    />
                    <Table.Column
                        dataIndex={"minus"}
                        title={t("common.post") + " " + t("common.cr")}
                        render={(value) => {
                            if (value.length) {
                                return value.map((e: string) => <TagField color={"warning"} value={e} />);
                            }
                            return "";
                        }}
                    />
                    <Table.Column<IEmployee>
                        fixed="right"
                        title={t("table.actions")}
                        render={(_, record) => (
                            <>
                                <ShowButton hideText size="small" recordItemId={record.id} />
                                <Link to={`/employee/show/${record.id}`}><Button icon={<UserOutlined />} style={{ marginLeft: 5 }} size="small" /></Link>
                            </>
                        )}
                    />
                </Table>
            </List>
            {contextHolder}
            {children}
        </>
    );
};
