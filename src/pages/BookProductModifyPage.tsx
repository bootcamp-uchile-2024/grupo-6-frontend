import BookProductModify from "../components/adminbooks/BookProductModify";
import { MainLayout } from "../layouts/MainLayout";

interface BookProductModifyPageProps {
    title: string
}

export const BookProductModifyPage = (props: BookProductModifyPageProps) => {
    document.title = props.title;
    return (
        <MainLayout>
            <BookProductModify/>
        </MainLayout>
    );
};
