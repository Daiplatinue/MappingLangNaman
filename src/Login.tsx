import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function SignUpForm({ onToggle }: { onToggle: () => void }) {
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

            <form className="mt-6 space-y-4">
                <div>
                    <Input type="text" placeholder="First name" className="h-12" />
                </div>
                <div>
                    <Input type="text" placeholder="Last name" className="h-12" />
                </div>
                <div>
                    <Input type="email" placeholder="Email" className="h-12" />
                </div>
                <div>
                    <Input type="password" placeholder="Password" className="h-12" />
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
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        I agree to the Dropbox Terms
                    </label>
                </div>

                <Button type="submit" className="h-12 w-full bg-blue-500 hover:bg-blue-600">
                    Sign up
                </Button>

                <Button variant="outline" className="h-12 w-full border border-gray-300">
                    Sign up with Google
                </Button>
            </form>
        </motion.div>
    )
}

function SignInForm({ onToggle }: { onToggle: () => void }) {
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

            <form className="mt-6 space-y-4">
                <div>
                    <Input type="email" placeholder="Email" className="h-12" />
                </div>
                <div>
                    <Input type="password" placeholder="Password" className="h-12" />
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

                <Button type="submit" className="h-12 w-full bg-blue-500 hover:bg-blue-600">
                    Sign in
                </Button>

                <Button variant="outline" className="h-12 w-full border border-gray-300">
                    Sign in with Google
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
                    <p className="text-gray-300 mt-5">"Mapping is both an art and a science, transforming geographic data into visually structured representations of spaces and communities. It plays a crucial role in urban planning, navigation, and development, ensuring efficient land use and connectivity"</p>
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