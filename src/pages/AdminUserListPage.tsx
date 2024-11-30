import { MainLayout } from "../layouts/MainLayout";
import AdminUsersList from "../components/adminUsers/adminUsersList";

interface AdminUserListPageProps {
    title: string;
}

export const AdminUsersListPage = (props: AdminUserListPageProps) => {
    document.title = props.title;

    return (
        <MainLayout>
            <AdminUsersList />
        </MainLayout>
    );
};
