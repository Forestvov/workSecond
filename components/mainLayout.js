import Head from "next/head";
import style from "../styles/navigation.module.scss";
import Link from "next/link";

export function MainLayout({children, title = 'Next App'}) {
    return(
        <>
            <Head>
                <title>{title} | My test App</title>
            </Head>
            <nav className={style.navigation}>
                <li>
                    <Link href={`/`}>Home Page</Link>
                </li>
                <li>
                    <Link href={`/posts`}>Posts Page</Link>
                </li>
            </nav>
            <main>
                {children}
            </main>
        </>
    )
}