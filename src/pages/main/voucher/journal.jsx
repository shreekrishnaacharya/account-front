import { useTranslate } from "@refinedev/core";

import {
    Card, Form,
} from "antd";

import VoucherForm from "./_form2";
import { Create, useForm } from "@refinedev/antd";


export const JournalEntry = () => {
    const t = useTranslate();
    const {
        formProps,
        saveButtonProps,
        queryResult
    } = useForm({
        action: "create",
        syncWithLocation: true,
    });

    // const {
    //     modalProps: createModalProps,
    //     formProps: createFormProps,
    //     show: createModalShow,
    //     formLoading: createFormLoading,
    // } = useModalForm < ILedger > ({
    //     action: "create",
    //     syncWithLocation: true,
    // });
    return (
        <Card
            style={{
                margin: "8px",
            }}
            bodyStyle={{ minHeight: "500px" }}
        >
            <Create
                isLoading={queryResult?.isFetching}
                saveButtonProps={saveButtonProps}
            >
                <Form {...formProps}>
                    <VoucherForm />
                </Form>
            </Create>
        </Card>
    );
};
