import React, { ReactElement, ReactNode } from 'react';

export const Layout = ({
    title,
    children,
}: {
    title: string;
    children: JSX.Element | ReactElement | ReactNode;
}): JSX.Element => {
    return (
        <>
            <Navigation />
            <Header title={title} />

            <Main>{children}</Main>
            <Footer />
        </>
    );
};

const Header = ({
    title,
    subTitle,
    thirdTitle,
}: {
    title: ReactNode;
    subTitle?: ReactNode;
    thirdTitle?: ReactNode;
}): JSX.Element => {
    return (
        <header className="masthead" style={{ backgroundImage: 'url("assets/img/home-bg.jpg")' }}>
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="site-heading">
                            <h1>{title}</h1>
                            <span className="subheading">{subTitle}</span>
                            {thirdTitle}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

const Navigation = (): JSX.Element => {
    return (
        <nav className={`navbar navbar-expand-lg navbar-light position-fixed`} id="mainNav">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="/">
                    ОСББ Парус Смарт
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    Menu
                    <i className="fas fa-bars" />
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto py-4 py-lg-0">
                        <li className="nav-item">
                            <a className="nav-link px-lg-3 py-3 py-lg-4" href="/">
                                Новини
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link px-lg-3 py-3 py-lg-4" href="/documents">
                                Документи
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link px-lg-3 py-3 py-lg-4" href="/faq">
                                Часті питання
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link px-lg-3 py-3 py-lg-4" href="/feedback">
                                Опитування
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link px-lg-3 py-3 py-lg-4" href="/contact">
                                Контакти
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link px-lg-3 py-3 py-lg-4" href="/login">
                                Логін
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const Main = ({ children }: { children: JSX.Element | ReactElement | ReactNode }): JSX.Element => {
    return (
        <main className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7"></div>

                    {children}
                </div>
            </div>
        </main>
    );
};

const Footer = (): JSX.Element => {
    return (
        <footer className="border-top">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <ul className="list-inline text-center">
                            <li className="list-inline-item">
                                <a href="#!">
                                    <span className="fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x" />
                                        <i className="fab fa-twitter fa-stack-1x fa-inverse" />
                                    </span>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#!">
                                    <span className="fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x" />
                                        <i className="fab fa-facebook-f fa-stack-1x fa-inverse" />
                                    </span>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#!">
                                    <span className="fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x" />
                                        <i className="fab fa-github fa-stack-1x fa-inverse" />
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <div className="small text-center text-muted fst-italic">Copyright © Your Website 2021</div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
