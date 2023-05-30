import { ReactNode } from 'react';
import Footer from './footer';
import Header from './header';

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="bg-gray-100 sm:items-center sm:justify-center">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;