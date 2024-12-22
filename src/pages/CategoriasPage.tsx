import Categorias from "../components/Categorias";
import { MainLayout } from "../layouts/MainLayout";

interface CategoriasPageProps {
  title: string
}

export default function CategoriasPage(props: CategoriasPageProps) {
  document.title = props.title;

  return (
    <MainLayout>
      <Categorias />
    </MainLayout>
  );
};