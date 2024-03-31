package main

import (
	"net/http"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Todo struct {
	Text string `json:"text"`
	Done bool   `json:"done"`
	Id   int8   `json:"id"`
}

var MockTodos = []Todo{
	{Id: 0, Text: "Buy milk", Done: false},
	{Id: 1, Text: "Buy eggs", Done: true},
	{Id: 2, Text: "Buy bread", Done: false},
}

func GetTodos(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, MockTodos)
}

func PostTodos(c *gin.Context) {
	var todo Todo

	if err := c.BindJSON(&todo); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	todo.Id = int8(len(MockTodos))

	MockTodos = append(MockTodos, todo)
	c.IndentedJSON(http.StatusCreated, todo)
}

func DeleteTodo(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 8)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	for i, todo := range MockTodos {
		if todo.Id == int8(id) {
			MockTodos = append(MockTodos[:i], MockTodos[i+1:]...)
			c.IndentedJSON(http.StatusNoContent, nil)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
}

func UpdateTodo(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 8)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var todo Todo
	if err := c.BindJSON(&todo); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	for i, t := range MockTodos {
		if t.Id == int8(id) {
			MockTodos[i].Done = todo.Done
			c.IndentedJSON(http.StatusOK, todo)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
}

func main() {
	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"}
	router.Use(cors.New(config))

	router.GET("/todos", GetTodos)
	router.POST("/todos", PostTodos)
	router.DELETE("/todos/:id", DeleteTodo)
	router.PUT("/todos/:id", UpdateTodo)

	router.Run("localhost:8080")
}
