import Link from "next/link";

export default function NotFoundPage() {
  return (
    <>
      <div className="text-center m-10 flex flex-col gap-4">
        <h2>We don&apos;t have the page that you are looking for...</h2>
        <Link
          href={"/"}
          className="text-pink-300 hover:text-shadow-2xs hover:text-shadow-violet-800"
        >
          Head on home!
        </Link>
      </div>
    </>
  );
}
