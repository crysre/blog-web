"use client"

import { signIn } from "next-auth/react"

export default function Login(){
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const res = await signIn("credentials",{
            email: formData.get("email"),
            passworrd: formData.get("password"),
            redirect: false,
        })

        if(res?.ok){
            window.location.href = "/"
        }else{
            alert("Invalid credentials")
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center">
  <div className="w-full max-w-sm p-6">
    <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border rounded px-3 py-2"
      />

      <button
        type="submit"
        className="w-full bg-gray-900 text-white py-2 cursor-pointer"
      >
        Login
      </button>
    </form>
  </div>
</div>
    )
}