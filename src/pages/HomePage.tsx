import CajaMain from "../components/CajaMain";
import LibrosHome from "../components/LibrosHome";
import { MainLayout } from "../layouts/MainLayout";

export default function HomePage() {
  return (
    <MainLayout>
        <CajaMain/>
        <LibrosHome/>
    </MainLayout>  
)
}

