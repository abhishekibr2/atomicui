import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";


export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 w-full p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          IBR Infotech
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>
                Login with your Apple or Google account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input name="email" placeholder="you@example.com" required />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          className="text-xs text-foreground underline"
                          href="/forgot-password"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <Input id="password" name="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full" formAction={signInAction}>
                      Login
                    </Button>
                  </div>
                </div>
              </form>
              <div className="flex flex-col gap-2">
                <FormMessage message={searchParams} />
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </ div>
  );
}
