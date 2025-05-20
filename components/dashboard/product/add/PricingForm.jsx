import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

function PricingForm({ formData }) {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <DollarSign className="mr-2 h-5 w-5" />
          Pricing Information
        </CardTitle>
        <CardDescription>Set your product's pricing details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="price" className="flex flex-col space-y-2">
              <span className="mx-2 font-medium">Price</span>
              <div className="relative">
                <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={formData?.price}
                  required
                  min="1"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  step="0.01"
                  name="price"
                  id="price"
                />
              </div>
              <p className="text-sm mx-2 text-muted-foreground">
                The Original selling price of your product.
              </p>
            </label>
          </div>
          <div>
            <label htmlFor="discount" className="flex flex-col space-y-2">
              <span className="flex items-center">
                <span className="mx-2 font-medium">Discount</span> (Optional)
              </span>
              <div className="relative">
                <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={formData?.discount}
                  min="0"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  className="pl-8"
                  name="discount"
                  id="discount"
                />
              </div>
              <p className="text-sm mx-2 text-muted-foreground">
                How much discount do you want to give?
              </p>
            </label>
          </div>
        </div>
      </CardContent>
    </>
  );
}

export default PricingForm;
