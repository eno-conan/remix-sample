import { ReactNode } from 'react';
import Footer from './footer';
import Header from './header';

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;