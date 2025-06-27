import { Clock, Truck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function MultiVendorFeaturesSection() {
  return (
    <section className="py-12 px-4 md:px-6 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Sell With Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our marketplace and reach millions of fashion enthusiasts. Easy
            setup, fast payouts, and dedicated support.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center p-6 bg-card">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">
              Zero Commission for 3 Months
            </h3>
            <p className="text-muted-foreground">
              Start selling without any commission fees for the first three
              months.
            </p>
          </Card>
          <Card className="text-center p-6 bg-card">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">
              Easy Store Setup
            </h3>
            <p className="text-muted-foreground">
              Get your store up and running in minutes with our intuitive
              dashboard.
            </p>
          </Card>
          <Card className="text-center p-6 bg-card">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-card-foreground">
              Fast Payouts
            </h3>
            <p className="text-muted-foreground">
              Receive your earnings quickly with our streamlined payment
              process.
            </p>
          </Card>
        </div>
        <div className="text-center">
          <Link href="/seller/create">
            <Button className="bg-primary hover:bg-primary/90">
              Become a Seller
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
