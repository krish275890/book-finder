import BookGrid from "@/components/book-grid"
import SearchBar from "@/components/search-bar"
import { BookProvider } from "@/components/book-context"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">BookFinder</h1>
        <p className="text-muted-foreground text-center mb-8">Discover your next favorite book</p>

        <BookProvider>
          <SearchBar />
          <BookGrid />
        </BookProvider>
      </div>
    </main>
  )
}

