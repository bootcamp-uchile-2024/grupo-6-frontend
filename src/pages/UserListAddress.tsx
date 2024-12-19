import UserListAddress from "../components/authFlow/UserListAddress";
import { MainLayout } from "../layouts/MainLayout"

interface UserListAddressPageProps {
    title: string;
}

export const UserListAddressPage = (props: UserListAddressPageProps) => {
    document.title = props.title;

    return (
        <MainLayout>
            <UserListAddress/>
        </MainLayout>
    )
}