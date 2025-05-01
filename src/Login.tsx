"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

function SignInForm() {
  const [values, setValues] = useState({
    refs: "",
  })
  const [error, setError] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChanges = (e: { target: { name: any; value: any } }) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    if (error) setError("")
    if (statusMessage) setStatusMessage("")
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setStatusMessage("")

    try {
      const response = await axios.post("http://localhost:3004/auth/login", values)

      if (response.status === 200) {
        const userData = response.data.user
        localStorage.setItem("user", JSON.stringify(userData))

        if (userData.type === "customer") {
          navigate("/household-owner")
        } else if (userData.type === "guard") {
          navigate("/guard")
        } else {
          navigate("/household-owner")
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 401) {
          setError("Invalid referral number")
        } else if (err.response.status === 404) {
          setError("User not found")
        } else {
          setError(err.response.data.message || "Login failed")
        }
      } else {
        setError("An unexpected error occurred")
        console.error(err)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <h2 className="text-2xl font-bold">Welcome Householder!</h2>
      <p className="mt-1 text-sm">Embrace the future of mapping with Deca Homes.</p>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {statusMessage && (
        <Alert className="mt-4 bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Account Status</AlertTitle>
          <AlertDescription className="text-yellow-700">{statusMessage}</AlertDescription>
        </Alert>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <Input
            type="password"
            name="refs"
            placeholder="Enter your reference number"
            className="h-12"
            onChange={handleChanges}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot referral number?
          </a>
        </div>

        <Button type="submit" className="h-12 w-full bg-blue-500 hover:bg-blue-600" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </motion.div>
  )
}

function Login() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left side with image and overlay text */}
      <div className="relative hidden md:block md:w-3/5">
        <img
          src="https://cdn.pixabay.com/photo/2025/02/24/19/54/moon-9428951_1280.jpg"
          className="h-full w-full object-cover"
          alt="Background"
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* Navigation */}
        <div className="absolute left-0 top-0 w-full p-6">
          <div className="flex items-center">
            <a href="#" className="text-xl font-bold text-white">
              Deca Homes Tunghaan Subdivision Mapping
            </a>
          </div>
        </div>

        {/* Overlay text */}
        <div className="absolute bottom-16 left-6 max-w-md">
          <h1 className="text-4xl font-bold text-white">The Art of Mapping</h1>
          <p className="text-gray-300 mt-5">
            "Mapping is both an art and a science, transforming geographic data into visually structured representations
            of spaces and communities. It plays a crucial role in urban planning, navigation, and development, ensuring
            efficient land use and connectivity"
          </p>
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex w-full flex-col p-8 md:w-2/5">
        <div className="mx-auto w-full max-w-md flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <SignInForm key="signin" />
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Login