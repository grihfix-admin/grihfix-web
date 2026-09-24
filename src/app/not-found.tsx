import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-600">404</p>
      <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">Page not found</h1>
      <p className="max-w-md text-slate-600">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let&rsquo;s get you back home.
      </p>
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Button href="/">Go to homepage</Button>
        <Button href="/contact" variant="secondary">
          Contact us
        </Button>
      </div>
      <Link href="/services" className="text-sm font-medium text-blue-600 hover:text-blue-700">
        Browse our services →
      </Link>
    </Container>
  );
}
