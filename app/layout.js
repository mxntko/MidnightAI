import { Toaster } from "sonner";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Toaster richColors position="top-right" />
                {children}
            </body>
        </html>
    );
}
