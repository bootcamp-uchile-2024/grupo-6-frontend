import { MainLayout } from "../layouts/MainLayout";
import User from "../components/user"

interface UserPageProps {
    title: string;
}

export const UserPage = (props : UserPageProps) => {
    document.title = props.title;
    
    return (
        <MainLayout>
            <User/>
        </MainLayout>
    );
};