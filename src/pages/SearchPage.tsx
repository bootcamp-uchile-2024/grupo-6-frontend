import Search from "../components/Search";
import { MainLayout } from "../layouts/MainLayout";

interface SearchPageProps {
    title: string;
}

const SearchPage = (props: SearchPageProps) => {
    document.title = props.title;

    return (
        <MainLayout>
            <Search></Search>
        </MainLayout>
    );
}

export default SearchPage;