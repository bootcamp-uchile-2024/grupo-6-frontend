import { MysteryBox } from "../components/MysteryBox";
import { MainLayout } from "../layouts/MainLayout";

interface MysteryBoxProps {
    title: string
}

export const MysteryBoxPage = (props: MysteryBoxProps) => {
    document.title = props.title;

    return (
        <MainLayout>
            <MysteryBox />
        </MainLayout>
    )
}