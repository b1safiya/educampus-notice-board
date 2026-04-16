import { c as createLucideIcon, u as useNavigate, r as reactExports, j as jsxRuntimeExports, G as GraduationCap, B as Button } from "./index-93qgKiy3.js";
import { I as Input } from "./input-CA1AUMJM.js";
import { u as useForm, L as Label } from "./index.esm-B1gpY5JA.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Cy_T6PmD.js";
import { b as apiRegister } from "./api-AGmkjX6s.js";
import { m as motion } from "./proxy-DoP0sNNX.js";
import { U as User, C as CircleAlert, L as Lock, E as EyeOff, a as Eye, A as ArrowRight } from "./user-BcOeKpd9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [serverError, setServerError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues: { role: "student" } });
  const password = watch("password");
  const onSubmit = async (data) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex items-center justify-center relative overflow-hidden py-8",
      style: {
        background: "linear-gradient(135deg, oklch(0.18 0.08 265) 0%, oklch(0.12 0.04 265) 40%, oklch(0.08 0.02 300) 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20",
              style: {
                background: "radial-gradient(circle, oklch(0.65 0.22 265), transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-15",
              style: {
                background: "radial-gradient(circle, oklch(0.72 0.2 60), transparent 70%)"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 32, scale: 0.97 },
            animate: { opacity: 1, y: 0, scale: 1 },
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            className: "relative z-10 w-full max-w-md px-4",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl overflow-hidden shadow-2xl",
                style: {
                  background: "oklch(1.0 0 0 / 0.06)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid oklch(1.0 0 0 / 0.12)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 pt-10 pb-6 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { scale: 0.7, opacity: 0 },
                        animate: { scale: 1, opacity: 1 },
                        transition: { delay: 0.1, duration: 0.4, ease: "backOut" },
                        className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4",
                        style: {
                          background: "linear-gradient(135deg, oklch(0.55 0.2 265), oklch(0.68 0.18 142))"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-8 h-8 text-white" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-white tracking-tight", children: "Join EduCampus" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-sm mt-1",
                        style: { color: "oklch(0.78 0.05 265)" },
                        children: "Create your account to get started"
                      }
                    )
                  ] }),
                  success ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      "data-ocid": "register.success_state",
                      initial: { opacity: 0, scale: 0.9 },
                      animate: { opacity: 1, scale: 1 },
                      className: "px-8 pb-10 flex flex-col items-center gap-3 text-center",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-14 h-14 rounded-full flex items-center justify-center",
                            style: { background: "oklch(0.68 0.22 142 / 0.2)" },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              CircleCheck,
                              {
                                className: "w-7 h-7",
                                style: { color: "oklch(0.75 0.22 142)" }
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-white text-lg", children: "Account Created!" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "oklch(0.78 0.05 265)" }, children: "Redirecting you to the login page…" })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "form",
                    {
                      onSubmit: handleSubmit(onSubmit),
                      className: "px-8 pb-8 space-y-5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Label,
                            {
                              htmlFor: "reg-username",
                              className: "text-white/70 text-xs font-medium uppercase tracking-wider",
                              children: "Username"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              User,
                              {
                                className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none",
                                style: { color: "oklch(0.65 0.1 265)" }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: "reg-username",
                                "data-ocid": "register.username.input",
                                placeholder: "Choose a username",
                                autoComplete: "username",
                                ...register("username", {
                                  required: "Username is required",
                                  minLength: { value: 3, message: "At least 3 characters" },
                                  pattern: {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: "Letters, numbers, underscores only"
                                  }
                                }),
                                className: "pl-10 h-11 border-0 text-white placeholder:text-white/30 focus-visible:ring-1 rounded-xl",
                                style: {
                                  background: "oklch(1.0 0 0 / 0.08)",
                                  outline: errors.username ? "1px solid oklch(0.68 0.2 12)" : void 0
                                }
                              }
                            )
                          ] }),
                          errors.username && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              "data-ocid": "register.username.field_error",
                              className: "flex items-center gap-1 text-xs",
                              style: { color: "oklch(0.75 0.18 12)" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                                " ",
                                errors.username.message
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/70 text-xs font-medium uppercase tracking-wider", children: "Role" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Select,
                            {
                              defaultValue: "student",
                              onValueChange: (val) => setValue("role", val),
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  SelectTrigger,
                                  {
                                    "data-ocid": "register.role.select",
                                    className: "h-11 border-0 text-white focus:ring-1 rounded-xl",
                                    style: { background: "oklch(1.0 0 0 / 0.08)" },
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select your role" })
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "student", children: "Student" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "admin", children: "Admin" })
                                ] })
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Label,
                            {
                              htmlFor: "reg-password",
                              className: "text-white/70 text-xs font-medium uppercase tracking-wider",
                              children: "Password"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Lock,
                              {
                                className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none",
                                style: { color: "oklch(0.65 0.1 265)" }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: "reg-password",
                                "data-ocid": "register.password.input",
                                type: showPassword ? "text" : "password",
                                placeholder: "Create a password",
                                autoComplete: "new-password",
                                ...register("password", {
                                  required: "Password is required",
                                  minLength: { value: 6, message: "At least 6 characters" }
                                }),
                                className: "pl-10 pr-10 h-11 border-0 text-white placeholder:text-white/30 focus-visible:ring-1 rounded-xl",
                                style: {
                                  background: "oklch(1.0 0 0 / 0.08)",
                                  outline: errors.password ? "1px solid oklch(0.68 0.2 12)" : void 0
                                }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => setShowPassword((v) => !v),
                                "aria-label": showPassword ? "Hide password" : "Show password",
                                className: "absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors",
                                children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                              }
                            )
                          ] }),
                          errors.password && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              "data-ocid": "register.password.field_error",
                              className: "flex items-center gap-1 text-xs",
                              style: { color: "oklch(0.75 0.18 12)" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                                " ",
                                errors.password.message
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Label,
                            {
                              htmlFor: "reg-confirm",
                              className: "text-white/70 text-xs font-medium uppercase tracking-wider",
                              children: "Confirm Password"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Lock,
                              {
                                className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none",
                                style: { color: "oklch(0.65 0.1 265)" }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: "reg-confirm",
                                "data-ocid": "register.confirm_password.input",
                                type: showConfirm ? "text" : "password",
                                placeholder: "Repeat your password",
                                autoComplete: "new-password",
                                ...register("confirmPassword", {
                                  required: "Please confirm your password",
                                  validate: (val) => val === password || "Passwords do not match"
                                }),
                                className: "pl-10 pr-10 h-11 border-0 text-white placeholder:text-white/30 focus-visible:ring-1 rounded-xl",
                                style: {
                                  background: "oklch(1.0 0 0 / 0.08)",
                                  outline: errors.confirmPassword ? "1px solid oklch(0.68 0.2 12)" : void 0
                                }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => setShowConfirm((v) => !v),
                                "aria-label": showConfirm ? "Hide confirm password" : "Show confirm password",
                                className: "absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors",
                                children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                              }
                            )
                          ] }),
                          errors.confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              "data-ocid": "register.confirm_password.field_error",
                              className: "flex items-center gap-1 text-xs",
                              style: { color: "oklch(0.75 0.18 12)" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                                " ",
                                errors.confirmPassword.message
                              ]
                            }
                          )
                        ] }),
                        serverError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          motion.div,
                          {
                            "data-ocid": "register.error_state",
                            initial: { opacity: 0, y: -8 },
                            animate: { opacity: 1, y: 0 },
                            className: "flex items-center gap-2 px-4 py-3 rounded-xl text-sm",
                            style: {
                              background: "oklch(0.68 0.2 12 / 0.15)",
                              border: "1px solid oklch(0.68 0.2 12 / 0.3)",
                              color: "oklch(0.85 0.12 12)"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
                              serverError
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            type: "submit",
                            "data-ocid": "register.submit_button",
                            disabled: isLoading,
                            className: "w-full h-11 font-semibold text-white rounded-xl transition-smooth flex items-center justify-center gap-2 border-0",
                            style: {
                              background: "linear-gradient(135deg, oklch(0.50 0.2 265), oklch(0.62 0.18 142))",
                              boxShadow: "0 4px 16px oklch(0.55 0.22 265 / 0.35)"
                            },
                            children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" }),
                              "Creating account…"
                            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                              "Create Account ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                            ] })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-white/50", children: [
                          "Already have an account?",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "a",
                            {
                              href: "/login",
                              "data-ocid": "register.login_link",
                              className: "font-semibold hover:text-white transition-colors",
                              style: { color: "oklch(0.78 0.18 265)" },
                              children: "Sign in"
                            }
                          )
                        ] })
                      ]
                    }
                  )
                ]
              }
            )
          }
        )
      ]
    }
  );
}
export {
  RegisterPage as default
};
