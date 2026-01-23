import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import mailIcon from "@/assets/icons/mail.svg";
import passIcon from "@/assets/icons/password.svg";
import unlockIcon from "@/assets/icons/password-unlock.svg";
import loginBg from "@/assets/login-bg.svg";
import logo from "@/assets/logo.png";
import { Check } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up real auth
    console.log({ email, password, agree });
  };

  return (
    <div className="h-screen w-screen flex items-stretch bg-background">
      <div className="flex-1 flex bg-white overflow-hidden relative">
        {/* Background image covering entire container - on top */}
        <img
          src={loginBg}
          alt="Decorative background"
          className="hidden lg:block absolute top-20 left-0 bottom-0 h-[120%] w-[60%] object-cover z-20 pointer-events-none"
        />

        {/* Left decorative panel */}
        <div className="lg:flex w-1/2 p-8 items-center justify-center hidden relative z-10">
          <div className="relative w-full h-full bg-[rgba(0,0,0,0.2)] rounded-3xl overflow-hidden backdrop-blur-sm"></div>
        </div>

        {/* Right form panel */}
        <div className="w-full lg:w-1/2 p-16 flex flex-col justify-center h-full relative z-30 bg-white md:bg-transparent">
          <div className="max-w-xl mx-auto w-full">
            <img src={logo} alt="Trivantage" className="mx-auto mb-6 h-14" />
            <h1 className="text-[32px] leading-12 font-bold font-sans text-black mb-2">
              Welcome Back!
            </h1>
            <p className="text-[16px] leading-7 font-medium font-sans text-[#5C6288] mb-6">
              Enter your email address and we'll send you a secure login link
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 font-normal text-[14px] leading-7 font-sans text-[#1A1A1A]">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="@sample.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg px-4 py-3 pr-12 bg-white border input-border text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span
                    className="icon-inline absolute right-4 top-1/2 -translate-y-1/2 opacity-90 w-6 h-6 inline-block"
                    dangerouslySetInnerHTML={{
                      __html: mailIcon,
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-normal text-[14px] leading-7 font-sans text-[#1A1A1A]">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="*************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-lg px-4 py-3 pr-12 bg-white border input-border text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label="Toggle password visibility"
                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-90 w-6 h-6 inline-flex items-center justify-center cursor-pointer"
                  >
                    {showPassword ? (
                      <span
                        className="w-6 h-6 inline-block"
                        dangerouslySetInnerHTML={{
                          __html: unlockIcon,
                        }}
                      />
                    ) : (
                      <span
                        className="w-6 h-6 inline-block"
                        dangerouslySetInnerHTML={{
                          __html: passIcon,
                        }}
                      />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="relative flex items-center">
                  <input
                    id="agree"
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className={`h-5 w-5 appearance-none align-middle border rounded ${
                      agree
                        ? "bg-[#036fed] border-[#036fed]"
                        : "bg-white border-[#E0E0E0]"
                    }`}
                  />
                  {agree && (
                    <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                      <Check color="white" size={14} strokeWidth={2} />
                    </span>
                  )}
                </div>
                <label
                  htmlFor="agree"
                  className="font-normal text-[14px] leading-7 font-sans text-[#1A1A1A]"
                >
                  I agree the{" "}
                  <a className="text-tertiary cursor-pointer hover:text-tertiary/80 transition-colors">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a className="text-tertiary cursor-pointer hover:text-tertiary/80 transition-colors">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div>
                <Button
                  type="submit"
                  variant="tertiary"
                  size="lg"
                  className="w-full h-12 cursor-pointer"
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
