import { MainLayout } from "../layouts/MainLayout"
import CrearCuenta from "../components/CrearCuenta"

interface CrearCuentaPageProps {
    title: string
}

export const CrearCuentaPage = (props: CrearCuentaPageProps) => {
    document.title = props.title;

    return (
        <MainLayout>
            <CrearCuenta/>
        </MainLayout>
    )
}