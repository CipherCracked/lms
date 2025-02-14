import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
// ILlUs4HWUuxep3Bb

const Login = () => {
    const [loginInput, setLoginInput] = useState({ email: "", password: "" });
    const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });
    const [registerUser, { data: registerData, error: registerError, isLoading: registerIsloading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();
    const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();
    const navigate = useNavigate();
    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === 'signup') {
            setSignupInput({ ...signupInput, [name]: value });
        }
        else {
            setLoginInput({ ...loginInput, [name]: value });
        }
    }
    const handleSubmit = async(type) => {
        const inputData = type ==="signup"?signupInput:loginInput;
        const action = type ==="signup"?registerUser:loginUser;
        await action(inputData);
    }
    useEffect(() => {
        if (registerIsSuccess && registerData) {
            toast.success(registerData.message || "Sign Up successful");
        } else if (registerError) {
            toast.error(registerError.data?.message || "Sign Up Failed");
        }
    }, [registerIsSuccess, registerData, registerError]);
    
    useEffect(() => {
        if (loginIsSuccess && loginData) {
            toast.success(loginData.message || "Login successful");
            navigate("/");
        } else if (loginError) {
            toast.error(loginError.data?.message || "Login Failed");
        }
    }, [loginIsSuccess, loginData, loginError]);    
    return (
        <div className="flex items-center w-full justify-center mt-20">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign Up</CardTitle>
                            <CardDescription>
                                Create a new account and join our learning community.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    type="text"
                                    placeholder="eg. John Doe"
                                    required="true"
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    name="name"
                                    value={signupInput.name} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    placeholder="eg. johndoe@email.com"
                                    required="true"
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    name="email"
                                    value={signupInput.email} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    required="true"
                                    onChange={(e) => changeInputHandler(e, "signup")}
                                    name="password"
                                    value={signupInput.password} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={registerIsloading} onClick={() => handleSubmit('signup')}>
                                {
                                    registerIsloading?(
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait
                                        </>
                                    ):"Sign Up"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Enter your login credentials.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    placeholder="johndoe@email.com"
                                    required="true"
                                    onChange={(e) => changeInputHandler(e, "login")}
                                    name="email"
                                    value={loginInput.email} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    required="true"
                                    onChange={(e) => changeInputHandler(e, "login")}
                                    name="password"
                                    value={loginInput.password} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={loginIsLoading} onClick={() => handleSubmit('login')}>
                                {
                                    loginIsLoading?(
                                        <>
                                        <Loader2 classname="mr-2 h-4 w-4 animate-spin"/>Please Wait
                                        </>
                                    ):"Login"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
export default Login
