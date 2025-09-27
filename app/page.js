// app/page.js
import { redirect } from "next/navigation";

export default function Home() {
  return (
    // <main className="p-6">
    //   <h1 className="text-2xl font-bold">Hello, World!</h1>
    // </main>
    redirect('/home')
  )
}
