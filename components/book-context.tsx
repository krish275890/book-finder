"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Book = {
  id: number
  title: string
  author: string
  category: string
  coverImage: string
  description: string
}

// Hardcoded book data
const books: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic",
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "A story of wealth, love, and the American Dream in the 1920s.",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Classic",
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "A powerful story about racial inequality and moral growth in the American South.",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    category: "Dystopian",
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "A dystopian novel about totalitarianism, surveillance, and thought control.",
  },
  {
    id: 4,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "A fantasy adventure about a hobbit who joins a quest to reclaim a treasure from a dragon.",
  },
  {
    id: 5,
    title: "Dune",
    author: "Frank Herbert",
    category: "Science Fiction",
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "An epic science fiction novel set in a distant future amid a feudal interstellar society.",
  },
  {
    id: 6,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Romance",
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "A romantic novel about the emotional development of Elizabeth Bennet.",
  },
  {
    id: 7,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "A philosophical novel about a shepherd boy's journey to find a treasure.",
  },
  {
    id: 8,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "Non-Fiction",
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "A brief history of humankind, exploring the evolution of Homo sapiens.",
  },
]

type BookContextType = {
  filteredBooks: Book[]
  searchTerm: string
  selectedCategory: string
  setSearchTerm: (term: string) => void
  setSelectedCategory: (category: string) => void
  categories: string[]
}

const BookContext = createContext<BookContextType | undefined>(undefined)

export function BookProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  // Extract unique categories
  const categories = ["All", ...new Set(books.map((book) => book.category))]

  // Filter books based on search term and category
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "" || selectedCategory === "All" || book.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <BookContext.Provider
      value={{
        filteredBooks,
        searchTerm,
        selectedCategory,
        setSearchTerm,
        setSelectedCategory,
        categories,
      }}
    >
      {children}
    </BookContext.Provider>
  )
}

export function useBooks() {
  const context = useContext(BookContext)
  if (context === undefined) {
    throw new Error("useBooks must be used within a BookProvider")
  }
  return context
}

