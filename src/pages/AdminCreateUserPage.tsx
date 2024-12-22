import { MainLayout } from "../layouts/MainLayout";
import AdminCreateUser from "../components/adminUsers/AdminCreateUser";

interface AdminCreateUserPage {
    title: string;
}

export const AdminCreateUserPage = (props: AdminCreateUserPage) => {
    document.title = props.title;

    return (
        <MainLayout>
            <AdminCreateUser />
        </MainLayout>
    );
};
