import ShoppingCart from "../components/shoppingcart/ShoppingCart";
import { MainLayout } from "../layouts/MainLayout";

interface ShoppingCartPageProps {
    title: string
}

export const ShoppingCartPage = (props: ShoppingCartPageProps) => {
    document.title = props.title;
    return (
        <MainLayout>
            <ShoppingCart/>
        </MainLayout>
    );
};
