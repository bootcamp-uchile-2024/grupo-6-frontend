import Main from "../components/Main";
import NovedadesHome from "../components/NovedadesHome";
import { MainLayout } from "../layouts/MainLayout";

interface HomePageProps {
  title: string
}

export default function HomePage(props: HomePageProps) {
  document.title = props.title
  return (
    <MainLayout>
        <Main/>
        <NovedadesHome/>
    </MainLayout>  
  )
}