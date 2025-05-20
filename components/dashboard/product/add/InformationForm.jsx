import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Package } from "lucide-react";
import SelectColor from "./SelectColor";
function InformationForm({ formData, productColor, setProductColor }) {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex text-2xl items-center">
          <Package className="mr-2 h-5 w-5" />
          Product Information
        </CardTitle>
        <CardDescription>Manage your product's details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="color" className="flex flex-col space-y-2">
              <span className="mx-2 font-medium">Available colors</span>
              <SelectColor
                productColor={productColor}
                setProductColor={setProductColor}
              />
              <p className="text-sm mx-2 text-muted-foreground">
                Add your product colors.
              </p>
            </label>
          </div>
          <div>
            <label htmlFor="size" className="flex flex-col space-y-2">
              <span className="mx-2 font-medium">Available size</span>
              <Input
                required
                value={formData?.size}
                name="size"
                id="size"
                type="text"
                placeholder="e.g. XL, XXL or 10cm, 12cm"
              />
              <p className="text-sm mx-2 text-muted-foreground">
                Add sizes separated by commas. For example: XL, XXL or US 28, US
                30.
              </p>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="stock" className="flex flex-col space-y-2">
            <span className="mx-2 font-medium">Quantity</span>
            <Input
              required
              value={formData?.stock}
              name="stock"
              id="stock"
              type="number"
              min="0"
              step="1"
              placeholder="e.g. 100"
            />
            <p className="text-sm mx-2 text-muted-foreground">
              The number of items in stock.
            </p>
          </label>
        </div>
      </CardContent>
    </>
  );
}

export default InformationForm;
