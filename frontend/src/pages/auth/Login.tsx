import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type Props = {};

const Login = ({}: Props) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    /**
    |--------------------------------------------------
    | Use Service Layer Pattern for API calls
    |--------------------------------------------------
    */
    try {
      const response = await authService.login(values);
      console.log("logged in response :", response);
      toast.success("Login successfull.");
    } catch (error: any) {
      console.log(
        "error in login ",
        error.message || "Login failed. Please try again."
      );
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex w-full bg-background h-[calc(100vh-64px)] overflow-auto p-8">
      <div className="md:w-1/3 hidden md:flex md:flex-col md:items-center justify-center border-r-2">
        <div className="">
          <span className="text-textLight text-2xl font-serif">
            Join our community
          </span>
        </div>
      </div>
      <div className="md:w-2/3 w-full ">
        {/* not a member ? sign up */}
        <div className="absolute md:top-[64px] md:right-8 bottom-6 ">
          <span className="text-textLight">
            Not a member ?{" "}
            <Link to="/register" className="underline">
              Register
            </Link>
          </span>
        </div>

        <div className="sm:w-2/3 md:w-1/3 w-full mx-auto flex flex-col gap-4 md:mt-[15%] mt-[25%]">
          {/* Title */}
          <h1 className="lg:text-3xl md:text-2xl sm:text-2xl text-textLight">
            Log in to Uncharted Trails.
          </h1>
          {/* form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="*********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-4 bg-primary hover:bg-secondary text-textLight font-semibold py-2 rounded-md transition"
              >
                Log In
              </Button>
            </form>
          </Form>
          {/* <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-mutetColor">
                User Name
              </label>
              <input
                type="text"
                className="px-4 py-2 rounded-md border-none focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-mutetColor">
                Password
              </label>
              <input
                type="text"
                className="px-4 py-2 rounded-md border-none focus:outline-none"
              />
            </div>
          </div> */}
          {/* <button className="w-full mt-2 bg-primary hover:bg-secondary text-textLight font-semibold py-2 rounded-md transition">
            Log In
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
