import React, { useEffect, useState } from "react";
import styled from "styled-components";

function ToDo() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Buy 1kg Tomato",
    },
    {
      id: 2,
      title: "Buy 2kg Onion",
    },
    {
      id: 3,
      title: "Visit friends",
    },
    {
      id: 4,
      title: "Clean House",
    },
  ]);
  const [completed, setCompleted] = useState([
    {
      id: 5,
      title: "Washing Clothes",
    },
    {
      id: 6,
      title: "Play Cricket",
    },
    {
      id: 7,
      title: "1 Km Walking",
    },
    {
      id: 8,
      title: "Do HomeWork",
    },
  ]);

  const [newTask, setNewTask] = useState("");
  const [itemCount, setItemCount] = useState(0);

  const [error, setError] = useState("");

  const addNewTask = (event) => {
    event.preventDefault();

    if (newTask.trim() === "") {
      setError("Task cannot be empty");
      return;
    }

    let new_task = {
      id: itemCount + 1,
      title: newTask,
    };
    setTasks([...tasks, new_task]);
    setNewTask("");
    setItemCount((prev) => prev + 1);
    setError("");
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
    setError("");
  };

  useEffect(() => {
    setItemCount(completed.length + tasks.length);
  }, [completed.length, tasks.length]);

  const deleteTask = (id) => {
    let new_list = tasks.filter((task) => task.id !== id);
    setTasks(new_list);
  };
  const deleteCompleted = (id) => {
    let new_list = completed.filter((task) => task.id !== id);
    setCompleted(new_list);
  };

  const completeTask = (id) => {
    let current_task = tasks.find((task) => task.id === id);
    setCompleted([...completed, current_task]);

    let new_list = tasks.filter((task) => task.id !== id);
    setTasks(new_list);
  };

  const revertTask = (id) => {
    let current_task = completed.find((task) => task.id === id);
    setTasks([...tasks, current_task]);

    let new_list = completed.filter((task) => task.id !== id);
    setCompleted(new_list);
  };

  const renderTasks = () => {
    return tasks.map((task) => (
      <Items key={task.id}>
        <LeftContainer onClick={() => completeTask(task.id)}>
          <BoxContainer></BoxContainer>
          <ItemContent>
            {task.id}, {task.title}
          </ItemContent>
        </LeftContainer>
        <RightContainer>
          <DeleteButton onClick={() => deleteTask(task.id)}>
            <DeleteImage
              src={require("../components/assets/delete.svg")}
              alt="Delete"
            />
          </DeleteButton>
        </RightContainer>
      </Items>
    ));
  };

  const renderCompleted = () => {
    return completed.map((task) => (
      <Items key={task.id}>
        <LeftContainer>
          <BoxCompleted>
            <TickImage src={require("./assets/tick-green.svg")} alt="Tick" />
          </BoxCompleted>
          <ItemCompleted>
            {task.id}, {task.title}
          </ItemCompleted>
        </LeftContainer>
        <RightContainer>
          <DeleteButton onClick={() => revertTask(task.id)}>
            <DeleteImage
              src={require("../components/assets/revert.svg")}
              alt="Revert"
            />
          </DeleteButton>
          <DeleteButton onClick={() => deleteCompleted(task.id)}>
            <DeleteImage
              src={require("../components/assets/delete.svg")}
              alt="Delete"
            />
          </DeleteButton>
        </RightContainer>
      </Items>
    ));
  };

  return (
    <Container>
      <Heading>ToDo List</Heading>
      <ToDoContainer>
        <SubHeading>Things to be done</SubHeading>
        <ToDoTask>{renderTasks()}</ToDoTask>
      </ToDoContainer>
      <ToDoForm>
        <TodoInput
          value={newTask}
          onChange={handleInputChange}
          placeholder="Type new task..."
        />
        <TodoSubmitButton onClick={(e) => addNewTask(e)}>
          Add New
        </TodoSubmitButton>
      </ToDoForm>
      <span className="error">{error}</span>

      <ToDoContainer>
        <SubHeading>Completed</SubHeading>
        <ToDoTask>{renderCompleted()}</ToDoTask>
      </ToDoContainer>
    </Container>
  );
}

export default ToDo;

const Container = styled.div`
  width: 90% auto;
  max-width: 1000px;
  padding: 50px 10%;
  border-left: 2px solid #f5f5f5;
  border-right: 2px solid #f5f5f5;
  margin: 0 auto;
  height: 100vh;
`;
const Heading = styled.h1`
  font-size: 52px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`;
const ToDoContainer = styled.div``;
const SubHeading = styled.h3`
  font-size: 36px;
  color: #050241;
`;
const ToDoTask = styled.ul``;
const Items = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;
const BoxContainer = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #050241;
  display: inline-block;
  margin-right: 15px;
  cursor: pointer;
`;
const ItemContent = styled.span`
  font-size: 28px;
  cursor: pointer;
`;
const RightContainer = styled.div``;
const DeleteButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  margin-right: 20px;
  outline: none;
  &:last-child {
    margin-right: 0;
  }
`;
const DeleteImage = styled.img``;
const ToDoForm = styled.form`
  display: flex;
  margin-left: 40px;
  margin-top: 30px;
  position: relative;
  &::before {
    content: "";
    background-image: url(${require("./assets/plus.svg")});
    width: 16px;
    height: 16px;
    display: block;
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    z-index: 2;
  }
`;
const TodoInput = styled.input`
  display: block;
  width: 100%;
  outline: none;
  border: 1px solid #c6c6c6;
  border-right: none;
  padding: 0 10px 0 35px;
  font-size: 22px;
`;
const TodoSubmitButton = styled.button`
  padding: 15px 25px;
  white-space: nowrap;
  border: none;
  background: #050241;
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-size: 24px;
`;
const BoxCompleted = styled(BoxContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: #06c690;
`;
const TickImage = styled.img``;
const ItemCompleted = styled(ItemContent)`
  color: #06c690;
`;
