import MedioDePagoShoppingCart from "../components/shoppingcart/MedioDePagoShoppingCart";
import { MainLayout } from "../layouts/MainLayout";

interface MedioDePagoPageProps {
    title: string
}

export const MedioDePagoPage = (props: MedioDePagoPageProps) => {
    document.title = props.title;
    return (
        <MainLayout>
            <MedioDePagoShoppingCart/>
        </MainLayout>
    );
};
