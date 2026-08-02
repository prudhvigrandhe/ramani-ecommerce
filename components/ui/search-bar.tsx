import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

      <input
        placeholder="Search products..."
        className="w-full rounded-full border pl-10 pr-4 py-2 outline-none focus:border-[#5B214B]"
      />
    </div>
  )
}