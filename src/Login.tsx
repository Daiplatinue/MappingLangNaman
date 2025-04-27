import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

function SignUpForm({ onToggle }: { onToggle: () => void }) {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChanges = (e: { target: { name: any; value: any } }) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    if (error) setError("")
  }

  const handleSumbit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    if (values.password !== values.confirm_password) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/register", values)
      if (response.status === 201) {
        setSuccess(
          "Registration successful! Please wait while your account is being processed. We'll notify you when it's activated.",
        )

        setValues({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirm_password: "",
        })

        setTimeout(() => {
          onToggle()
        }, 5000)
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 409) {
          setError("Email already exists. Please use a different email or sign in.")
        } else {
          setError(err.response.data.message || "Registration failed")
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
      <h2 className="text-2xl font-bold">Sign up</h2>
      <p className="mt-1 text-sm">
        or{" "}
        <button onClick={onToggle} className="text-blue-600 hover:underline">
          sign in to your account
        </button>
      </p>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mt-4 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">{success}</AlertDescription>
        </Alert>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSumbit}>
        <div>
          <Input
            type="text"
            name="firstname"
            placeholder="First name"
            className="h-12"
            onChange={handleChanges}
            value={values.firstname}
            required
          />
        </div>
        <div>
          <Input
            type="text"
            name="lastname"
            placeholder="Last name"
            className="h-12"
            onChange={handleChanges}
            value={values.lastname}
            required
          />
        </div>
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="h-12"
            onChange={handleChanges}
            value={values.email}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="h-12"
            onChange={handleChanges}
            value={values.password}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            className="h-12"
            onChange={handleChanges}
            value={values.confirm_password}
            required
          />
        </div>

        <div className="text-xs text-gray-600">
          This page is protected by reCAPTCHA, and subject to the Google{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>
          .
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the Dropbox Terms
          </label>
        </div>

        <Button
          type="submit"
          className="h-12 w-full bg-blue-500 hover:bg-blue-600"
          disabled={loading || success !== ""}
        >
          {loading ? "Signing up..." : "Sign up"}
        </Button>
      </form>
    </motion.div>
  )
}

function SignInForm({ onToggle }: { onToggle: () => void }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
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
      const response = await axios.post("http://localhost:3000/auth/login", values)

      if (response.status === 200) {
        const userData = response.data.user

        if (userData.status === "pending") {
          setStatusMessage("Your account is still being processed. Please wait for activation.")
          setLoading(false)
          return
        } else if (userData.status === "inactive") {
          setStatusMessage("Your account has been deactivated. Please contact support for assistance.")
          setLoading(false)
          return
        } else if (userData.status === "active") {
          localStorage.setItem("user", JSON.stringify(userData))
          navigate("/household-owner")
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 401) {
          setError("Invalid email or password")
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
      <h2 className="text-2xl font-bold">Sign in</h2>
      <p className="mt-1 text-sm">
        or{" "}
        <button onClick={onToggle} className="text-blue-600 hover:underline">
          create a new account
        </button>
      </p>

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
          <Input type="email" name="email" placeholder="Email" className="h-12" onChange={handleChanges} required />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            placeholder="Password"
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
            Forgot password?
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
  const [isSignIn, setIsSignIn] = useState(false)

  const toggleForm = () => {
    setIsSignIn(!isSignIn)
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left side with image and overlay text */}
      <div className="relative hidden md:block md:w-3/5">
        <img
          src="https://cdn.pixabay.com/photo/2023/09/01/18/02/eyeglasses-8227429_1280.jpg"
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
            {isSignIn ? (
              <SignInForm key="signin" onToggle={toggleForm} />
            ) : (
              <SignUpForm key="signup" onToggle={toggleForm} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Login