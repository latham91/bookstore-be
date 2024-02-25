# Bookstore API

## Clients guidelines

An imaginary client has tasked me to create the API for his bookstore, he requires a content management system (CMS) in which he can add new books into his library, he also requires the ability to update or delete any books if he wishes.

Inside his system he wants to be able to search for any books within his system, and also filter books by Author and Genre.

He would also like clients to be able to sign up to his bookstore website and be able to 'like' any books in his library, this would purely be for statistical reasons. Clients should be able to update their information or delete their account if they choose to.

## Schemas required

These are the required schema models that need to be created for the functionality the client needs.

-   **User Schema**

    -   username
    -   email
    -   password (hashed)
    -   likes (references: Like)
    -   role ('user' or 'admin')

---

-   **Author Schema**

    -   name
    -   books (references: Book)

---

-   **Genre Schema**

    -   name
    -   books (references: Book)

---

-   **Book Schema**

    -   title
    -   description
    -   genre (references: Genre)
    -   author (references: Author)
    -   likes (references: Like)

---

-   **Like Schema**

    -   user (references: User)
    -   book (references: Book)

## Routes

**User routes**

-   [x] /api/users | **_GET - returns all users_**
-   [x] /api/users/signup | **_POST - creates new user_**
-   [x] /api/users/signin | **_POST - logs in user_**
-   [ ] /api/users/:userId | **_GET - returns single user_**

**Book routes**

-   [x] /api/books | **_GET - returns all books_**
-   [x] /api/books/add | **_POST - adds new book_**
-   [ ] /api/books/:bookId | **_GET - returns single book_**

**Author routes**

-   [x] /api/authors | **_GET - returns all authors_**
-   [x] /api/authors/add | **_POST - adds new author_**
-   [ ] /api/authors/:authorId | **_GET - returns author and their books_**

**Genre routes**

-   [x] /api/genres | **_GET - returns all genres_**
-   [x] /api/genres/add | **_POST - adds new genre_**
-   [ ] /api/genres/:genreId | **_GET - returns genre and related books_**

**Like routes**

-   [ ] /api/likes/:bookId | **_GET - returns likes for book_**
-   [ ] /api/likes/:bookId | **_POST - adds/removes like_**
