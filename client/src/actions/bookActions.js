import axios from "axios";
import {
   BOOK_CREATE_FAIL,
   BOOK_CREATE_REQUEST,
   BOOK_CREATE_SUCCESS,
   BOOK_DELETE_FAIL,
   BOOK_DELETE_REQUEST,
   BOOK_DELETE_SUCCESS,
   BOOK_DETAILS_FAIL,
   BOOK_DETAILS_REQUEST,
   BOOK_DETAILS_SUCCESS,
   BOOK_LIST_FAIL,
   BOOK_LIST_REQUEST,
   BOOK_LIST_SUCCESS,
} from "./types";

export const listBooks = () => async (dispatch) => {
   try {
      dispatch({ type: BOOK_LIST_REQUEST });
      const { data } = await axios.get("/api/v1/books");
      dispatch({
         type: BOOK_LIST_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: BOOK_LIST_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const listBookDetails = (id) => async (dispatch) => {
   try {
      dispatch({ type: BOOK_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/v1/books/${id}`);
      dispatch({
         type: BOOK_DETAILS_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: BOOK_DETAILS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const createBook = (bookData) => async (dispatch) => {
   try {
      dispatch({
         type: BOOK_CREATE_REQUEST,
      });
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      const { data } = await axios.post(`/api/v1/books`, bookData, config);
      dispatch({
         type: BOOK_CREATE_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: BOOK_CREATE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const deleteBook = (id) => async (dispatch) => {
   try {
      dispatch({
         type: BOOK_DELETE_REQUEST,
      });
      const { data } = await axios.delete(`/api/v1/books/${id}`);
      dispatch({
         type: BOOK_DELETE_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: BOOK_DELETE_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};
