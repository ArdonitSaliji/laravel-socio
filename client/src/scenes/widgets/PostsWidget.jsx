import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';
import PostWidget from './PostWidget';

const PostsWidget = ({ userId, isProfile = false, profile }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const loggedInUser = useSelector((state) => state.user);

    // ! 'POSTS' Widget

    const getAllPosts = async () => {
        const response = await fetch(`http://localhost:8000/${userId}/posts`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(`http://localhost:8000/posts/${userId}/posts`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getAllPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {posts?.map(
                ({
                    postId,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes_count,
                    likedByCurrentUser,
                }) => (
                    <PostWidget
                        key={postId}
                        postId={postId}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        profile={userId === loggedInUser.userId ? true : false}
                        likes_count={likes_count}
                        likedByCurrentUser={likedByCurrentUser}
                    />
                )
            )}
        </>
    );
};

export default PostsWidget;
