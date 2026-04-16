import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { apiLogin } from "../api";
import { useAuthStore } from "../store/authStore";

interface LoginForm {
  username: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setServerError("");
    setIsLoading(true);
    try {
      const result = await apiLogin(data.username, data.password);
      if ("ok" in result) {
        login(result.ok.username, result.ok.role);
        navigate({
          to:
            result.ok.role === "admin"
              ? "/admin/dashboard"
              : "/student/notices",
        });
      } else {
        setServerError(result.err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.08 265) 0%, oklch(0.12 0.04 265) 40%, oklch(0.08 0.02 300) 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.22 265), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.2 142), transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.18 35), transparent 70%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md px-4"
      >
        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: "oklch(1.0 0 0 / 0.06)",
            backdropFilter: "blur(24px)",
            border: "1px solid oklch(1.0 0 0 / 0.12)",
          }}
        >
          {/* Header */}
          <div className="px-8 pt-10 pb-6 text-center">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4, ease: "backOut" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.22 265), oklch(0.75 0.2 285))",
              }}
            >
              <GraduationCap className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="font-display text-3xl font-bold text-white tracking-tight">
              EduCampus
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: "oklch(0.78 0.05 265)" }}
            >
              Smart Notice Board — Sign in to continue
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-8 pb-8 space-y-5"
          >
            {/* Username */}
            <div className="space-y-1.5">
              <Label
                htmlFor="username"
                className="text-white/70 text-xs font-medium uppercase tracking-wider"
              >
                Username
              </Label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "oklch(0.65 0.1 265)" }}
                />
                <Input
                  id="username"
                  data-ocid="login.username.input"
                  placeholder="Enter your username"
                  autoComplete="username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  className="pl-10 h-11 border-0 text-white placeholder:text-white/30 focus-visible:ring-1 rounded-xl"
                  style={{
                    background: "oklch(1.0 0 0 / 0.08)",
                    outline: errors.username
                      ? "1px solid oklch(0.68 0.2 12)"
                      : undefined,
                  }}
                />
              </div>
              {errors.username && (
                <p
                  data-ocid="login.username.field_error"
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "oklch(0.75 0.18 12)" }}
                >
                  <AlertCircle className="w-3 h-3" /> {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-white/70 text-xs font-medium uppercase tracking-wider"
              >
                Password
              </Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "oklch(0.65 0.1 265)" }}
                />
                <Input
                  id="password"
                  data-ocid="login.password.input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="pl-10 pr-10 h-11 border-0 text-white placeholder:text-white/30 focus-visible:ring-1 rounded-xl"
                  style={{
                    background: "oklch(1.0 0 0 / 0.08)",
                    outline: errors.password
                      ? "1px solid oklch(0.68 0.2 12)"
                      : undefined,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  data-ocid="login.password.field_error"
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "oklch(0.75 0.18 12)" }}
                >
                  <AlertCircle className="w-3 h-3" /> {errors.password.message}
                </p>
              )}
            </div>

            {/* Server error */}
            {serverError && (
              <motion.div
                data-ocid="login.error_state"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                style={{
                  background: "oklch(0.68 0.2 12 / 0.15)",
                  border: "1px solid oklch(0.68 0.2 12 / 0.3)",
                  color: "oklch(0.85 0.12 12)",
                }}
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {serverError}
              </motion.div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              data-ocid="login.submit_button"
              disabled={isLoading}
              className="w-full h-11 font-semibold text-white rounded-xl transition-smooth flex items-center justify-center gap-2 border-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.22 265), oklch(0.65 0.2 285))",
                boxShadow: "0 4px 16px oklch(0.55 0.22 265 / 0.4)",
              }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in…
                </span>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            {/* Register link */}
            <p className="text-center text-sm text-white/50">
              Don't have an account?{" "}
              <a
                href="/register"
                data-ocid="login.register_link"
                className="font-semibold hover:text-white transition-colors"
                style={{ color: "oklch(0.78 0.18 265)" }}
              >
                Register
              </a>
            </p>
          </form>
        </div>

        {/* Demo credentials */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          data-ocid="login.demo_credentials"
          className="mt-4 rounded-xl px-5 py-4 text-sm"
          style={{
            background: "oklch(1.0 0 0 / 0.06)",
            border: "1px solid oklch(1.0 0 0 / 0.1)",
            backdropFilter: "blur(12px)",
          }}
        >
          <p className="font-semibold text-white/60 text-xs uppercase tracking-wider mb-2">
            Demo Credentials
          </p>
          <div className="flex gap-6 text-white/80">
            <div>
              <span className="text-white/40 text-xs">Admin</span>
              <p
                className="font-mono text-xs mt-0.5"
                style={{ color: "oklch(0.78 0.18 142)" }}
              >
                admin / admin123
              </p>
            </div>
            <div>
              <span className="text-white/40 text-xs">Student</span>
              <p
                className="font-mono text-xs mt-0.5"
                style={{ color: "oklch(0.78 0.18 60)" }}
              >
                student / student123
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
