import { useOne, useTranslate } from "@refinedev/core";
import {
    Typography,
    Card,
    Space,
    Empty,
    Row,
    Col,
    Spin,
} from "antd";
import { useEffect } from "react";

export default ({ employeeId, dataUpdateTrack }: any) => {

    const { data: annualDeduction, refetch, isLoading } = useOne<any>({
        resource: `payroll/summary`,
        id: employeeId
    });
    const t = useTranslate();
    useEffect(() => {
        refetch()
    }, [dataUpdateTrack])

    return (
        <Card title={t("payroll.titles.taxSummary")}
        >
            {isLoading ? (
                <center><Spin /></center>
            ) : (
                <Space
                    direction="vertical"
                    style={{
                        width: "100%",
                    }}
                >
                    {annualDeduction?.data ? (
                        <>
                            <Row>
                                <Col sm={20} xl={11}><Typography.Text>{t("payroll.titles.totalSalary")}</Typography.Text></Col>
                                <Col sm={4} xl={1}>:</Col>
                                <Col sm={24} xl={12}><b> Rs. {annualDeduction?.data.salaryAmount}</b></Col>
                            </Row>
                            <Row>
                                <Col sm={20} xl={11}><Typography.Text>{t("payroll.titles.annualDeduction")}</Typography.Text></Col>
                                <Col sm={4} xl={1}>:</Col>
                                <Col sm={24} xl={12}><b> Rs. {annualDeduction?.data.annualDeduction}</b></Col>
                            </Row>
                            <Row>
                                <Col sm={20} xl={11}><Typography.Text>{t("payroll.titles.taxableSalary")}</Typography.Text></Col>
                                <Col sm={4} xl={1}>:</Col>
                                <Col sm={24} xl={12}><b> Rs. {annualDeduction?.data.taxable}</b></Col>
                            </Row>
                            <Row>
                                <Col sm={20} xl={11}><Typography.Text>{t("payroll.titles.taxAmount")}</Typography.Text></Col>
                                <Col sm={4} xl={1}>:</Col>
                                <Col sm={24} xl={12}><b> Rs. {annualDeduction?.data.taxAmount}</b></Col>
                            </Row>
                            <Row>
                                <Col sm={20} xl={11}><Typography.Text>{t("payroll.titles.totalDeduction")}</Typography.Text></Col>
                                <Col sm={4} xl={1}>:</Col>
                                <Col sm={24} xl={12}><b> Rs. {annualDeduction?.data.totalDeduction}</b> (i.e.{annualDeduction?.data.taxAmount}+{annualDeduction?.data.totalDeduction - annualDeduction?.data.taxAmount})</Col>
                            </Row>
                            <Row>
                                <Col sm={20} xl={11}><Typography.Text>{t("payroll.titles.grossSalary")}</Typography.Text></Col>
                                <Col sm={4} xl={1}>:</Col>
                                <Col sm={24} xl={12}><b> Rs. {annualDeduction?.data.grossSalary}</b></Col>
                            </Row>
                        </>
                    ) : (
                        <Empty />
                    )}
                </Space>
            )}

        </Card >
    )
}