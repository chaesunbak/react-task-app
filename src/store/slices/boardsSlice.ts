import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardState = {
  modalActive: boolean;
  boardArray: IBoard[];
};

type TAddBoardAction = {
  board: IBoard;
};

type TdeleteBoardAction = {
  boardId: string;
};

type TAddListAction = {
  boardId: string;
  list: IList;
};

type TAddTaskAction = {
  boardId: string;
  listId: string;
  task: ITask;
};

type TDeleteListAction = {
  boardId: string;
  listId: string;
};

type TDelteTaskAction = {
  boardId: string;
  listId: string;
  taskId: string;
};

type TSortAction = {
  boardIndex: number;
  droppableIdStart: string;
  droppableIdEnd: string;
  droppableIndexStart: number;
  droppableIndexEnd: number;
  draggableId: string;
};

const initialState: TBoardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: "board-0",
      boardName: "내 할일",
      lists: [
        {
          listId: "list-1",
          listName: "시작 전",
          tasks: [
            {
              taskId: "task-1",
              taskName: "베트남 여행가기",
              taskDescription: "하노이 + 하롱베이 계획짜기",
              taskOwner: "task 1 owner",
            },
            {
              taskId: "task-2",
              taskName: "오픈 소스 기여하기",
              taskDescription: "번역으로 기여할 수 있는 프로젝트 찾기",
              taskOwner: "task 2 owner",
            },
          ],
        },
        {
          listId: "list-2",
          listName: "진행 중",
          tasks: [
            {
              taskId: "task-3",
              taskName: "리액트 고수되기 : 메모이제이션 공부하기",
              taskDescription: "useMemo, useCallback 공부하기",
              taskOwner: "task 3 owner",
            },
            {
              taskId: "task-4",
              taskName: "태스트 앱 스타일링 하기",
              taskDescription: "버그 수정하고 CSS 작업하기",
              taskOwner: "task 4 owner",
            },
          ],
        },
        {
          listId: "list-3",
          listName: "완료",
          tasks: [
            {
              taskId: "task-5",
              taskName: "칸예 웨스트 공연보기",
              taskDescription: "고양종합운동장",
              taskOwner: "task 5 owner",
            },
            {
              taskId: "task-6",
              taskName: "지도 앱 만들기",
              taskDescription: "카카오 지도 API 사용하기",
              taskOwner: "task 4 owner",
            },
          ],
        },
      ],
    },
  ],
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boardArray.push(payload.board);
    },

    deleteBoard: (state, { payload }: PayloadAction<TdeleteBoardAction>) => {
      state.boardArray = state.boardArray.filter(
        (board) => board.boardId !== payload.boardId
      );
    },

    addList: (state, { payload }: PayloadAction<TAddListAction>) => {
      const board = state.boardArray.find((b) => b.boardId === payload.boardId);
      if (board) {
        board.lists.push(payload.list);
      }
    },

    addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      const board = state.boardArray.find((b) => b.boardId === payload.boardId);
      if (board) {
        const list = board.lists.find((l) => l.listId === payload.listId);
        if (list) {
          list.tasks.push(payload.task);
        }
      }
    },

    updateTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      const board = state.boardArray.find((b) => b.boardId === payload.boardId);
      if (board) {
        const list = board.lists.find((l) => l.listId === payload.listId);
        if (list) {
          list.tasks = list.tasks.map((task) =>
            task.taskId === payload.task.taskId ? payload.task : task
          );
        }
      }
    },

    deleteTask: (state, { payload }: PayloadAction<TDelteTaskAction>) => {
      const board = state.boardArray.find((b) => b.boardId === payload.boardId);
      if (board) {
        const list = board.lists.find((l) => l.listId === payload.listId);
        if (list) {
          list.tasks = list.tasks.filter(
            (task) => task.taskId !== payload.taskId
          );
        }
      }
    },

    deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
      const board = state.boardArray.find((b) => b.boardId === payload.boardId);
      if (board) {
        board.lists = board.lists.filter(
          (list) => list.listId !== payload.listId
        );
      }
    },

    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },

    sort: (state, { payload }: PayloadAction<TSortAction>) => {
      if (payload.droppableIdStart === payload.droppableIdEnd) {
        const list = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.listId === payload.droppableIdStart
        );

        const card = list?.tasks.splice(payload.droppableIndexStart, 1);
        list?.tasks.splice(payload.droppableIndexEnd, 0, ...card!);
      }

      if (payload.droppableIdStart !== payload.droppableIdEnd) {
        const listStart = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.listId === payload.droppableIdStart
        );

        const card = listStart?.tasks.splice(payload.droppableIndexStart, 1);

        const listEnd = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.listId === payload.droppableIdEnd
        );

        listEnd?.tasks.splice(payload.droppableIndexEnd, 0, ...card!);
      }
    },
  },
});
export const {
  addBoard,
  deleteBoard,
  addList,
  addTask,
  updateTask,
  deleteTask,
  deleteList,
  setModalActive,
  sort,
} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
