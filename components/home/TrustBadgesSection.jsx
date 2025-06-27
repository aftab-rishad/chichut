import { Shield, Truck } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function TrustBadgesSection() {
  return (
    <section className="py-12 px-4 md:px-6 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
            Shop With Confidence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We prioritize your security and satisfaction with every purchase
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="p-4 text-center bg-card">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-1 text-card-foreground">
              Secure Payments
            </h3>
            <p className="text-sm text-muted-foreground">
              All transactions are encrypted and secure
            </p>
          </Card>
          <Card className="p-4 text-center bg-card">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-1 text-card-foreground">
              Fast Shipping
            </h3>
            <p className="text-sm text-muted-foreground">
              Quick delivery to your doorstep
            </p>
          </Card>
          <Card className="p-4 text-center bg-card">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path
                  d="M20.42 4.58C19.76 3.91 18.91 3.44 18 3.21C17.09 2.97 16.14 2.99 15.24 3.25C14.33 3.51 13.5 4.02 12.83 4.69L12 5.53L11.18 4.69C10.5 4.02 9.67 3.51 8.77 3.25C7.86 2.99 6.91 2.97 6 3.21C5.09 3.44 4.24 3.91 3.58 4.58C2.91 5.24 2.44 6.09 2.21 7C1.97 7.91 1.99 8.86 2.25 9.77C2.51 10.68 3.02 11.51 3.69 12.18L12 20.5L20.31 12.18C20.98 11.51 21.49 10.68 21.75 9.77C22.01 8.86 22.03 7.91 21.79 7C21.56 6.09 21.09 5.24 20.42 4.58Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-medium mb-1 text-card-foreground">
              Buyer Protection
            </h3>
            <p className="text-sm text-muted-foreground">
              Money-back guarantee on all orders
            </p>
          </Card>
          <Card className="p-4 text-center bg-card">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path
                  d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-medium mb-1 text-card-foreground">
              24/7 Support
            </h3>
            <p className="text-sm text-muted-foreground">
              Always here to help with your queries
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
