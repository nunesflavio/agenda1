import {Header} from "./components/header.tsx";
import {List} from "./components/list.tsx";

export function App() {
  return (
      <div className="max-w-[1216] mx-auto py-2 flex flex-col">

        <Header />
        <List />
      </div>
  )
}
