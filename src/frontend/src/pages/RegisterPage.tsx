import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { apiRegister } from "../api";
import type { Role } from "../types";

interface RegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
  role: Role;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterForm>({ defaultValues: { role: "student" } });

  const password = watch("password");

  const onSubmit = async (data: RegisterForm) => {
    setServerError("");
    setIsLoading(true);
    try {
      const result = await apiRegister(data.username, data.password, data.role);
      if ("ok" in result) {
        setSuccess(true);
        setTimeout(() => navigate({ to: "/login" }), 1800);
      } else {
        setServerError(result.err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-8"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.08 265) 0%, oklch(0.12 0.04 265) 40%, oklch(0.08 0.02 300) 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.22 265), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.2 60), transparent 70%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md px-4"
      >
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
                  "linear-gradient(135deg, oklch(0.55 0.2 265), oklch(0.68 0.18 142))",
              }}
            >
              <GraduationCap className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="font-display text-3xl font-bold text-white tracking-tight">
              Join EduCampus
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: "oklch(0.78 0.05 265)" }}
            >
              Create your account to get started
            </p>
          </div>

          {/* Success state */}
          {success ? (
            <motion.div
              data-ocid="register.success_state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-8 pb-10 flex flex-col items-center gap-3 text-center"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0.68 0.22 142 / 0.2)" }}
              >
                <CheckCircle2
                  className="w-7 h-7"
                  style={{ color: "oklch(0.75 0.22 142)" }}
                />
              </div>
              <p className="font-semibold text-white text-lg">
                Account Created!
              </p>
              <p className="text-sm" style={{ color: "oklch(0.78 0.05 265)" }}>
                Redirecting you to the login page…
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-8 pb-8 space-y-5"
            >
              {/* Username */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="reg-username"
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
                    id="reg-username"
                    data-ocid="register.username.input"
                    placeholder="Choose a username"
                    autoComplete="username"
                    {...register("username", {
                      required: "Username is required",
                      minLength: { value: 3, message: "At least 3 characters" },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message: "Letters, numbers, underscores only",
                      },
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
                    data-ocid="register.username.field_error"
                    className="flex items-center gap-1 text-xs"
                    style={{ color: "oklch(0.75 0.18 12)" }}
                  >
                    <AlertCircle className="w-3 h-3" />{" "}
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <Label className="text-white/70 text-xs font-medium uppercase tracking-wider">
                  Role
                </Label>
                <Select
                  defaultValue="student"
                  onValueChange={(val) => setValue("role", val as Role)}
                >
                  <SelectTrigger
                    data-ocid="register.role.select"
                    className="h-11 border-0 text-white focus:ring-1 rounded-xl"
                    style={{ background: "oklch(1.0 0 0 / 0.08)" }}
                  >
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="reg-password"
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
                    id="reg-password"
                    data-ocid="register.password.input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "At least 6 characters" },
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
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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
                    data-ocid="register.password.field_error"
                    className="flex items-center gap-1 text-xs"
                    style={{ color: "oklch(0.75 0.18 12)" }}
                  >
                    <AlertCircle className="w-3 h-3" />{" "}
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="reg-confirm"
                  className="text-white/70 text-xs font-medium uppercase tracking-wider"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    style={{ color: "oklch(0.65 0.1 265)" }}
                  />
                  <Input
                    id="reg-confirm"
                    data-ocid="register.confirm_password.input"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (val) =>
                        val === password || "Passwords do not match",
                    })}
                    className="pl-10 pr-10 h-11 border-0 text-white placeholder:text-white/30 focus-visible:ring-1 rounded-xl"
                    style={{
                      background: "oklch(1.0 0 0 / 0.08)",
                      outline: errors.confirmPassword
                        ? "1px solid oklch(0.68 0.2 12)"
                        : undefined,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={
                      showConfirm
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  >
                    {showConfirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p
                    data-ocid="register.confirm_password.field_error"
                    className="flex items-center gap-1 text-xs"
                    style={{ color: "oklch(0.75 0.18 12)" }}
                  >
                    <AlertCircle className="w-3 h-3" />{" "}
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Server error */}
              {serverError && (
                <motion.div
                  data-ocid="register.error_state"
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
                data-ocid="register.submit_button"
                disabled={isLoading}
                className="w-full h-11 font-semibold text-white rounded-xl transition-smooth flex items-center justify-center gap-2 border-0"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.50 0.2 265), oklch(0.62 0.18 142))",
                  boxShadow: "0 4px 16px oklch(0.55 0.22 265 / 0.35)",
                }}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Creating account…
                  </span>
                ) : (
                  <>
                    Create Account <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>

              {/* Login link */}
              <p className="text-center text-sm text-white/50">
                Already have an account?{" "}
                <a
                  href="/login"
                  data-ocid="register.login_link"
                  className="font-semibold hover:text-white transition-colors"
                  style={{ color: "oklch(0.78 0.18 265)" }}
                >
                  Sign in
                </a>
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
