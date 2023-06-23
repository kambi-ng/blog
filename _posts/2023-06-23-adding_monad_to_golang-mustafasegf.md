---
title: "Adding Monad To Golang"
description: Adding simple monad to remove accident nil access access and if err
date: "2023-06-23"
image: "/assets/images/adding_monad_to_golang.png"
author: mustafasegf
---

I've coded in Rust and enjoy the algebraic data type that Rust has. There's no null, I don't need to try catch, and there's a syntax for early return. But as much as I love rust, it's a hard language to learn. You need to understand borrow checker use arc mutex to share database connection between async. Right now, there are not a lot of jobs out there that use rust. Especially for web development.

### Why don't use golang?

Right now, golang jobs out there have increased a lot in the DevOps space and also in the web development space. Golang is simple, I bet it'll take you less than 1 week to get productive in it. Golang also uses garbage collector and I don't need to think about the borrow checker rule. **_But..._** golang doesn't have a strong type system. It has null as a value, doesn't have an algebraic data type, and doesn't have an option and result. This might look like I'm being petty but trust me. Debugging null pointer in golang is not fun if you have a recursive data structure (taken from real-life experience).

### Can't we make it better?

Before golang 1.18, this problem has a hard solution. Since golang doesn't have generic, we couldn't make a generic container that could accept any type. We could use `interface{}` or reflection, but we'll lose the strict type and incur a runtime performance penalty.

But fear no more. In golang 1.18, they introduce generic. Horray 🎉. Now we could make a simple container that could accept generic type.

### Let's add option and result to golang

now, we could make a simple struct for the option like this

```go
type Option[T any] struct {
    value T
    isSome bool
}
```

and we could make one for result like this

```go
type Result[T any] struct {
    value T
    err error
    isErr bool
}
```
after that, we just need to implement map, getter, unwrap, and constructor right? well... yeah but that's tedious and thankfully there's already a good golang package called [`samber/mo`](https://github.com/samber/mo) that already implements most of the stuff that we need.

Now let's try to make a simple http server.

### Http server example without monad

```go
package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/jellydator/validation"
	"github.com/jellydator/validation/is"
	_ "github.com/mattn/go-sqlite3"
)

type User struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (u User) Validate() error {
	return validation.ValidateStruct(&u,
		validation.Field(&u.Name, validation.Required, validation.Length(1, 255)),
		validation.Field(&u.Email, validation.Required, is.Email),
		validation.Field(&u.Password, validation.Required, validation.Length(8, 255)),
	)
}

var db *sql.DB

func init() {
	var err error
	db, err = sql.Open("sqlite3", "./user.db")
	if err != nil {
		panic(err)
	}

	const create string = `
  CREATE TABLE IF NOT EXISTS users (
		id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
		name TEXT,
		email TEXT,
		password TEXT
  );`
	if _, err := db.Exec(create); err != nil {
		panic(err)
  }
}

func main() {
	fmt.Println("starting server in port 3000 ")

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Post("/", handler)

	http.ListenAndServe(":3000", r)
}

func handler(w http.ResponseWriter, r *http.Request) {
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if err := user.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err = db.Exec("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", user.Name, user.Email, user.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Write([]byte("success"))
}
```

this is a basic golang http server that does db migration and http post requests. As you can see, golang needs to check on the error, and if it's an error then we need to early return it. If we don't check the error, the value of `user` will be `nil`.

now, let's try with result and option

### http server example with monad

```go
package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/jellydator/validation"
	"github.com/jellydator/validation/is"
	_ "github.com/mattn/go-sqlite3"
	. "github.com/samber/mo"
)

type User struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (u User) Validate() error {
	return validation.ValidateStruct(&u,
		validation.Field(&u.Name, validation.Required, validation.Length(1, 255)),
		validation.Field(&u.Email, validation.Required, is.Email),
		validation.Field(&u.Password, validation.Required, validation.Length(8, 255)),
	)
}

var db *sql.DB

func init() {
	const create string = `
 CREATE TABLE IF NOT EXISTS users (
		id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
		name TEXT,
		email TEXT,
		password TEXT
 );`

	db = TupleToResult(sql.Open("sqlite3", "./user.db")).
		Map(func(db *sql.DB) (*sql.DB, error) {
			_, err := db.Exec(create)
			return db, err
		}).
		MapErr(func(err error) (*sql.DB, error) {
			panic(err)
		}).MustGet()
}

func main() {
	fmt.Println("starting server in port 3000 ")

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Post("/", handler)

	http.ListenAndServe(":3000", r)
}

func handler(w http.ResponseWriter, r *http.Request) {
	user := Try(func() (Option[User], error) {
		var user User
		err := json.NewDecoder(r.Body).Decode(&user)
		return Some(user), err
	}).Map(func(user Option[User]) (Option[User], error) {
		return user, user.MustGet().Validate()
	})

	if user.IsError() {
		http.Error(w, user.Error().Error(), http.StatusBadRequest)
		return
	}

	user.Map(func(user Option[User]) (Option[User], error) {
		u := user.MustGet()
		_, err := db.Exec("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", u.Name, u.Email, u.Password)
		return user, err
	}).Match(
		func(user Option[User]) (Option[User], error) {
			w.Write([]byte("success"))
			return user, nil
		},
		func(err error) (Option[User], error) {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return None[User](), err
		},
	)
}
```

At first glance, this looks much more cluttered. The reason why is because golang right now doesn't have a lightweight anonymous function declaration. There's an [ongoing proposal](https://github.com/golang/go/issues/21498) for it. But it looks like it won't be approved anytime soon.

Ignoring the extra mess that the unneeded type in the anonymous function gives, this flow is much nicer than the non-monad version. The `user` variable is parsed from json and it could error out. After that, we want to validate it. Since we use option and `Map` function, the validation only runs if user option is not empty. This way we don't need to error check if the decoding failed or not. Now, the reason why I check `if user.IsError()` is because I want to return with http.StatusBadRequest. In the next post on this blog, we'll explore the idea of using Enum, or in `samber/mo` package called Either. But for this demonstration, we will just error check it.

At the end of the function, we just match if the user has an error out or not. If it errors out then we write the http response with `internal server error` and if it's successful then we write with success. This way we can code the happy path first and we deal with the error out later.

### It's ugly but hey it have a nicer flow

Of course, this is a much worst developer experience compared to Rust where they have native support for this. It also looks ugly compared to just error checking. But I would argue that this is a much nicer flow compared to checking `nil` and `err` every time.
