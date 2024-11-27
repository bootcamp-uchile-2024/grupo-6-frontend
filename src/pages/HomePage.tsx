import { MainLayout } from "../layouts/MainLayout";
import HomeInfo from '../components/HomeInfo.tsx';

interface HomePageProps {
  title: string
}

export default function HomePage(props: HomePageProps) {
  document.title = props.title;
  return (
    <MainLayout>
      <HomeInfo />
    </MainLayout>
  );
};