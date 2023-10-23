import { AuthPage } from "@refinedev/antd";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: { email: "sksharma72000@gmail.com", password: "krishna" },
      }}
    />
  );
};
