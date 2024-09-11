import ProductDetail from "../components/ProductDetail";
import { MainLayout } from "../layouts/MainLayout";

export const ProductDetailPage = () => {
    document.title = "Detalle libro";
    return (
        <MainLayout>
            <ProductDetail/>
        </MainLayout>
    );
};
