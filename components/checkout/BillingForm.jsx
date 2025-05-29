"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import allCountries from "@/lib/country.json";
import { cn } from "@/lib/utils";

export default function BillingForm({
  onDataChange,
  session,
  formError = false,
}) {
  const [formData, setFormData] = useState({
    firstName: session?.firstName || "",
    lastName: session?.lastName || "",
    email: session?.email || "",
    countryCode: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const handleInputChange = (field, value) => {
    const newData = {
      ...formData,
      [field]: value,
    };
    setFormData(newData);
    onDataChange(newData);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            required
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className={cn(
              "transition-all duration-200 focus:ring-2 focus:ring-primary",
              formError &&
                !formData?.firstName &&
                "border-red-600 focus:ring-red-600"
            )}
          />
          {formError && !formData?.firstName && (
            <p className="text-red-600 text-xs mt-0.5">
              First Name is Required. Please Enter Your First Name.
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <div>
            <Input
              id="lastName"
              required
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className={cn(
                "transition-all duration-200 focus:ring-2 focus:ring-primary",
                formError &&
                  !formData?.lastName &&
                  "border-red-600 focus:ring-red-600"
              )}
            />
            {formError && !formData?.lastName && (
              <p className="text-red-600 text-xs mt-0.5">
                Last Name is Required. Please Enter Your Last Name.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div>
            <Input
              id="email"
              required
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={cn(
                "transition-all duration-200 focus:ring-2 focus:ring-primary",
                formError &&
                  !formData?.email &&
                  "border-red-600 focus:ring-red-600"
              )}
            />
            {formError && !formData?.email && (
              <p className="text-red-600 text-xs mt-0.5">
                Email is Required. Please Enter Your Email Address.
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div>
            <div className="flex">
              <Input
                htmlFor="phone"
                value={formData?.countryCode}
                disabled
                className={cn(
                  "max-w-20 border-0 border-l border-y rounded-r-none",
                  formError &&
                    !formData?.phone &&
                    "border-l-red-600 border-y-red-600 focus:ring-red-600"
                )}
              />
              <Input
                id="phone"
                required
                type="phone"
                placeholder="800‑555‑0199"
                value={formData.phone}
                disabled={!formData?.countryCode}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={cn(
                  "transition-all border-0 border-r border-y z-10 rounded-l-none duration-200 focus:ring-2 focus:ring-primary bg-background",
                  formError &&
                    !formData?.phone &&
                    "border-r-red-600 border-y-red-600 focus:ring-red-600"
                )}
              />
            </div>
            {formError && !formData?.phone && (
              <p className="text-red-600 text-xs mt-0.5">
                Phone Number is Required. Please Enter Your Phone Number.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Street Address</Label>
        <div>
          <Input
            id="address"
            required
            placeholder="123 Main Street"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className={cn(
              "transition-all duration-200 focus:ring-2 focus:ring-primary",
              formError &&
                !formData?.address &&
                "border-red-600 focus:ring-red-600"
            )}
          />
          {formError && !formData?.address && (
            <p className="text-red-600 text-xs mt-0.5">
              Address is Required. Please Enter Your Street Address.
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <div>
            <Input
              required
              id="city"
              placeholder="New York"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className={cn(
                "transition-all duration-200 focus:ring-2 focus:ring-primary",
                formError &&
                  !formData?.city &&
                  "border-red-600 focus:ring-red-600"
              )}
            />
            {formError && !formData?.city && (
              <p className="text-red-600 text-xs mt-0.5">
                City is Required. Please Enter Your City.
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <div>
            <Select
              required
              onValueChange={(value) => {
                const selectedCountry = allCountries.find(
                  (country) => country.code === value
                );
                setFormData({
                  ...formData,
                  countryCode: selectedCountry.code,
                  country: selectedCountry.name,
                });
                onDataChange({
                  ...formData,
                  countryCode: selectedCountry.code,
                  country: selectedCountry.name,
                });
              }}
            >
              <SelectTrigger
                className={cn(
                  "transition-all duration-200 focus:ring-2 focus:ring-primary",
                  formError &&
                    !formData?.country &&
                    "border-red-600 focus:ring-red-600"
                )}
              >
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {allCountries.map((country) => (
                  <SelectItem key={country?.name} value={country?.code}>
                    {country?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formError && !formData?.country && (
              <p className="text-red-600 text-xs mt-0.5">Select a country.</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <div>
            <Input
              required
              id="postalCode"
              placeholder="10001"
              value={formData.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
              className={cn(
                "transition-all duration-200 focus:ring-2 focus:ring-primary",
                formError &&
                  !formData?.postalCode &&
                  "border-red-600 focus:ring-red-600"
              )}
            />
            {formError && !formData?.postalCode && (
              <p className="text-red-600 text-xs mt-0.5">
                Postal Code is Required. Please Enter Your Postal Code.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
