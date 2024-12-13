import Image from "next/image";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="text-lg">The page you are looking for does not exist.</p>
            <Image className="rounded-lg" src={"/notfound.gif"} alt="404" width={500} height={500} />
        </div>
    );
}