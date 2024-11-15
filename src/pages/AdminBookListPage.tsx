import AdminBookList from "../components/adminbooks/AdminBookList";
import { MainLayout } from "../layouts/MainLayout";

interface AdminBookListPageProps {
    title: string
}

export const AdminBookListPage = (props: AdminBookListPageProps) => {
    document.title = props.title;
    return (
        <MainLayout>
            <AdminBookList/>
        </MainLayout>
    );
};
