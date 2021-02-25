import React, {useState, useEffect} from 'react'
import Link from "next/link";

import {MainLayout} from "../../components/mainLayout";
import Paginator from "../../components/Paginator/Paginator";

import style from '../../styles/posts.module.scss'



export default function Posts({posts: serverPosts}) {
    const [posts, setPosts] = useState(serverPosts)
    const [numberCurrentPage, setNumberCurrentPage] = useState(1)

    useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}?_page=${numberCurrentPage}`)
            const json = await response.json()
            setPosts(json)
        }

        if (!serverPosts) load()
    }, [numberCurrentPage])

    if(!posts) {
        return <MainLayout><h2>Loading ...</h2></MainLayout>
    }

    return (
        <MainLayout title={'Posts Page'}>
            <div className={style.items}>
                <h1 className={style.title}>Posts page</h1>

                <Paginator currentPage={numberCurrentPage}
                           onPageChanged={(p) => setNumberCurrentPage(prevState => p)}/>

                <ul className={style.list}>
                    {posts.map((post) =>
                        <li className={style.listItem} key={post.id}>
                        <span>
                            {`${post.id}. `}
                        </span>
                            <Link  href={`/posts/[id]`} as={`/posts/${post.id}`}>{post.title}</Link>
                        </li>)}
                </ul>
            </div>
        </MainLayout>
    )
}

Posts.getInitialProps = async ({req}) => {
    if (!req) {
        return {posts: null}
    }
    const response = await fetch(`${process.env.API_URL}?_page=1`)
    const posts = await response.json()

    return {
        posts
    }
}

// export async function getServerSideProps(context) {
//     const res = await fetch(`${process.env.API_URL}?_page=1`)
//     const posts = await res.json()
//
//     if (!posts) {
//         return {
//             posts: null
//         }
//     }
//
//     return {
//         posts: {}, // will be passed to the page component as props
//     }
// }

