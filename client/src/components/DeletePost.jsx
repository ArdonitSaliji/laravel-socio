import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { setPosts } from 'state';

const DeletePost = ({ postId, deletePopup, setDeletePopup, setPosts }) => {
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const { id } = useSelector((state) => state.user);
    const deletePost = async () => {
        const response = await fetch(`http://localhost:8000/api/posts/${postId}/delete`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: id,
            }),
        });

        const posts = await response.json();
        dispatch(setPosts({ posts: posts }));
    };

    return (
        <Dialog
            open={deletePopup}
            onClose={() => {
                setDeletePopup(false);
            }}
            aria-labelledby='responsive-dialog-title'
        >
            <DialogTitle id='responsive-dialog-title'>
                Are you sure you want to delete this post?
            </DialogTitle>
            <DialogActions>
                <Button autoFocus onClick={() => setDeletePopup(false)}>
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        deletePost();
                        setDeletePopup(false);
                    }}
                    autoFocus
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeletePost;
