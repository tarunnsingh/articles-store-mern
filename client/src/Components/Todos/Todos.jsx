import React, { useState, useContext, useEffect } from "react";

import TodoItem from "./TodoItem/TodoItem";
import TodoService from "../../Services/TodoService";
import { AuthContext } from "../../Context/AuthContext";
import Message from "../Message/Message";
import {
  Spinner,
  Button,
  ListGroup,
  Container,
  Row,
  Col,
  Jumbotron,
} from "react-bootstrap";
import styles from "./Todos.module.css";
import { faFrownOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Todos = (props) => {
  const [todo, setTodo] = useState({ name: "", tags: "" });
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);
  const [todoLoading, setTodoLoading] = useState(false);
  const [todoListLoading, setTodoListLoading] = useState(false);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    setTodoListLoading(true);
    TodoService.getTodos().then((data) => {
      setTodos(data.todos);
      setTodoListLoading(false);
    });
  }, []);

  const onSubmit = (e) => {
    setTodoLoading(true);
    e.preventDefault();

    TodoService.postTodo(todo).then((data) => {
      const { message } = data;

      if (!message.msgError) {
        TodoService.getTodos().then((data) => {
          setTodos(data.todos);
          setMessage(message);
        });
      } else if (message.msgBody === "Unauthorized") {
        //IF JWT EXPIRES
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
      resetForm();
    });
  };

  const handleDelete = (props) => {
    setTodoListLoading(true);
    TodoService.deleteTodo(props.todo._id).then((data) => {
      const { message } = data;

      if (!message.msgError) {
        TodoService.getTodos().then((data) => {
          setTodos(data.todos);
          setMessage(message);
          setTodoListLoading(false);
        });
      } else if (message.msgBody === "Unauthorized") {
        //IF JWT EXPIRES
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
    console.log(todo);
  };

  const resetForm = () => {
    setTodo({ name: "", tags: "" });
    setTodoLoading(false);
    setMessage(null);
  };

  return (
    <Container
      style={{
        padding: "3rem",
        marginTop: "3rem",
        backgroundColor: "#eee",
      }}
    >
      <h6>Articles Written by You.</h6>
      {todos.length ? (
        <h6>{`You have ${todos.length} article(s).`}</h6>
      ) : (
        <div>
          <span>You haven't written any articles!</span>
          <FontAwesomeIcon icon={faFrownOpen} />
        </div>
      )}
      {!todoListLoading ? (
        <ListGroup>
          {todos.map((todo) => {
            return (
              <TodoItem
                key={todo._id}
                todo={todo}
                handleDelete={handleDelete}
              />
            );
          })}
        </ListGroup>
      ) : (
        <div>
          <Spinner
            animation="border"
            size="sm"
            role="status"
            aria-hidden="false"
          />{" "}
          <span> Getting Articles...</span>
        </div>
      )}
      <br />
      <Row>
        <Col sm={10}>
          <Jumbotron style={{ backgroundColor: "rgba(203, 147, 208, 0.5)" }}>
            <form onSubmit={onSubmit}>
              <label htmlFor="name">New Article</label>
              <textarea
                type="text"
                name="name"
                placeholder="Start Typing your article..."
                onChange={onChange}
                value={todo.name}
                className="form-control"
              />
              <label htmlFor="tags">Add Tags</label>
              <input
                type="text"
                name="tags"
                placeholder="Add Comma Separated Tags..."
                onChange={onChange}
                value={todo.tags}
                className="form-control"
              />

              <Button
                type="submit"
                variant="primary"
                className={styles.button}
                disabled={todoLoading}
              >
                <span> Add Article </span>{" "}
                {!todoLoading ? null : (
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="false"
                  />
                )}
              </Button>
            </form>
          </Jumbotron>
        </Col>
      </Row>

      {message ? <Message message={message} /> : null}
    </Container>
  );
};

export default Todos;
