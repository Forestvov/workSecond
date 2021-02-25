import {useState, useEffect} from 'react'
import Link from "next/link";
import {useRouter} from "next/router";

import {MainLayout} from "../../components/mainLayout";
import styles from "../../styles/Item.module.scss"


export default function Post ({post: serverPost}) {
    const [post, setPost] = useState(serverPost)
    const router = useRouter()

    useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}/${router.query.id}`)
            const data = await response.json()
            setPost(data)
        }
        if(!serverPost) load()
    },[])

    if(!post) {
        return <MainLayout><h2>Loading ...</h2></MainLayout>
    }

    return <MainLayout title={post.title}>
        <>
            <h2>Post Title: {post.title}</h2>
            <p className={styles.postText}><span>Post Text</span>: {post.body}</p>
            <div className={styles.backLink}>
                <Link href={`/posts`}>Back to all post</Link>
            </div>
        </>
    </MainLayout>
}


Post.getInitialProps = async ({query, req}) => {
    if (!req) {
        return {post:null}
    }
    const response = await fetch(`${process.env.API_URL}/${query.id}`)
    const post = await response.json()
    return  {
        post
    }
}
