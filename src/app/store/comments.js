/*eslint-disable*/
import { createSlice, createAction } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentDeleted: (state, action) => {
            // state.entities.filter((c) => c._id !== action.payload._id);
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFailed,
    commentCreated,
    commentDeleted
} = actions;

const commentCreateRequested = createAction("comments/commentCreateRequested");
const createCommentFailed = createAction("comments/commentCreateFailed");
const commentDeleteRequested = createAction("comments/commentDeleteRequested");
const deleteCommentFailed = createAction("comments/commentDeleteFailed");

export const createUserComment = (data, commentData) => async (dispatch) => {
    dispatch(commentCreateRequested());
    const comment = {
        ...data,
        ...commentData
    };
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(createCommentFailed(error.message));
    }
};

export const deleteUserComment = (id) => async (dispatch) => {
    dispatch(commentDeleteRequested());
    try {
        const { content } = await commentService.removeComment(id);
        console.log(content);
        dispatch(commentDeleted(content));
    } catch (error) {
        dispatch(deleteCommentFailed(error.message));
    }
};

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
