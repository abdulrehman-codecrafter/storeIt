"use client";
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { createAccount } from "@/lib/actions/user.actions";
import OTPModal from './OTPModal';
const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "FullName must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email.",
    }),
});

export default function AuthForm({ type }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [accountId,setAccountId]=useState(null)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
        },
    });

    const onSubmit = async (values) => {
        setLoading(true);
        setErrorMessage(null);

        try{
            const user=await createAccount({
                fullName:values.fullName || "",
                email:values.email
            })
            setAccountId(user.accountId)
            console.log("request send")
            
        } catch (error) {
            setErrorMessage("Failed to create account");
            
        }
        finally{
            setLoading(false);
        }

    };
    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 auth-form"
                >
                    <h1 className="h1 text-center">
                        {type === "sign-in" ? "Sign In" : "Sign Up"}
                    </h1>
                    {type === "sign-up" && (
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="shad-form-item ">
                                            <FormLabel className="shad-form-label body-2">
                                                Full Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your full name"
                                                    {...field}
                                                    className="shad-input"
                                                />
                                            </FormControl>
                                        </div>

                                        <FormMessage className="shad-form-message body-2" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="shad-form-item ">
                                            <FormLabel className="shad-form-label body-2">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your email"
                                                    {...field}
                                                    className="shad-input"
                                                />
                                            </FormControl>
                                        </div>

                                        <FormMessage className="shad-form-message body-2" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {type === "sign-in" && (
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="shad-form-item ">
                                            <FormLabel className="shad-form-label body-2">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your email"
                                                    {...field}
                                                    className="shad-input"
                                                />
                                            </FormControl>
                                        </div>

                                        <FormMessage className="shad-form-message body-2" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="text-white primary-btn rounded-xl body-2 h-10"
                    >
                        {loading && (
                            <Loader2 size={20} className="animate-spin" />
                        )}

                        {type === "sign-in" ? "Sign In" : "Sign Up"}
                    </Button>
                    {errorMessage && (
                        <p className="error-message body-2">{errorMessage}</p>
                    )}

                    <div className="body-2 flex justify-center gap-1">
                        <p className="text-light-100">
                            {type === "sign-in"
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </p>
                        <Link
                            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                        >
                            <p className="text-brand-100">{type === "sign-in" ? "Sign Up" : "Sign In"}</p>
                        </Link>
                    </div>
                </form>
            </Form>
            {accountId && <OTPModal email={form.getValues('email')} accountId={accountId} />}
        </>
    );
}
