import Header from '../components/Header.tsx'
import Footer from '../components/Footer.tsx'
import AdminHeader from '../components/AdminHeader.tsx';
import AdminFooter from '../components/AdminFooter.tsx';
import { userHasRole } from '../services/loginService.ts';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
    const isAdmin = userHasRole(['admin']);

    console.log('¿Es admin?:', isAdmin);

    return (
        <div className="main-container">

            {isAdmin ? <AdminHeader /> : <Header/>}

            <main>
                {props.children}
            </main>

            {isAdmin ? <AdminFooter /> : <Footer/>}

        </div>      
    );
};