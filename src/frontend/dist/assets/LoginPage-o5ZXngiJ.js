import { u as useNavigate, a as useAuthStore, r as reactExports, j as jsxRuntimeExports, G as GraduationCap, B as Button } from "./index-93qgKiy3.js";
import { I as Input } from "./input-CA1AUMJM.js";
import { u as useForm, L as Label } from "./index.esm-B1gpY5JA.js";
import { a as apiLogin } from "./api-AGmkjX6s.js";
import { m as motion } from "./proxy-DoP0sNNX.js";
import { U as User, C as CircleAlert, L as Lock, E as EyeOff, a as Eye, A as ArrowRight } from "./user-BcOeKpd9.js";
function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [serverError, setServerError] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    setServerError("");
    setIsLoading(true);
    try {
      const result = await apiLogin(data.username, data.password);
      if ("ok" in result) {
        login(result.ok.username, result.ok.role);
        navigate({
          to: result.ok.role === "admin" ? "/admin/dashboard" : "/student/notices"
        });
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
      className: "min-h-screen flex items-center justify-center relative overflow-hidden",
      style: {
        background: "linear-gradient(135deg, oklch(0.18 0.08 265) 0%, oklch(0.12 0.04 265) 40%, oklch(0.08 0.02 300) 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20",
              style: {
                background: "radial-gradient(circle, oklch(0.65 0.22 265), transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15",
              style: {
                background: "radial-gradient(circle, oklch(0.72 0.2 142), transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-1/2 left-1/4 w-64 h-64 rounded-full opacity-10",
              style: {
                background: "radial-gradient(circle, oklch(0.75 0.18 35), transparent 70%)"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 32, scale: 0.97 },
            animate: { opacity: 1, y: 0, scale: 1 },
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            className: "relative z-10 w-full max-w-md px-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                            background: "linear-gradient(135deg, oklch(0.62 0.22 265), oklch(0.75 0.2 285))"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-8 h-8 text-white" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-white tracking-tight", children: "EduCampus" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm mt-1",
                          style: { color: "oklch(0.78 0.05 265)" },
                          children: "Smart Notice Board — Sign in to continue"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "form",
                      {
                        onSubmit: handleSubmit(onSubmit),
                        className: "px-8 pb-8 space-y-5",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Label,
                              {
                                htmlFor: "username",
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
                                  id: "username",
                                  "data-ocid": "login.username.input",
                                  placeholder: "Enter your username",
                                  autoComplete: "username",
                                  ...register("username", {
                                    required: "Username is required"
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
                                "data-ocid": "login.username.field_error",
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
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Label,
                              {
                                htmlFor: "password",
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
                                  id: "password",
                                  "data-ocid": "login.password.input",
                                  type: showPassword ? "text" : "password",
                                  placeholder: "Enter your password",
                                  autoComplete: "current-password",
                                  ...register("password", {
                                    required: "Password is required"
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
                                "data-ocid": "login.password.field_error",
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
                          serverError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            motion.div,
                            {
                              "data-ocid": "login.error_state",
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
                              "data-ocid": "login.submit_button",
                              disabled: isLoading,
                              className: "w-full h-11 font-semibold text-white rounded-xl transition-smooth flex items-center justify-center gap-2 border-0",
                              style: {
                                background: "linear-gradient(135deg, oklch(0.55 0.22 265), oklch(0.65 0.2 285))",
                                boxShadow: "0 4px 16px oklch(0.55 0.22 265 / 0.4)"
                              },
                              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" }),
                                "Signing in…"
                              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                "Sign In ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                              ] })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-white/50", children: [
                            "Don't have an account?",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "a",
                              {
                                href: "/register",
                                "data-ocid": "login.register_link",
                                className: "font-semibold hover:text-white transition-colors",
                                style: { color: "oklch(0.78 0.18 265)" },
                                children: "Register"
                              }
                            )
                          ] })
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.3, duration: 0.4 },
                  "data-ocid": "login.demo_credentials",
                  className: "mt-4 rounded-xl px-5 py-4 text-sm",
                  style: {
                    background: "oklch(1.0 0 0 / 0.06)",
                    border: "1px solid oklch(1.0 0 0 / 0.1)",
                    backdropFilter: "blur(12px)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-white/60 text-xs uppercase tracking-wider mb-2", children: "Demo Credentials" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 text-white/80", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40 text-xs", children: "Admin" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "font-mono text-xs mt-0.5",
                            style: { color: "oklch(0.78 0.18 142)" },
                            children: "admin / admin123"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40 text-xs", children: "Student" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "font-mono text-xs mt-0.5",
                            style: { color: "oklch(0.78 0.18 60)" },
                            children: "student / student123"
                          }
                        )
                      ] })
                    ] })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  LoginPage as default
};
