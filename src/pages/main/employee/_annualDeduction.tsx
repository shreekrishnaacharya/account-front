import { DeleteOutlined, PlusCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Show, useSelect } from "@refinedev/antd";
import { useShow, useTranslate } from "@refinedev/core";
import {
    Form,
    Row,
    Col,
    Select,
    Typography,
    Input,
    Button,
    Card,
    Space,
    List
} from "antd";

export default ({ employeeId }: any) => {
    const { queryResult } = useShow({ resource: "annual-deduction/"+employeeId });
    const { data, isLoading } = queryResult;
    console.log(data);
    return (
        <Show
            resource={payrollResource}
            goBack={false}
            breadcrumb={false}
            title={"Annual Deduction"}
        // createButtonProps={{
        //     hideText: true,
        //     color: "#EE2A1E",
        //     icon: <PlusCircleFilled />,
        //     // onClick: () => {
        //     //     createModalShow();
        //     // },
        // }}
        >



            {/* <Space
                direction="vertical"
                style={{ width: "100%", height: "100%" }}>
                {annualDudction.map((e: any) => {
                    <Typography.Text>{e.ledger.name}: {e.amount}</Typography.Text>
                })}
                <hr />
                <Typography.Text><b>Total : </b> {annualDudction.reduce((total: number, a: any) => total + a.amount, 0)}</Typography.Text>
            </Space> */}
        </Show>
    )
}