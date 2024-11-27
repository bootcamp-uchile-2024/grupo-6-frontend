import AdminBookListTableUx from "../components/adminbooks/AdminBookListTableUx";
import { MainLayout } from "../layouts/MainLayout";

interface AdminBookListPageProps {
    title: string
}

export const AdminBookListPage = (props: AdminBookListPageProps) => {
    document.title = props.title;
    return (
        <MainLayout>
            <AdminBookListTableUx/>
        </MainLayout>
    );
};
