import UserModifyAddress from "../components/authFlow/UserModifyAddress";
import { MainLayout } from "../layouts/MainLayout"

interface UserModifyDirectionPageProps {
    title: string;
}

export const UserModifyAddressPage = (props: UserModifyDirectionPageProps) => {
    document.title = props.title;

    return (
        <MainLayout>
            <UserModifyAddress/>
        </MainLayout>
    )
}