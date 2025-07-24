import { Component } from '@angular/core';
// import { Book } from '../models/book.model'; // <- use this if you already have the interface in models/

// If you don't already have a Book interface, uncomment this:
export interface Book {
  id: number;
  title: string;
  author: string;
}


const STORAGE_KEY = 'books';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent {

title: string = '';
author: string = '';
books: Book[] = [];

ngOnInit(): void {
    this.books = this.getAllBooks(); // load once on init
  }

/**
   * 1) Add a book to localStorage
   */
  addBook(): void {
    const title = this.title.trim();
    const author = this.author.trim();
    if (!title || !author) {
      return;
    }

    const newBook: Book = {
      id: Date.now(), // simple unique id
      title,
      author,
    };

    const books = this.getAllBooks();
    books.push(newBook);
    this.saveAll(books);

    // update local state + reset form
    this.books = books;
    this.title = '';
    this.author = '';
  }

  /**
   * 2) Retrieve all books from localStorage
   */
  getAllBooks(): Book[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Book[]) : [];
    } catch {
      return [];
    }
  }

    /**
   * 3) Delete a book from localStorage
   */
  deleteBook(id: number): void {
    const books = this.getAllBooks().filter(b => b.id !== id);
    this.saveAll(books);
    this.books = books;
  }

  /** Helper to persist */
  private saveAll(books: Book[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }


}
