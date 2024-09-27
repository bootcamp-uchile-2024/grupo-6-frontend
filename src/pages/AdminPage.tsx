import { MainLayout } from "../layouts/MainLayout"
import Admin from "../components/Admin"

interface AdminPageProps {
    title: string;
}

export const AdminPage = (props : AdminPageProps) => {
    document.title = props.title;
    
    return (
        <MainLayout>
            <Admin/>
        </MainLayout>
    );
};