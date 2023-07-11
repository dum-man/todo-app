import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { emptySplitApi } from "./emptySplitApi";
import { firestore } from "@/config";
import { Todo } from "@/types";

export const todoApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      async queryFn() {
        try {
          const todosDocs = await getDocs(query(collection(firestore, "todos")));
          const todosData = todosDocs.docs.map((doc) => doc.data() as Todo);
          return {
            data: todosData,
          };
        } catch (error: any) {
          console.log(error.message);
          return {
            error: error.message,
          };
        }
      },
      providesTags: ["Todos"],
    }),

    createTodo: builder.mutation<null, { todo: Todo }>({
      async queryFn({ todo }) {
        try {
          await setDoc(doc(firestore, `todos/${todo.id}`), todo);
          return {
            data: null,
          };
        } catch (error: any) {
          console.log(error.message);
          return {
            error: error.message,
          };
        }
      },
      invalidatesTags: ["Todos"],
    }),

    deleteTodo: builder.mutation<null, { todoId: string }>({
      async queryFn({ todoId }) {
        try {
          await deleteDoc(doc(firestore, `todos/${todoId}`));
          return {
            data: null,
          };
        } catch (error: any) {
          console.log(error.message);
          return {
            error: error.message,
          };
        }
      },
      invalidatesTags: ["Todos"],
    }),

    toggleTodoArchive: builder.mutation<null, { todoId: string; isArchived: boolean }>({
      async queryFn({ todoId, isArchived }) {
        try {
          await updateDoc(doc(firestore, `todos/${todoId}`), {
            isArchived: !isArchived,
          });
          return {
            data: null,
          };
        } catch (error: any) {
          console.log(error.message);
          return {
            error: error.message,
          };
        }
      },
      invalidatesTags: ["Todos"],
    }),

    toggleTodoFavorite: builder.mutation<null, { todoId: string; isFavorite: boolean }>({
      async queryFn({ todoId, isFavorite }) {
        try {
          await updateDoc(doc(firestore, `todos/${todoId}`), {
            isFavorite: !isFavorite,
          });
          return {
            data: null,
          };
        } catch (error: any) {
          console.log(error.message);
          return {
            error: error.message,
          };
        }
      },
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useToggleTodoArchiveMutation,
  useToggleTodoFavoriteMutation,
} = todoApi;
