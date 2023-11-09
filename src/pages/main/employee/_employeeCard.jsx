import { BankOutlined, EnvironmentOutlined, HeartOutlined, KeyOutlined, MailOutlined, ManOutlined, PhoneOutlined, WomanOutlined } from "@ant-design/icons"
import { Avatar, Card, Grid, Space, Typography } from "antd"
import { Gender } from "common/options"

const { useBreakpoint } = Grid;

export default ({ employee }) => {
    const { xl } = useBreakpoint();
    return (
        <Card bordered={false} style={{ height: "100%" }}>
            <Space
                direction="vertical"
                style={{ width: "100%", height: "100%" }}
            >
                <Space
                    direction="vertical"
                    style={{ textAlign: "center", width: "100%" }}
                >
                    <Avatar
                        size={120}
                        src={employee?.img}
                    ></Avatar>
                    <Typography.Title level={3}>
                        {employee?.name}
                    </Typography.Title>
                </Space>
                <Space
                    direction="vertical"
                    style={{
                        width: "100%",
                        textAlign: xl ? "unset" : "center",
                    }}
                >
                    <Typography.Text>
                        <MailOutlined />&nbsp;{employee?.email}
                    </Typography.Text>
                    <Typography.Text>
                        {employee?.gender === Gender.MALE && (
                            <ManOutlined />
                        )}
                        {employee?.gender === Gender.FEMALE && (
                            <WomanOutlined />
                        )}
                        {employee?.gender === Gender.OTHER && (
                            <KeyOutlined />
                        )}&nbsp;{employee?.gender}
                    </Typography.Text>
                    <Typography.Text>
                        <HeartOutlined />&nbsp;{employee?.married}
                    </Typography.Text>
                    <Typography.Text>
                        <EnvironmentOutlined />&nbsp;{employee?.type}
                    </Typography.Text>
                    <Typography.Text>
                        <PhoneOutlined />&nbsp;{employee?.phone1}
                    </Typography.Text>
                    <Typography.Text>
                        <PhoneOutlined />&nbsp;{employee?.phone2}
                    </Typography.Text>
                    <Typography.Text>
                        <EnvironmentOutlined />&nbsp;{employee?.address1}
                    </Typography.Text>
                    <Typography.Text>
                        <EnvironmentOutlined />&nbsp;{employee?.address2}
                    </Typography.Text>
                    <Typography.Text>
                        <BankOutlined />&nbsp;{employee?.bank_no}
                    </Typography.Text>
                </Space>
            </Space>
        </Card>
    )
}