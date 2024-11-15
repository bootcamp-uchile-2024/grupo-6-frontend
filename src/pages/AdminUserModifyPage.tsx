import { MainLayout } from "../layouts/MainLayout"
import AdminUserModify from "../components/adminbooks/AdminUserModify"

interface AdminUserModifyPageProps {
    title: string
}

const AdminUserModifyPage = (props: AdminUserModifyPageProps) => {
    document.title = props.title;
    return (
        <MainLayout>
            <AdminUserModify></AdminUserModify>
        </MainLayout>
    )

}

export default AdminUserModifyPage;