import React, { useState, useEffect } from 'react'
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
  User,
  Zap,
  Trophy,
  Target,
  Brain,
  Star,
  Shield,
  Infinity,
  Check,
  Sparkles,
  Rocket,
  Gem
} from "lucide-react";
import { z } from "zod";

const SignUpSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  name: z.string().min(3, "Name must be at least 3 characters")
})

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema)
  })

  const password = watch('password', '');

  useEffect(() => {
    // Calculate password strength
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  }, [password]);

  useEffect(() => {
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await signup(data)
      console.log("signup data", data)
      setFormSubmitted(true);
    } catch (error) {
      console.error("SignUp failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const features = [
    {
      icon: <Brain className="w-6 h-6 text-blue-400" />,
      title: "2000+ Premium Problems",
      description: "From beginner to FAANG level",
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: <Trophy className="w-6 h-6 text-purple-400" />,
      title: "Global Competitions",
      description: "Compete with top coders worldwide",
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      icon: <Target className="w-6 h-6 text-green-400" />,
      title: "AI-Powered Solutions",
      description: "Personalized learning paths",
      color: "from-green-500/20 to-green-600/20"
    }
  ];

  return (
    <div className='h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden'>
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              opacity: Math.random() * 0.5 + 0.1,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow-delay" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl animate-ping-slow" />
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
        
        {/* Left Side - Premium Branding */}
        <div className="hidden lg:flex flex-col justify-center items-center px-12 relative">
          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl rotate-12 animate-float" />
          <div className="absolute bottom-32 right-16 w-12 h-12 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl -rotate-12 animate-float-delay" />
          <div className="absolute top-1/3 right-32 w-8 h-8 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-lg rotate-45 animate-float-delay-2" />
          
          <div className="text-center text-white max-w-lg relative">
            {/* Logo Section */}
            <div className="mb-8 relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-30 animate-pulse" />
              <div className="relative w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl transition-transform hover:scale-110 hover:rotate-2">
                <Code2 className="w-12 h-12 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Infinity className="w-3 h-3 text-white" />
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                CodeLoop
              </h1>
              <p className="text-xl text-slate-300 mb-12 font-light animate-fade-in-delay">
                Where algorithms meet <span className="text-blue-400 font-semibold">infinity</span>
              </p>
            </div>
            
            {/* Premium Features */}
            <div className="space-y-4 h-64 relative">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 transition-all duration-500 ${
                    activeFeature === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  } ${index === 0 ? 'animate-feature-in' : index === 1 ? 'animate-feature-in-delay' : 'animate-feature-in-delay-2'}`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                    {feature.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white">{feature.title}</p>
                    <p className="text-sm text-slate-400">{feature.description}</p>
                  </div>
                  <Star className="w-5 h-5 text-yellow-400 ml-auto transition-opacity group-hover:opacity-100" />
                </div>
              ))}
              
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`w-2 h-2 rounded-full transition-all ${activeFeature === index ? 'bg-white w-4' : 'bg-white/30'}`}
                  />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-6 animate-fade-in-stats">
              <div className="text-center transition-transform hover:-translate-y-1">
                <div className="text-3xl font-bold text-blue-400">100K+</div>
                <div className="text-sm text-slate-400">Active Coders</div>
              </div>
              <div className="text-center transition-transform hover:-translate-y-1">
                <div className="text-3xl font-bold text-purple-400">50M+</div>
                <div className="text-sm text-slate-400">Solutions</div>
              </div>
              <div className="text-center transition-transform hover:-translate-y-1">
                <div className="text-3xl font-bold text-green-400">95%</div>
                <div className="text-sm text-slate-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Premium Form */}
        <div className="flex flex-col justify-center items-center px-6 lg:px-12 py-8 relative">
          {/* Success Message */}
          {formSubmitted && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md text-center border border-white/10 shadow-2xl animate-scale-in">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-teal-400 flex items-center justify-center">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Welcome to CodeLoop!</h3>
                <p className="text-slate-300 mb-6">Your premium account has been created successfully.</p>
                <Link 
                  to="/dashboard" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl transition-transform hover:scale-105 active:scale-95"
                >
                  <Rocket className="w-5 h-5" />
                  Go to Dashboard
                </Link>
              </div>
            </div>
          )}

          {/* Mobile Logo */}
          <div className="text-center mb-8 lg:hidden">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl relative animate-fade-in">
              <Code2 className="w-8 h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Infinity className="w-2 h-2 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-fade-in-delay">
              CodeLoop
            </h1>
            <p className="text-slate-300 text-sm mt-2 animate-fade-in-delay-2">
              Join the coding revolution
            </p>
          </div>

          {/* Desktop Header */}
          <div className="text-center mb-8 hidden lg:block">
            <h2 className="text-3xl font-bold text-white mb-2 animate-fade-in">
              Join CodeLoop
            </h2>
            <p className="text-slate-300 animate-fade-in-delay">
              Create your premium account
            </p>
          </div>

          {/* Premium Form Container */}
          <div className="w-full max-w-md relative animate-fade-in-up">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
            
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Full Name
                  </label>
                  <div className="relative group transition-transform hover:-translate-y-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      type="text"
                      {...register("name")}
                      className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border-2 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300 ${
                        errors.name ? "border-red-400 focus:ring-red-500/50 focus:border-red-400" : "border-white/20 hover:border-white/30"
                      }`}
                      placeholder="Enter your full name"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
                  </div>
                  {errors.name && (
                    <div className="text-red-400 text-sm flex items-center gap-2 animate-shake">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      {errors.name.message}
                    </div>
                  )}              
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Email Address
                  </label>
                  <div className="relative group transition-transform hover:-translate-y-1">
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
                    <div className="text-red-400 text-sm flex items-center gap-2 animate-shake">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      {errors.email.message}
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-semibold text-white/90">
                      Password
                    </label>
                    {password && (
                      <div className="flex gap-1 animate-fade-in">
                        {[1, 2, 3, 4].map((i) => (
                          <div 
                            key={i}
                            className={`w-2 h-2 rounded-full ${i <= passwordStrength ? 
                              i <= 1 ? 'bg-red-400' : 
                              i <= 2 ? 'bg-yellow-400' : 
                              i <= 3 ? 'bg-blue-400' : 'bg-green-400' 
                              : 'bg-white/10'}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative group transition-transform hover:-translate-y-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className={`w-full pl-12 pr-12 py-3.5 bg-white/5 border-2 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300 ${
                        errors.password ? "border-red-400 focus:ring-red-500/50 focus:border-red-400" : "border-white/20 hover:border-white/30"
                      }`}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors z-10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
                  </div>
                  {errors.password && (
                    <div className="text-red-400 text-sm flex items-center gap-2 animate-shake">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      {errors.password.message}
                    </div>
                  )}
                  
                  {/* Password Requirements */}
                  {password && (
                    <div className="mt-2 text-xs text-slate-400 space-y-1 animate-fade-in-up">
                      <div className={`flex items-center gap-2 ${password.length >= 6 ? 'text-green-400' : 'text-slate-400'}`}>
                        <Check className={`w-3 h-3 ${password.length >= 6 ? 'opacity-100' : 'opacity-30'}`} />
                        <span>At least 6 characters</span>
                      </div>
                      <div className={`flex items-center gap-2 ${/[A-Z]/.test(password) ? 'text-green-400' : 'text-slate-400'}`}>
                        <Check className={`w-3 h-3 ${/[A-Z]/.test(password) ? 'opacity-100' : 'opacity-30'}`} />
                        <span>At least one uppercase letter</span>
                      </div>
                      <div className={`flex items-center gap-2 ${/[0-9]/.test(password) ? 'text-green-400' : 'text-slate-400'}`}>
                        <Check className={`w-3 h-3 ${/[0-9]/.test(password) ? 'opacity-100' : 'opacity-30'}`} />
                        <span>At least one number</span>
                      </div>
                      <div className={`flex items-center gap-2 ${/[^A-Za-z0-9]/.test(password) ? 'text-green-400' : 'text-slate-400'}`}>
                        <Check className={`w-3 h-3 ${/[^A-Za-z0-9]/.test(password) ? 'opacity-100' : 'opacity-30'}`} />
                        <span>At least one special character</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Premium Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group overflow-hidden transition-transform hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-xl animate-gradient-x"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-2xl transform group-hover:scale-[1.02] group-active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Creating Your Account...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 transition-transform group-hover:rotate-12" />
                        <span>Start Coding Journey</span>
                        <Sparkles className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </>
                    )}
                  </div>
                </button>
              </form>

              {/* Footer */}
              <div className="text-center mt-8 pt-6 border-t border-white/10 animate-fade-in-delay-3">
                <p className="text-slate-300">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>

              {/* Trust Badge */}
              <div className="text-center mt-6 animate-fade-in-delay-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-full border border-green-500/20">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">Trusted by 100K+ developers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-particle {
          0% { transform: translate(0, 0); }
          50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
          100% { transform: translate(0, 0); }
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.2); }
        }
        @keyframes pulse-slow-delay {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.3); }
        }
        @keyframes ping-slow {
          0% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.5); }
          100% { opacity: 0.05; transform: scale(1); }
        }
        @keyframes feature-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 7s ease-in-out infinite 0.5s;
        }
        .animate-float-delay-2 {
          animation: float 5s ease-in-out infinite 1s;
        }
        .animate-float-particle {
          animation: float-particle linear infinite;
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
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-fade-in-delay {
          animation: fadeIn 0.6s ease-out 0.2s forwards;
        }
        .animate-fade-in-delay-2 {
          animation: fadeIn 0.6s ease-out 0.4s forwards;
        }
        .animate-fade-in-delay-3 {
          animation: fadeIn 0.6s ease-out 0.6s forwards;
        }
        .animate-fade-in-delay-4 {
          animation: fadeIn 0.6s ease-out 0.8s forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.4s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slow-delay {
          animation: pulse-slow-delay 10s ease-in-out infinite 2s;
        }
        .animate-ping-slow {
          animation: ping-slow 12s ease-in-out infinite 1s;
        }
        .animate-feature-in {
          animation: feature-in 0.5s ease-out forwards;
        }
        .animate-feature-in-delay {
          animation: feature-in 0.5s ease-out 0.2s forwards;
        }
        .animate-feature-in-delay-2 {
          animation: feature-in 0.5s ease-out 0.4s forwards;
        }
        .animate-fade-in-stats {
          animation: fadeIn 0.6s ease-out 0.6s forwards;
        }
      `}</style>
    </div>
  )
}

export default SignUpPage