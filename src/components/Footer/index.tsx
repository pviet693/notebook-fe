import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Instagram, Github } from "lucide-react";
import { Link } from "@tanstack/react-router";

function Footer() {
    return (
        <footer className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div>
                        <Link
                            href="/"
                            className="text-2xl font-bold text-[#00BFA6] mb-4 inline-block"
                        >
                            Note<span className="font-normal">Book.</span>
                        </Link>
                        <p className="text-gray-600">
                            Did you come here for something in particular or
                            just general Riker
                        </p>
                    </div>

                    {/* Blogs */}
                    <div>
                        <h3 className="font-semibold mb-4">Blogs</h3>
                        <ul className="space-y-2">
                            {[
                                "Travel",
                                "Technology",
                                "Lifestyle",
                                "Fashion",
                                "Business"
                            ].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="text-gray-600 hover:text-[#00BFA6]"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {[
                                "FAQ",
                                "Terms & Conditions",
                                "Support",
                                "Privacy Policy"
                            ].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="text-gray-600 hover:text-[#00BFA6]"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Subscribe */}
                    <div>
                        <h3 className="font-semibold mb-4">
                            Subscribe For Newsletter
                        </h3>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Your Email"
                                className="bg-white"
                            />
                            <Button className="bg-[#00BFA6] hover:bg-[#00BFA6]/90">
                                Subscribe
                            </Button>
                        </div>
                        <div className="mt-6">
                            <h4 className="font-semibold mb-3">Follow On:</h4>
                            <div className="flex gap-4">
                                <Link
                                    href="#"
                                    className="text-[#00BFA6] hover:text-[#00BFA6]/90"
                                >
                                    <Twitter className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="text-[#00BFA6] hover:text-[#00BFA6]/90"
                                >
                                    <Facebook className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="text-[#00BFA6] hover:text-[#00BFA6]/90"
                                >
                                    <Instagram className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="text-[#00BFA6] hover:text-[#00BFA6]/90"
                                >
                                    <Github className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
