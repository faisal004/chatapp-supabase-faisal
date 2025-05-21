import { Separator } from "@/components/ui/separator";
import { LoginForm } from "./_components/login-form";
import { LoginRightSection } from "./_components/LoginRightSection";

const LoginPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-5">
      <div className="flex flex-1 flex-col items-center justify-center bg-white px-4 py-12 md:px-8 md:col-span-2 col-span-5">
        <div className="flex flex-col items-center w-full max-w-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 512 512" className="mx-auto h-20"><mask id="periskope-logo_svg__a" width="512" height="512" x="0" y="0" maskUnits="userSpaceOnUse" ><circle cx="256" cy="256" r="256" fill="#3C3"></circle></mask><g mask="url(#periskope-logo_svg__a)"><circle cx="256" cy="256" r="256" fill="#15803D"></circle><path fill="#fff" d="M88 258c0-55.228 44.772-100 100-100h100v369H88z"></path><path fill="#fff" d="M218 158h125c55.228 0 100 44.772 100 100s-44.772 100-100 100H218z"></path><circle cx="339" cy="258" r="75" fill="#15803D"></circle><path fill="#15803D" d="m256.478 322.112 12.879-37.603 26.712 34.08z"></path><circle cx="310" cy="261" r="10" fill="#fff"></circle><circle cx="343" cy="261" r="10" fill="#fff"></circle><circle cx="376" cy="261" r="10" fill="#fff"></circle></g></svg>
          <h1 className="text-2xl font-bold my-2 text-gray-900">Log in to Periskope</h1>
          <LoginForm />
          <p className="text-xs text-gray-400 mt-8 text-center w-60">
            By signing up, you agree to Periskope's{' '}
            <a href="#" className="underline">Terms of Service</a> and{' '}
            <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
      <div className="hidden md:flex flex-1 bg-[#fafaf9] items-center justify-center border-l border-gray-200 col-span-3">
        <LoginRightSection />
      </div>
    </div>
  );
};

export default LoginPage;