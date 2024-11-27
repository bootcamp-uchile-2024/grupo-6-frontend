import Header from '../components/Header.tsx'
import Footer from '../components/Footer.tsx'

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {

    return (
        <div className="main-container">
            <Header/>
            <main>
                {props.children}
            </main>
            <Footer/>
        </div>      
    );
};