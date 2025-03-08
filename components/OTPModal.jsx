// "use client";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import React, { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// const OtpModal = ({
  
//   email,
// }) => {
//   const router = useRouter();
//   const [isOpen, setIsOpen] = useState(true);
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     console.log("OTP Submitted");    
//   }

//   const handleResendOtp = async () => {
//     console.log("Resend OTP");
//   }

//   return (
//     <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
//       <AlertDialogContent className="shad-alert-dialog">
//         <AlertDialogHeader className="relative flex justify-center">
//           <AlertDialogTitle className="h2 text-center">
//             Enter Your OTP
//             <Image
//               src="/assets/icons/close-dark.svg"
//               alt="close"
//               width={20}
//               height={20}
//               onClick={() => setIsOpen(false)}
//               className="otp-close-button cursor-pointer"
//             />
//           </AlertDialogTitle>
//           <AlertDialogDescription className="subtitle-2 text-center text-light-100">
//             We&apos;ve sent a code to{" "}
//             <span className="pl-1 text-brand">{email}</span>
//           </AlertDialogDescription>
//         </AlertDialogHeader>

//         <InputOTP maxLength={6} value={password} onChange={setPassword}>
//           <InputOTPGroup className="shad-otp">
//             <InputOTPSlot index={0} className="shad-otp-slot" />
//             <InputOTPSlot index={1} className="shad-otp-slot" />
//             <InputOTPSlot index={2} className="shad-otp-slot" />
//             <InputOTPSlot index={3} className="shad-otp-slot" />
//             <InputOTPSlot index={4} className="shad-otp-slot" />
//             <InputOTPSlot index={5} className="shad-otp-slot" />
//           </InputOTPGroup>
//         </InputOTP>

//         <AlertDialogFooter>
//           <div className="flex w-full flex-col gap-4">
//             <AlertDialogAction
//               onClick={handleSubmit}
//               className="shad-submit-btn h-12"
//               type="button"
//             >
//               Submit
//               {isLoading && (
//                 <Image
//                   src="/assets/icons/loader.svg"
//                   alt="loader"
//                   width={24}
//                   height={24}
//                   className="ml-2 animate-spin"
//                 />
//               )}
//             </AlertDialogAction>

//             <div className="subtitle-2 mt-2 text-center text-light-100">
//               Didn&apos;t get a code?
//               <Button
//                 type="button"
//                 variant="link"
//                 className="pl-1 text-brand"
//                 onClick={handleResendOtp}
//               >
//                 Click to resend
//               </Button>
//             </div>
//           </div>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };

// export default OtpModal;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const OTPModal = ({ email, onSubmitOTP }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await onSubmitOTP(otp);
    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    console.log("Resend OTP");
    // Optionally, trigger a re-send here using your Clerk logic or an API endpoint.
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">
            Enter Your OTP
            <Image
              src="/assets/icons/close-dark.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => setIsOpen(false)}
              className="otp-close-button cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            We&apos;ve sent a code to{" "}
            <span className="pl-1 text-brand">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup className="shad-otp">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <InputOTPSlot key={index} index={index} className="shad-otp-slot" />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="shad-submit-btn h-12"
              type="button"
            >
              Submit
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </AlertDialogAction>

            <div className="subtitle-2 mt-2 text-center text-light-100">
              Didn&apos;t get a code?
              <Button
                type="button"
                variant="link"
                className="pl-1 text-brand"
                onClick={handleResendOtp}
              >
                Click to resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
