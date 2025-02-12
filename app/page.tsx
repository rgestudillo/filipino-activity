import Dashboard from "../components/Dashboard"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Wika Mo, Wika Ko: A Language Journey</h1>
      <p className="text-xl mb-8 text-center text-gray-600 dark:text-gray-400">
        Embark on a journey through the linguistic landscape of the Philippines. Discover how language shapes
        communication, education, and governance in this diverse archipelago.
      </p>
      <Dashboard />
    </main>
  )
}

