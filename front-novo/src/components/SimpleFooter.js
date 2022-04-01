export default function SimpleFooter() {
    return (
        <>
            <footer className="pt-8 pb-6">
                <div className="container max-w-7xl mx-auto px-4">
                <div className="w-full md:w-4/12 px-4 mx-auto text-center">

                        <div className="text-sm text-white font-medium">
                            Copyright © {new Date().getFullYear()} Material
                            Tailwind by{' '}
                            <a
                                href="https://www.creative-tim.com?ref=mtk"
                                className="text-white"
                            >
                                Creative Tim
                            </a>
                            {' '}& Hire IT.
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
