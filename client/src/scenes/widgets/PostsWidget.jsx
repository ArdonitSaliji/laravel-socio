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

    const getPosts = async () => {
        const response = await fetch('http://localhost:8000/api/posts', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        data.forEach((data) => {
            data.comments = JSON.parse(data.comments);
            data.likes = JSON.parse(data.likes);
        });

        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(`http://localhost:8000/api/posts/${userId}/posts`, {
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
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {posts?.map(
                ({
                    id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) =>
                    userId === loggedInUser.id ? (
                        <PostWidget
                            key={id}
                            postId={id}
                            postUserId={userId}
                            name={`${firstName} ${lastName}`}
                            description={description}
                            location={location}
                            picturePath={picturePath}
                            userPicturePath={userPicturePath}
                            likes={likes}
                            comments={comments}
                            profile={true}
                        />
                    ) : (
                        <PostWidget
                            key={id}
                            postId={id}
                            postUserId={userId}
                            name={`${firstName} ${lastName}`}
                            description={description}
                            location={location}
                            picturePath={picturePath}
                            userPicturePath={userPicturePath}
                            likes={likes}
                            comments={comments}
                            profile={false}
                        />
                    )
            )}
        </>
    );
};

export default PostsWidget;
