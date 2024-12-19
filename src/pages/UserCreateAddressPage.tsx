import UserCreateAddress from "../components/authFlow/UserCreateAddress";
import { MainLayout } from "../layouts/MainLayout"

interface UserCreateAddressPageProps {
    title: string;
}

export const UserCreateAddressPage = (props: UserCreateAddressPageProps) => {
    document.title = props.title;

    return (
        <MainLayout>
            <UserCreateAddress />
        </MainLayout>
    )
}