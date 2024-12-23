export default function Footer() {
    return (
        <footer className="bg-[#f2f8f7] text-[#555] py-4 border border-t-[#f2f8f7]">
            <div className="container mx-auto text-center">
                <p className="text-sm max-md:text-xs">
                    &copy; {new Date().getFullYear()} Notebook. All rights
                    reserved.
                </p>
                {/* <div className="mt-2 space-x-4 text-md max-md:text-sm">
                    <a href="/privacy-policy" className="hover:text-primary">
                        Privacy Policy
                    </a>
                    <a href="/terms-of-service" className="hover:text-primary">
                        Terms of Service
                    </a>

                    <a href="/contact-us" className="hover:text-primary">
                        Contact Us
                    </a>
                </div> */}
            </div>
        </footer>
    );
}
