import { useState } from "react";
import {
  appContainer,
  board,
  buttons,
  deleteBoardButton,
  loggerButton,
} from "./App.css";
import BoardList from "./components/BoardList/BoardList";
import ListsContainer from "./components/ListsContainer/ListsContainer";
import { useTypedDispatch, useTypedSelector } from "./hooks/redux";
import EditModal from "./components/EditModal/EditModal";
import LoggerModal from "./components/LoggerModal/LoggerModal";
import { deleteBoard, sort } from "./store/slices/boardsSlice";
import { addLog } from "./store/slices/loggerSlice";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App = () => {
  const [activeBoardId, setActiveBoardId] = useState<string>("board-0");
  const [isLoggerOpen, setIsLoggerOpen] = useState<boolean>(false);

  const boards = useTypedSelector((state) => state.boards.boardArray);
  const modalActive = useTypedSelector((state) => state.boards.modalActive);
  const dispatch = useTypedDispatch();

  const getActiveBoard = boards.filter(
    (board) => board.boardId === activeBoardId
  )[0];

  const lists = getActiveBoard.lists;

  const handleDeleteBoard = () => {
    if (boards.length === 1) {
      alert("최소 게시판 갯수는 1개입니다.");
      return;
    }

    dispatch(deleteBoard({ boardId: getActiveBoard.boardId }));

    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `게시판 지우기 : ${getActiveBoard.boardName}`,
        logAuthor: "User",
        logTimeStamp: String(Date.now()),
      })
    );

    const newIndexToSet = () => {
      const indexToBeDeleted = boards.findIndex(
        (board) => board.boardId === getActiveBoard.boardId
      );

      return indexToBeDeleted === 0
        ? indexToBeDeleted + 1
        : indexToBeDeleted - 1;
    };

    setActiveBoardId(boards[newIndexToSet()].boardId);
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    const sourceList = lists.filter(
      (list) => list.listId === source.droppableId
    )[0];

    if (!destination) {
      return;
    }

    dispatch(
      sort({
        boardIndex: boards.findIndex(
          (board) => board.boardId === activeBoardId
        ),
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
        draggableId,
      })
    );

    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `
        리스트 "${sourceList.listName}"에서
        리스트 "${
          lists.filter((list) => list.listId === destination.droppableId)[0]
            .listName
        }"으로
        ${
          sourceList.tasks.filter((task) => task.taskId === draggableId)[0]
            .taskName
        }를 옮김
        `,
        logAuthor: "User",
        logTimeStamp: String(Date.now()),
      })
    );
  };

  return (
    <div className={appContainer}>
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen} /> : null}
      {modalActive ? <EditModal /> : null}
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <ListsContainer boardId={getActiveBoard.boardId} lists={lists} />
        </DragDropContext>
      </div>
      <div className={buttons}>
        <button onClick={handleDeleteBoard} className={deleteBoardButton}>
          이 게시판 삭제하기
        </button>
        <button
          onClick={() => setIsLoggerOpen(!isLoggerOpen)}
          className={loggerButton}
        >
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보이기"}
        </button>
      </div>
    </div>
  );
};

export default App;
