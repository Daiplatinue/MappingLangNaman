import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

function SignInForm({ onSwitchToRegister }: { onSwitchToRegister: () => void }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [loading, setLoading] = useState(false)

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

        // Navigate based on user type
        window.location.href = userData.type === "guard" ? "/guard" : "/household-owner"
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
            type="email"
            name="email"
            placeholder="Enter your email"
            className="h-12"
            onChange={handleChanges}
            required
          />
        </div>

        <div>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
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

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button type="button" onClick={onSwitchToRegister} className="text-blue-600 hover:underline">
              Register
            </button>
          </p>
        </div>
      </form>
    </motion.div>
  )
}

function RegisterForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChanges = (e: { target: { name: any; value: any } }) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    if (error) setError("")
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await axios.post("http://localhost:3004/auth/register", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      })

      if (response.status === 201) {
        // Registration successful, switch to login
        onSwitchToLogin()
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Registration failed")
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
      <h2 className="text-2xl font-bold">Create an Account</h2>
      <p className="mt-1 text-sm">Join the Deca Homes community today.</p>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="h-12"
            onChange={handleChanges}
            required
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="h-12"
            onChange={handleChanges}
            required
          />
        </div>

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

        <div>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="h-12"
            onChange={handleChanges}
            required
          />
        </div>

        <Button type="submit" className="h-12 w-full bg-blue-500 hover:bg-blue-600" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button type="button" onClick={onSwitchToLogin} className="text-blue-600 hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </form>
    </motion.div>
  )
}

function Login() {
  const [isLogin, setIsLogin] = useState(true)

  const switchToRegister = () => {
    setIsLogin(false)
  }

  const switchToLogin = () => {
    setIsLogin(true)
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left side with image and overlay text */}
      <div className="relative hidden md:block md:w-3/5">
        <img
          src="https://cdn.pixabay.com/photo/2022/07/10/19/30/house-7313645_1280.jpg"
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
            {isLogin ? (
              <SignInForm key="signin" onSwitchToRegister={switchToRegister} />
            ) : (
              <RegisterForm key="register" onSwitchToLogin={switchToLogin} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Login