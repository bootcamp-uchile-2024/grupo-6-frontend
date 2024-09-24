import MainContent from "../components/MainContent";
import NovedadesHome from "../components/NovedadesHome";
import { MainLayout } from "../layouts/MainLayout";

interface HomePageProps {
  title: string
}

export default function HomePage(props: HomePageProps) {
  document.title = props.title;
  return (
    <MainLayout>
        <MainContent/>
        <NovedadesHome/>
    </MainLayout>  
  )
}