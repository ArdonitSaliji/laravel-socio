import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'light',
    user: null,
    token: null,
    posts: [],
    searchUsers: '',
    messageFriend: null,
    chatWithFriend: {
        friend: null,
        messages: null,
    },
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error('user friends non-existent :(');
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post.postId === action.payload.post.postId) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        setSearchUsers: (state, action) => {
            state.searchUsers = action.payload;
        },
        setIsProfile: (state, action) => {
            state.isProfile = action.payload;
        },
        setChatWithFriend: (state, action) => {
            state.chatWithFriend = action.payload;
        },
        updateChatWithFriend: (state, action) => {
            state.chatWithFriend.messages = action.payload;
        },
    },
});

export const {
    setMode,
    setLogin,
    setLogout,
    setFriends,
    setPosts,
    setPost,
    setSearchUsers,
    setIsProfile,
    setChatWithFriend,
    updateChatWithFriend,
} = authSlice.actions;
export default authSlice.reducer;
