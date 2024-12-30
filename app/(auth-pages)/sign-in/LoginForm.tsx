'use client';

import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

// Separate submit button component to handle loading state
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            className="w-full"
            disabled={pending}
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                </>
            ) : (
                'Login'
            )}
        </Button>
    );
}

export function LoginForm({ message }: { message: Message }) {
    return (
        <form action={signInAction}>
            <div className="grid gap-6">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                className="text-xs text-foreground underline hover:text-primary"
                                href="/forgot-password"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                        />
                    </div>
                    <SubmitButton />
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <FormMessage message={message} />
            </div>
        </form>
    );
}