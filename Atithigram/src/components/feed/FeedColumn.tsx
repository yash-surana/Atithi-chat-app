'use client'
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import { FC, useEffect, useRef } from "react"
import MyPost from "./MyPost"
import { useIntersection } from '@mantine/hooks'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"
import { ExtendedPost } from "@/types/db"
import { Loader2 } from "lucide-react"

interface PostFeedProps {
  initialPosts: ExtendedPost[]
}

const FeedColumn: FC<PostFeedProps> = ({ initialPosts }) => {
  const lastPostRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 0.5,
  })
  const { data: session } = useSession()

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['infinite-query'],
    async ({ pageParam = 1 }) => {
      const query = `/api/user/post?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}`
      const { data } = await axios.get(query)
      return data as ExtendedPost[]
    },
    {
      getNextPageParam: (_, pages) => pages.length + 1,
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  )

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])

  const posts = data?.pages?.flatMap((page) => page) ?? initialPosts

  return (
    <ul className='flex flex-col
    
    '>
      {posts.map((post, index) => {
        const isLiked = post?.like?.some((vote) => vote.userId === session?.user.id)
        const LikeAmount = post?.like.length
        const commentLength = post?.comments.length

        if (index === posts.length) {
          return (
            <li key={post.id} ref={ref}>
              <MyPost
                post={post}
                isPostLiked={isLiked}
                commentLength={commentLength}
                LikeAmt={LikeAmount}
              />
            </li>
          )
        } else {
          return (
            <MyPost
              key={post.id}
              post={post}
              isPostLiked={isLiked}
              commentLength={commentLength}
              LikeAmt={LikeAmount}
            />
          )
        }
      })}
      {isFetchingNextPage && (
        <li className='flex justify-center mb-3 p-4'>
          <Loader2 className='w-6 h-6 text-2xl text-[#3180e1] animate-spin' />
        </li>
      )}
    </ul>
  )
}

export default FeedColumn
