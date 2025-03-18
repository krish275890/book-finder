"use client"

import { useBooks } from "./book-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function BookGrid() {
  const { filteredBooks } = useBooks()

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No books found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredBooks.map((book) => (
        <Card key={book.id} className="overflow-hidden flex flex-col h-full transition-all hover:shadow-lg">
          <div className="relative h-[200px] w-full bg-muted">
            <Image src={book.coverImage || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
          </div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="line-clamp-1">{book.title}</CardTitle>
              <Badge variant="outline">{book.category}</Badge>
            </div>
            <CardDescription>{book.author}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-3">{book.description}</p>
          </CardContent>
          <CardFooter className="pt-2">
            <div className="flex justify-between items-center w-full">
              <Badge variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
                Add to Favorites
              </Badge>
              <span className="text-xs text-muted-foreground">ID: {book.id}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

