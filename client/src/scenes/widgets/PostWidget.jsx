import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from '@mui/icons-material';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Friend from 'components/Friend';
import PostOptions from 'components/PostOptions';
import WidgetWrapper from 'components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost, setPosts } from 'state';

// ! 'POST' Widget

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    profile,
    likes_count,
    likedByCurrentUser,
}) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const { userId } = useSelector((state) => state.user);

    const patchLike = async () => {
        const response = await fetch(`http://localhost:8000/posts/${postId}/like`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId }),
        });

        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    const deletePost = async () => {
        const response = await fetch(`http://localhost:8000/posts/${postId}/delete`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
            }),
        });
        const posts = await response.json();
        dispatch(setPosts({ posts: posts }));
    };

    return (
        <WidgetWrapper m='2rem 0'>
            {profile ? (
                <PostOptions
                    deletePost={deletePost}
                    postId={postId}
                    description={description}
                    friendId={postUserId}
                    name={name}
                    subtitle={location}
                    userPicturePath={userPicturePath}
                />
            ) : (
                <Friend
                    friendId={postUserId}
                    name={name}
                    subtitle={location}
                    userPicturePath={userPicturePath}
                />
            )}

            <Typography color={main} sx={{ mt: '1rem' }}>
                {description}
            </Typography>

            {picturePath && (
                <img
                    width='100%'
                    height='auto'
                    alt=''
                    style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
                    src={`http://localhost:8000/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt='0.25rem'>
                <FlexBetween gap='1rem'>
                    <FlexBetween gap='0.3rem'>
                        <IconButton onClick={patchLike}>
                            {likedByCurrentUser ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likes_count}</Typography>
                    </FlexBetween>

                    <FlexBetween gap='0.3rem'>
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{/* {comments && comments.length} */}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {/* {isComments && comments.length > 0 && (
                <Box mt='0.5rem'>
                    {comments?.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )} */}
        </WidgetWrapper>
    );
};

export default PostWidget;
