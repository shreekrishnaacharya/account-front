import React, { useState } from "react";

import { useDelete, useNavigation, useShow, useTranslate, useUpdate } from "@refinedev/core";

import {
    CloseOutlined,
} from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Drawer,
    Row,
    Space,
    Spin,
    Table,
    Typography,
} from "antd";

import { ISalaryPost, ISalaryVoucher } from "interfaces";
import { DrCr } from "common/all.enum";
const { Title } = Typography;
export const PayrollPostShow = () => {
    const t = useTranslate();
    const { list } = useNavigation();
    const { queryResult } = useShow<ISalaryPost>();


    const closeModal = () => {
        list("payroll-post");
    };

    const { data, isLoading, isError } = queryResult;

    if (isError) {
        closeModal();
        return null;
    }

    if (isLoading) {
        return (
            <Drawer
                open
                width={756}
                bodyStyle={{
                    background: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Spin />
            </Drawer>
        );
    }

    const {
        employee,
        plus,
        minus,
        plusTotal,
        minusTotal
    } = data?.data ?? {};

    const columns = [
        {
            sno: t("common.sno"),
            render: (value: any, record: any, index: number) => index + 1
        },
        {
            title: t('common.ledger').toUpperCase(),
            render: (value: any, record: ISalaryVoucher, index: number) => {
                return record.ledger.name
            }
        },
        {
            title: t('common.dr').toUpperCase(),
            render: (value: any, record: ISalaryVoucher, index: number) => {
                return record.dr_cr == DrCr.DR ? record.amount : ""
            }
        },
        {
            title: t('common.cr').toUpperCase(),
            render: (value: any, record: ISalaryVoucher, index: number) => {
                return record.dr_cr == DrCr.CR ? record.amount : ""
            }
        },
    ];
    return (
        <Drawer
            open
            onClose={() => closeModal()}
            width={756}
            title={employee.name}
        >
            <Space title="Plus" direction="vertical" style={{ width: "100%" }}>
                <Table
                    rowKey="id"
                    size="small"
                    columns={columns}
                    dataSource={plus}
                    pagination={false}
                    summary={(v) => {
                        return (
                            <Table.Summary.Row  key={'footer'}>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                <Table.Summary.Cell index={1}><Title level={5}>{t('common.total')}</Title></Table.Summary.Cell>
                                <Table.Summary.Cell index={2}><Title level={5}>{plusTotal}</Title></Table.Summary.Cell>
                                <Table.Summary.Cell index={3}><Title level={5}>{plusTotal}</Title></Table.Summary.Cell>
                            </Table.Summary.Row>
                        )
                    }}

                />
            </Space>
            <Space title="Minus" direction="vertical" style={{ width: "100%" }}>
                <Table
                    rowKey="id"
                    size="small"
                    columns={columns}
                    dataSource={minus}
                    pagination={false}
                    summary={(v) => {
                        return (
                            <Table.Summary.Row  key={'footer'}>
                                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                <Table.Summary.Cell index={1}><Title level={5}>{t('common.total')}</Title></Table.Summary.Cell>
                                <Table.Summary.Cell index={2}><Title level={5}>{minusTotal}</Title></Table.Summary.Cell>
                                <Table.Summary.Cell index={3}><Title level={5}>{minusTotal}</Title></Table.Summary.Cell>
                            </Table.Summary.Row>
                        )
                    }}

                />
            </Space>
        </Drawer>
    );
};