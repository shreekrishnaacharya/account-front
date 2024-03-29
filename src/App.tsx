import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider } from "_service/dataProvider";
import { App as AntdApp } from "antd";

import { ForgotPassword } from "pages/site/forgotPassword";
import { Login } from "pages/site/login";
import { Register } from "pages/site/register";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { LedgerGroupList } from "pages/main/setting/ledger-group";
import { LedgerList } from "pages/main/setting/ledger";
import { axiosInstance } from "_service/axious";
import { BASE_URL } from "common/options";
import { ArrowLeftOutlined, AuditOutlined, CalendarOutlined, DollarOutlined, ExportOutlined, FileTextOutlined, ImportOutlined, RetweetOutlined, SettingOutlined, SolutionOutlined, SwapOutlined, UnorderedListOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { JournalEntry } from "pages/main/voucher";
import { FiscalYear } from "pages/main/setting/fiscalyear";
import { EmployeeCreate, EmployeeList, EmployeeShow } from "pages/main/payroll/employee";
import { PayrollList } from "pages/main/setting/payroll-setting";
import { EmployeeEdit } from "pages/main/payroll/employee/edit";
import { PayrollPostList } from "pages/main/payroll/post/list";
import { PayrollPostShow } from "pages/main/payroll/post/show";


function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <Refine
              dataProvider={dataProvider(BASE_URL, axiosInstance)}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              i18nProvider={i18nProvider}
              resources={[
                {
                  name: "payroll",
                  meta: {
                    label: t('payroll.title'),
                    icon: <DollarOutlined />,
                  },
                },
                {
                  name: "employee",
                  list: "/employee",
                  create: "/employee/create",
                  edit: "/employee/edit/:id",
                  show: "/employee/show/:id",
                  meta: {
                    label: t("employee.title"),
                    icon: <UsergroupAddOutlined />,
                    parent: "payroll"
                  },
                },
                {
                  name: "payroll-post",
                  list: "/payroll-post",
                  show: "/payroll-post/show/:id",
                  create: "/payroll-post/create",
                  meta: {
                    label: t("payrollPost.title"),
                    icon: <SolutionOutlined />,
                    parent: "payroll"
                  },
                },
                {
                  name: "voucher",
                  meta: {
                    label: t("voucher.title"),
                    icon: <AuditOutlined />
                  },
                },
                {
                  name: "voucher/purchase",
                  list: "voucher/purchase",
                  meta: {
                    label: t("voucher.purchase"),
                    icon: <ImportOutlined />,
                    parent: "vouchers",
                  },
                },
                {
                  name: "voucher/sales",
                  list: "voucher/sales",
                  meta: {
                    label: t("voucher.sales"),
                    icon: <ExportOutlined />,
                    parent: "vouchers",
                  },
                },
                {
                  name: "voucher/payment",
                  list: "voucher/payment",
                  meta: {
                    label: t("voucher.payment"),
                    icon: <ArrowLeftOutlined />,
                    parent: "vouchers",
                  },
                },
                {
                  name: "voucher/contra",
                  list: "voucher/contra",
                  meta: {
                    label: t("voucher.contra"),
                    icon: <RetweetOutlined />,
                    parent: "vouchers",
                  },
                },
                {
                  name: "voucher/journal",
                  list: "voucher/journal",
                  meta: {
                    label: t('voucher.journal'),
                    icon: <SwapOutlined />,
                    parent: "vouchers",
                  },
                },
                {
                  name: "settings",
                  meta: {
                    label: "Settings",
                    icon: <SettingOutlined />
                  },
                },
                {
                  name: "ledger-group",
                  list: "/ledger-group",
                  create: "/ledger-group",
                  edit: "/ledger-group/:id",
                  meta: {
                    label: "Group",
                    icon: <FileTextOutlined />,
                    canDelete: false,
                    parent: "settings",
                  },
                },
                {
                  name: "ledger",
                  list: "/ledger",
                  create: "/ledger",
                  edit: "/ledger/:id",
                  show: "/ledger/:id",
                  meta: {
                    label: "Ledger",
                    icon: <UnorderedListOutlined />,
                    canDelete: false,
                    parent: "settings",
                  },
                },
                {
                  name: "payroll-setting",
                  list: "/payroll-setting",
                  edit: "/payroll-setting/:id",
                  create: "/payroll-setting",
                  meta: {
                    label: t('payrollSetting.title'),
                    icon: <DollarOutlined />,
                    canDelete: false,
                    parent: "settings",
                  },
                },
                {
                  name: "fiscal-year",
                  list: "/fiscal-year",
                  edit: "/fiscal-year/:id",
                  meta: {
                    label: t('fiscalYear.title'),
                    icon: <CalendarOutlined />,
                    canDelete: false,
                    parent: "settings",
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <ThemedLayoutV2
                        Header={() => <Header isSticky={true} />}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route path="employee">
                    <Route index element={<EmployeeList />} />
                    <Route
                      path="create"
                      element={<EmployeeCreate />}
                    />
                    <Route
                      path="show/:id"
                      element={<EmployeeShow />}
                    />
                    <Route
                      path="edit/:id"
                      element={<EmployeeEdit />}
                    />
                  </Route>
                  <Route path="payroll-post"
                  element={
                    <PayrollPostList>
                        <Outlet />
                    </PayrollPostList>
                }
                  >
                    <Route index element={null} />
                    <Route
                      path="show/:id"
                      element={<PayrollPostShow />}
                    />
                  </Route>
                  <Route path="voucher">
                    <Route path="journal" index element={<JournalEntry />} />
                    <Route path="payment" index element={<JournalEntry multiCr={false} multiDr={false} />} />
                    <Route path="purchase" index element={<JournalEntry multiCr={false} multiDr={true} />} />
                    <Route path="contra" index element={<JournalEntry multiCr={false} multiDr={false} />} />
                  </Route>
                  <Route path="/ledger-group">
                    <Route index element={<LedgerGroupList />} />
                  </Route>
                  <Route path="/ledger">
                    <Route index element={<LedgerList />} />
                  </Route>
                  <Route path="/payroll-setting">
                    <Route index element={<PayrollList />} />
                  </Route>
                  <Route path="/fiscal-year">
                    <Route index element={<FiscalYear />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-outer"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                  />
                </Route>
              </Routes>
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
