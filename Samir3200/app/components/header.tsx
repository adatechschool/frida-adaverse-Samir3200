import Link from 'next/link';

export default function Header() {
    return (
        <>
            <header className="bg-[#16c3f5] text-white py-6 shadow-md fixed top-0 left-0 right-0 z-50">
                <div className="container mx-auto flex items-center px-4">
                    <Link href="/accueil" className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold">PROJETS GITHUB</h1>
                    </Link>
                    <nav className="flex-1 flex justify-center items-center">
                        <ul className="flex space-x-24 text-base">
                            <li><Link href="/accueil" className="hover:underline">Accueil</Link></li>
                            <li><Link href="/Liste des projets" className="hover:underline">Liste des projets</Link></li>
                            <li><Link href="/Liste des promos" className="hover:underline">Liste des promos</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}
