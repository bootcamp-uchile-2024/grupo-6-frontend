import { EmptyCart } from "../components/shoppingcart/EmptyCart"
import { MainLayout } from "../layouts/MainLayout";

interface EmptyCartPageProps {
    title: string
}

export const EmptyCartPage = (props: EmptyCartPageProps) => {
    document.title = props.title;
    return (
        <MainLayout>
            <EmptyCart/>
        </MainLayout>
    );
};