import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import ThemeProvider from "@/components/common/theme-provider";

export const metadata = {
  title: "ChicHut",
  description: "E-commerce platform",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div>{children}</div>
        </ThemeProvider>
        <Toaster position="bottom-left" closeButton richColors />
      </body>
    </html>
  );
}
