import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6"

function Footerdemo() {
  return (
    <footer className="relative border-t border-[rgba(244,240,230,0.14)] bg-[#24402d] font-[family-name:var(--font-body)] text-[color:var(--fb-paper)] transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">Stay Connected</h2>
            <p className="mb-6 text-[color:rgba(244,240,230,0.72)]">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="border-[rgba(244,240,230,0.2)] bg-[rgba(244,240,230,0.06)] pr-12 text-[color:var(--fb-paper)] backdrop-blur-sm placeholder:text-[rgba(244,240,230,0.5)]"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-[var(--fb-red)] text-white transition-transform hover:scale-105 hover:bg-[var(--fb-red)]"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-[#e88f83]/10 blur-2xl" />
          </div>
          <div className="lg:pl-8">
            <h3 className="mb-4 font-[family-name:var(--font-display)] text-xl font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm text-[color:rgba(244,240,230,0.72)]">
              <a href="#" className="block transition-colors hover:text-[#e88f83]">
                Home
              </a>
              <a href="/about" className="block transition-colors hover:text-[#e88f83]">
                About Us
              </a>
              <a href="#" className="block transition-colors hover:text-[#e88f83]">
                Past Events
              </a>
              <a href="#" className="block transition-colors hover:text-[#e88f83]">
                Contact
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 font-[family-name:var(--font-display)] text-xl font-semibold">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic text-[color:rgba(244,240,230,0.72)]">
              <p>Phone: (123) 456-7890</p>
              <p>Email: hello@example.com</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 font-[family-name:var(--font-display)] text-xl font-semibold">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-[rgba(244,240,230,0.25)] bg-transparent text-[color:var(--fb-paper)] hover:bg-[rgba(244,240,230,0.1)] hover:text-[#e88f83]">
                      <FaFacebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-[rgba(244,240,230,0.25)] bg-transparent text-[color:var(--fb-paper)] hover:bg-[rgba(244,240,230,0.1)] hover:text-[#e88f83]">
                      <FaXTwitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-[rgba(244,240,230,0.25)] bg-transparent text-[color:var(--fb-paper)] hover:bg-[rgba(244,240,230,0.1)] hover:text-[#e88f83]">
                      <FaInstagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-[rgba(244,240,230,0.25)] bg-transparent text-[color:var(--fb-paper)] hover:bg-[rgba(244,240,230,0.1)] hover:text-[#e88f83]">
                      <FaLinkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[rgba(244,240,230,0.14)] pt-8 text-center md:flex-row">
          <p className="text-sm text-[color:rgba(244,240,230,0.6)]">
            Freebook.sg
          </p>
          <nav className="flex gap-4 text-sm text-[color:rgba(244,240,230,0.72)]">
            <a href="#" className="transition-colors hover:text-[#e88f83]">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-[#e88f83]">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-[#e88f83]">
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
