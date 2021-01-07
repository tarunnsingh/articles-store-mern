import React from "react";
import { Badge, Button, Row, ListGroup, Col } from "react-bootstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TodoItem = (props) => {
  return (
    <Row>
      <Col sm={10}>
        <ListGroup.Item
          style={{
            marginTop: "1rem",
          }}
        >
          {props.todo.name}
        </ListGroup.Item>
        <span style={{ paddingTop: "1em", display: "inline-block" }}>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => {
              props.handleDelete(props);
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faTrash} />
          </Button>

          {props.todo.tags.map((tag, idx) => {
            return (
              <Badge
                pill
                variant="secondary"
                key={idx}
                style={{ marginLeft: "0.5rem", fontSize: "1em" }}
              >
                {" "}
                {tag}{" "}
              </Badge>
            );
          })}
        </span>
      </Col>
    </Row>
  );
};

export default TodoItem;
