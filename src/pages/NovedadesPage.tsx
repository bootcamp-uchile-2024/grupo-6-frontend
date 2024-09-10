import NovedadesHome from "../components/NovedadesHome";
import { MainLayout } from "../layouts/MainLayout";

interface NovedadesProps {
    title: string;
}

export const NovedadesPage = (props: NovedadesProps) => {
    document.title = props.title;

    return (
        <MainLayout>
            <NovedadesHome/>
        </MainLayout>      
    )
}