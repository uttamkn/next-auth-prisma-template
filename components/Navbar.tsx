import { auth } from "@/lib/auth";
import Link from "next/link";

import Image from "next/image";
import Logout from "./Logout";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="flex w-full items-center border-b">
      <div className="my-4 flex w-full items-center justify-between">
        <Link className="font-bold" href="/">
          Home
        </Link>

        <div className="flex items-center gap-x-5">
          <Link href="/dashboard">Dashboard</Link>
        </div>

        <div className="flex items-center gap-x-5">
          {!session?.user ? (
            <Link href="/sign-in">
              <div className="rounded-sm bg-blue-600 px-4 py-2 text-sm text-white">
                Login
              </div>
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-x-2 text-sm">
                {session?.user?.name}
                {session?.user?.image && (
                  <Image
                    className="rounded-full"
                    width={30}
                    height={30}
                    alt="User Avatar"
                    src={session?.user?.image || ""}
                  />
                )}
              </div>
              <Logout />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
