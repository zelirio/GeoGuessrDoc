import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { gameID } = router.query

  return <p>Post: {gameID}</p>
}

export default Post