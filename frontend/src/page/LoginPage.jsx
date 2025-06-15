import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'
import {
  Code2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Zap,
  Shield,
  Infinity,
  Brain,
  Trophy,
  Target,
  Star
} from "lucide-react";
import { z } from "zod";

// Schema for login (no name)
const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema)
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await login(data); // Replace this with your actual login logic
      console.log("login data", data);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative '>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl animate-ping"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} className="w-full h-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full grid lg:grid-cols-2">
        {/* Left Side Branding (same as SignUp) */}
        <div className="hidden lg:flex flex-col justify-center items-center px-12 relative">
          <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl rotate-12 animate-float"></div>
          <div className="absolute bottom-32 right-16 w-12 h-12 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl -rotate-12 animate-float delay-500"></div>
          <div className="absolute top-1/3 right-32 w-8 h-8 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-lg rotate-45 animate-float delay-1000"></div>

          <div className="text-center text-white max-w-lg relative">
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300">
                <Code2 className="w-12 h-12 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Infinity className="w-3 h-3 text-white" />
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                CodeLoop
              </h1>
              <p className="text-xl text-slate-300 mb-12 font-light">
                Where algorithms meet <span className="text-blue-400 font-semibold">infinity</span>
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {[{
                icon: <Brain className="w-6 h-6 text-blue-400" />,
                title: "2000+ Premium Problems",
                subtitle: "From beginner to FAANG level"
              }, {
                icon: <Trophy className="w-6 h-6 text-purple-400" />,
                title: "Global Competitions",
                subtitle: "Compete with top coders worldwide"
              }, {
                icon: <Target className="w-6 h-6 text-green-400" />,
                title: "AI-Powered Solutions",
                subtitle: "Personalized learning paths"
              }].map((item, i) => (
                <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:from-white/10 hover:to-white/15 transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-slate-400">{item.subtitle}</p>
                  </div>
                  <Star className="w-5 h-5 text-yellow-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">100K+</div>
                <div className="text-sm text-slate-400">Active Coders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">50M+</div>
                <div className="text-sm text-slate-400">Solutions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">95%</div>
                <div className="text-sm text-slate-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center items-center px-6 lg:px-12 py-8 relative">
          {/* Mobile Logo */}
          <div className="text-center mb-8 lg:hidden">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl relative">
              <Code2 className="w-8 h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Infinity className="w-2 h-2 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">CodeLoop</h1>
            <p className="text-slate-300 text-sm mt-2">Join the coding revolution</p>
          </div>

          {/* Header */}
          <div className="text-center mb-8 hidden lg:block">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-slate-300">Login to your premium account</p>
          </div>

          {/* Form */}
          <div className="w-full max-w-md relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      type="email"
                      {...register("email")}
                      className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border-2 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300 ${
                        errors.email ? "border-red-400 focus:ring-red-500/50 focus:border-red-400" : "border-white/20 hover:border-white/30"
                      }`}
                      placeholder="your@email.com"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm flex items-center gap-2 animate-shake">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className={`w-full pl-12 pr-12 py-3.5 bg-white/5 border-2 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300 ${
                        errors.password ? "border-red-400 focus:ring-red-500/50 focus:border-red-400" : "border-white/20 hover:border-white/30"
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors z-10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm flex items-center gap-2 animate-shake">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-xl animate-gradient-x"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-2xl transform group-hover:scale-[1.02] group-active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Logging In...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        <span>Login to Your Account</span>
                        <Shield className="w-5 h-5 opacity-70" />
                      </>
                    )}
                  </div>
                </button>
              </form>

              {/* Footer */}
              <div className="text-center mt-8 pt-6 border-t border-white/10">
                <p className="text-slate-300">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors hover:underline"
                  >
                    Join now
                  </Link>
                </p>
              </div>

              {/* Trust Badge */}
              <div className="text-center mt-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-full border border-green-500/20">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">Trusted by 100K+ developers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
