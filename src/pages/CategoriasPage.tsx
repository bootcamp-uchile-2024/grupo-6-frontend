import BusquedaLayout from "../layouts/BusquedaLayout";
import { MainLayout } from "../layouts/MainLayout";

interface CategoriasPageProps {
  title: string
}

export default function CategoriasPage(props: CategoriasPageProps) {
  document.title = props.title;

  return (
    <MainLayout>
      <BusquedaLayout />
    </MainLayout>
  );
};