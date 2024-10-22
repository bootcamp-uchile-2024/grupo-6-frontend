import ResumenShoppingCart from "../components/shoppingcart/ResumenShoppingCart"
import { MainLayout } from "../layouts/MainLayout";

interface ResumenShoppingCartPageProps {
    title: string
}

export const ResumenShoppingCartPage = (props: ResumenShoppingCartPageProps) => {
    document.title = props.title;
    return (
        <MainLayout>
            <ResumenShoppingCart/>
        </MainLayout>
    );
};