import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login - Courverse",
  description: "Login to your Courverse account to access your courses and dashboard.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="card w-full max-w-md shadow-xl bg-base-200">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Login to Courverse</h2>
          <form>
            <div className="form-control">
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
            <div className="mt-4 flex justify-between">
              <Link href="/auth/forgot-password" className="link link-hover text-sm">
                Forgot Password?
              </Link>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="link link-hover">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
