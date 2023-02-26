import { MoreHoriz } from '@mui/icons-material';
import { IconButton, List, ListItemButton, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPosts } from 'state';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import { ClickAwayListener } from '@mui/base';

const PostOptions = ({ postId, description, friendId, name, subtitle, userPicturePath }) => {
    const [edit, setEdit] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const posts = useSelector((state) => state.posts);
    const [popup, setPopup] = useState({
        open: false,
        post: '',
        picture: '',
    });

    const navigate = useNavigate();
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const paper = palette.background.paper;

    return (
        <div>
            <FlexBetween>
                <FlexBetween gap='1rem'>
                    <UserImage image={userPicturePath} size='55px' />
                    <Box
                        onClick={() => {
                            navigate(`/profile/${friendId}`);
                            navigate(0);
                        }}
                    >
                        <Typography
                            color={main}
                            variant='h5'
                            fontWeight='500'
                            sx={{
                                '&:hover': {
                                    color: palette.primary.light,
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography color={medium} fontSize='0.75rem'>
                            {subtitle}
                        </Typography>
                    </Box>
                </FlexBetween>

                <IconButton
                    onClick={() => setEdit(true)}
                    sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
                >
                    <MoreHoriz sx={{ color: primaryDark }} />
                    <ClickAwayListener onClickAway={() => setEdit(false)} mouseEvent='onMouseDown'>
                        <List
                            role='presentation'
                            sx={{
                                position: 'absolute',
                                zIndex: '2',
                                borderRadius: '10px',
                                button: true,
                                transform: 'translateY(100%)',
                                right: '0',
                                width: '8rem',
                                maxWidth: 360,
                                backgroundColor: paper,
                                bottom: '0',

                                // Based on edit state show or hide
                                display: edit ? 'inline-block' : 'none',
                            }}
                        >
                            <ListItemButton
                                sx={{ height: '2rem' }}
                                id={postId}
                                onClick={() => {
                                    let findPost = posts.find((post) => post.id === postId);
                                    setPopup({
                                        ...popup,
                                        post: findPost,
                                        open: true,
                                    });
                                }}
                            >
                                Edit
                            </ListItemButton>
                            <ListItemButton sx={{ height: '2rem' }}>Archive</ListItemButton>
                            <ListItemButton sx={{ height: '2rem' }}>Share</ListItemButton>
                            <ListItemButton
                                sx={{ height: '2rem' }}
                                onClick={() => {
                                    setDeletePopup(true);
                                }}
                            >
                                Delete
                            </ListItemButton>
                        </List>
                    </ClickAwayListener>
                </IconButton>
            </FlexBetween>

            <EditPost
                title='Employee Form'
                popup={popup}
                setPopup={setPopup}
                postId={postId}
                description={description}
            />
            <DeletePost
                postId={postId}
                setPosts={setPosts}
                deletePopup={deletePopup}
                setDeletePopup={setDeletePopup}
            />
        </div>
    );
};

export default PostOptions;
