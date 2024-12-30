import { GalleryVerticalEnd } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Message } from "@/components/form-message";
import { LoginForm } from "./LoginForm";

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
              <LoginForm message={searchParams} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}