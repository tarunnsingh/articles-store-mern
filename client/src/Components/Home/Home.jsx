import React, { useEffect, useState } from "react";
import classes from "./Home.module.css";
import articleServices from "../../Services/TodoService";
import {
  Card,
  Badge,
  InputGroup,
  FormControl,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import searchService from "../../Services/SearchService";

function Home() {
  const [articles, setArticles] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    articleServices.getArticlesOnHomePage().then((res) => {
      let fetchedArticles = res.todos;
      // console.log(fetchedArticles);
      setArticles(fetchedArticles);
    });
  }, []);

  const onSearchType = (e) => {
    setSearchText(e.target.value);
    // console.log(searchText);
  };
  const handleSearch = (e) => {
    setSearching(true);
    e.preventDefault();
    searchService
      .searchTags(searchText)
      .then((res) => {
        if (res.message) {
          // HANDLE THIS WITH MESSAGE
          console.log(res.message.msgBody);
        }
        let fetchedArticles = res.todos;
        // console.log(fetchedArticles);
        Array.prototype.reverse.call(fetchedArticles);
        setArticles(fetchedArticles);
        setSearching(false);
      })
      .catch((error) => {
        // console.log(error);
        setSearching(false);
      });
  };
  return (
    <div className={classes.container}>
      <Form onSubmit={handleSearch}>
        <InputGroup className="mb-3 mt-3">
          <FormControl
            placeholder="Search articles by tags (Type a tag and Click Search)..."
            aria-label="search"
            aria-describedby="search"
            onChange={onSearchType}
          />
          <InputGroup.Append>
            <Button type="submit" variant="outline-primary">
              Search
            </Button>
            <Button href="/" variant="outline-secondary">
              Reset
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      {articles && <span>Article Count: {articles.length}</span>}
      {searching ? (
        <Spinner animation="border" />
      ) : (
        <div>
          {articles ? (
            articles.map((article) => {
              return (
                <Card key={article._id} className={classes.card}>
                  <Card.Header>Article</Card.Header>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p> {article.name} </p>
                      <footer className="blockquote-footer">
                        included tags{" "}
                        <cite title="Source Title">
                          {article.tags.map((tag, idx) => {
                            return (
                              <Badge
                                pill
                                variant="secondary"
                                key={idx}
                                style={{
                                  marginLeft: "0.5rem",
                                  fontSize: "1em",
                                }}
                              >
                                {" "}
                                {tag}{" "}
                              </Badge>
                            );
                          })}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBlock: "10%",
              }}
            >
              <Spinner
                style={{
                  fontSize: "0.4rem",
                  height: "5rem",
                  width: "5rem",
                }}
                animation="border"
                variant="primary"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
