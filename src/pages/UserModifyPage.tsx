import { MainLayout } from "../layouts/MainLayout"
import UserModify  from "../components/UserModify"

interface UserModifyPageProps {
    title: string
}

const UserModifyPage = (props:  UserModifyPageProps) => {
    document.title = props.title;
    return (
        <MainLayout>
            <UserModify/>
        </MainLayout>
    )

}

export default UserModifyPage;