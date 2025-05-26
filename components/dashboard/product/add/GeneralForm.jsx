import AIButton from "@/components/common/AIButton";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";
import dynamic from "next/dynamic";

const CategorySubCategory = dynamic(
  () => import("@/components/dashboard/product/add/CategorySubCategory"),
  {
    ssr: false,
  }
);
function GeneralForm({ formData, setFormData }) {
  return (
    <div className="space-y-4 pt-4">
      <>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Info className="mr-2 h-5 w-5" />
            Basic Information
          </CardTitle>
          <CardDescription>
            Enter the basic details about your product.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="name" className="flex flex-col space-y-2">
              <span className="mx-2 font-medium">Product Name</span>
              <Input
                required
                name="name"
                value={formData?.name}
                minLength={10}
                id="name"
                placeholder="Enter product name"
              />
              <div className="flex items-center justify-between relative">
                <p className="text-sm mx-2 text-muted-foreground">
                  This is the name that will be displayed on your product page.
                </p>
                <AIButton
                  className="absolute right-2 top-1"
                  aiFor="name"
                  formData={formData}
                  setFormData={setFormData}
                >
                  Ask AI for Name
                </AIButton>
              </div>
            </label>
          </div>
          <div>
            <label htmlFor="description" className="flex flex-col space-y-2">
              <span className="mx-2 font-medium">Description</span>
              <Textarea
                required
                name="description"
                value={formData?.description}
                id="description"
                placeholder="Enter product description"
                className="min-h-32"
                minLength={30}
              />
              <div className="flex items-center justify-between relative">
                <p className="text-sm mx-2 text-muted-foreground">
                  Describe your product in detail. This helps customers make
                  informed decisions.
                </p>
                <AIButton
                  className="absolute right-2 top-1"
                  aiFor="description"
                  formData={formData}
                  setFormData={setFormData}
                >
                  Ask AI for Description
                </AIButton>
              </div>
            </label>
          </div>
          <div className="flex w-full gap-4">
            <CategorySubCategory formData={formData} />
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <label>
                <span className="mx-2 font-medium">Featured Product</span>
                <p className="text-sm mx-2 text-muted-foreground">
                  Featured products are displayed prominently on your store.
                </p>
              </label>
            </div>
            {/* <Switch /> */}
            <label class="inline-flex items-center cursor-pointer">
              <Input
                name="isFeatured"
                type="checkbox"
                value={true}
                id="isFeatured"
                defaultChecked={formData?.isFeatured === "true" ? true : false}
                class="sr-only peer"
              />
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Toggle me
              </span>
            </label>
          </div>
        </CardContent>
      </>
    </div>
  );
}

export default GeneralForm;
