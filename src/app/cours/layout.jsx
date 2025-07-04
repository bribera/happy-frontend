import Head from "@/components/Head";

export default function CoursLayout({ children }) {


  return (
    <section className="bg">
        <Head className="!bg-blue-900"  navbarVariant="alternative" />
        <div className="bg-blue-900/80 mt-28">
            {/* Breadcrumb */}
            <div className="bg-gray-100 py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4">
                    <li>
                    <a href="/cours" className="text-gray-500 hover:text-gray-700">
                        Cours
                    </a>
                    </li>
                    <li>
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    </li>
                    <li className="text-gray-900 font-medium">
                    {/* Le titre du cours sera injecté dynamiquement */}
                    </li>
                </ol>
                </nav>
            </div>
            </div>

        {/* Main Content */}
            <main className=" h-[90vh]">
            {children}
            </main>
        </div>
    </section>
  );
}