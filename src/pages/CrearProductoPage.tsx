import { MainLayout } from "../layouts/MainLayout"
import CrearProducto from "../components/adminbooks/CrearProducto"

interface CrearProductoPageProps {
    title: string
}

export const CrearProductoPage = (props: CrearProductoPageProps) => {
    document.title = props.title;

    return (
        <MainLayout>
            <CrearProducto/>
        </MainLayout>
    );
};