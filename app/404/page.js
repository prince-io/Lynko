import Link from "next/link";
import NotFoundAnimation from "@/components/shared/NotFoundAnimation";

export default function NotFoundPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-6 text-center px-6 py-10 md:p-16 rounded-xl bg-base-200">
        <NotFoundAnimation />
        <div className="py-2">
          <p className="text-sm md:text-lg">
            Looks like this Lynko took a wrong turn.
          </p>

          <p className="text-sm md:text-lg">
            Let&rsquo;s get you back on track.
          </p>
        </div>

        <Link href="/" className="btn btn-primary">
          Take me home
        </Link>
      </div>
    </div>
  );
}
