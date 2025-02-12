import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Demographics from "@/components/Demographics"
import Questions from "@/components/Questions"
import Insights from "@/components/Insights"
import Responses from "@/components/Responses"
import Chatbot from "@/components/Chatbot"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      {/* Header */}
      <header className="w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-black dark:text-white">
            Wika Mo, Wika Ko, Pero Bakit Parang Hindi Tayo
          </h1>
          <p className="text-xl mt-4 text-center text-gray-800 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Samahan kami sa isang paglalakbay sa mundo ng wika sa Pilipinas, kung saan ang bawat tinig ay may
            kuwento at ang bawat wika ay bahagi ng ating mayamang kultura.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Tabs defaultValue="demographics" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <TabsTrigger
              value="demographics"
              className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800
                data-[state=active]:bg-black data-[state=active]:text-white 
                dark:data-[state=active]:bg-white dark:data-[state=active]:text-black
                transition-colors whitespace-nowrap"
            >
              Demograpiko
            </TabsTrigger>
            <TabsTrigger
              value="questions"
              className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800
                data-[state=active]:bg-black data-[state=active]:text-white 
                dark:data-[state=active]:bg-white dark:data-[state=active]:text-black
                transition-colors whitespace-nowrap"
            >
              Mga Tanong
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800
                data-[state=active]:bg-black data-[state=active]:text-white 
                dark:data-[state=active]:bg-white dark:data-[state=active]:text-black
                transition-colors whitespace-nowrap"
            >
              Mga Pananaw
            </TabsTrigger>
            <TabsTrigger
              value="responses"
              className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800
                data-[state=active]:bg-black data-[state=active]:text-white 
                dark:data-[state=active]:bg-white dark:data-[state=active]:text-black
                transition-colors whitespace-nowrap"
            >
              Mga Tugon
            </TabsTrigger>
          </TabsList>
          <TabsContent value="demographics">
            <Demographics />
          </TabsContent>
          <TabsContent value="questions">
            <Questions />
          </TabsContent>
          <TabsContent value="insights">
            <Insights />
          </TabsContent>
          <TabsContent value="responses">
            <Responses />
          </TabsContent>
          <TabsContent value="chatbot">
            <Chatbot />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
                Tungkol sa Proyekto
              </h3>
              <p className="text-gray-800 dark:text-gray-200">
                Isang pananaliksik tungkol sa paggamit ng wika sa iba't ibang aspeto ng buhay ng mga Pilipino.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
                Mga Mananaliksik
              </h3>
              <ul className="text-gray-800 dark:text-gray-200">
                <li> Amamangpang, Theresse Faith</li>
                <li> Atillo, Princess Ethel</li>
                <li> Estudillo, Refino Kashi Kyle</li>
                <li> Gerzon, Yzere Ericka Joy</li>
                <li> Igot, Leanne Gabrielle</li>

              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
                <br></br>
              </h3>
              <ul className="text-gray-800 dark:text-gray-200">
                <li>  Lagumbay, Jhoanna Rica</li>
                <li> Lahaylahay, Dunn Dexter</li>
                <li>  Mozo, Donna Mae</li>
                <li>  Rosal, April Jane</li>
                <li>  Rufila, Arianna Andrei</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-gray-800 dark:text-gray-200">
              © Wika Mo, Wika Ko, Pero Bakit Parang Hindi Tayo
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

