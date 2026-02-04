import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <div>
        <p className="text-lg opacity-70">
          Looks like this Lynko took a wrong turn.
        </p>

        <p className="text-lg opacity-70">Let&rsquo;s get you back on track.</p>
      </div>

      <Link href="/" className="btn btn-primary">
        Take me home
      </Link>
    </div>
  );
}
