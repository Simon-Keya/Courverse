import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up - Courverse",
  description: "Create an account on Courverse to start learning today.",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="card w-full max-w-md shadow-xl bg-base-200">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Sign Up for Courverse</h2>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="Enter your name" className="input input-bordered" />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="Enter your email" className="input input-bordered" />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="Enter your password" className="input input-bordered" />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
          </form>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="link link-hover">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
