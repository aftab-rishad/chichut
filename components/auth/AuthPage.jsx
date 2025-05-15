import Image from "next/image";

function AuthPage({ children, title }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full md:w-[50vw] items-center justify-center flex flex-col mx-6">
        {title}
        {children}
      </div>
      <div className="hidden md:block w-[50vw] h-[90vh] mr-6">
        <Image
          alt="Login"
          src="/login-image.jpg"
          width={1800}
          height={1800}
          className="object-cover w-full h-full rounded-2xl"
        />
      </div>
    </div>
  );
}

export default AuthPage;
