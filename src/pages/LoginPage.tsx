import { MainLayout } from "../layouts/MainLayout"
import Login from "../components/authFlow/Login"

interface LoginPageProps {
    title: string
}

export const LoginPage = (props: LoginPageProps) => {
    document.title = props.title;

    return (
        <MainLayout>
            <Login/>
        </MainLayout>
    );
};