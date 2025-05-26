"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Truck, Zap, Clock } from "lucide-react";

export default function ShippingMethod({ selectedMethod, onMethodChange }) {
  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "5-7 business days",
      price: 5.99,
      icon: Truck,
      estimatedDays: "5-7 days",
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "2-3 business days",
      price: 12.99,
      icon: Zap,
      estimatedDays: "2-3 days",
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      description: "Next business day",
      price: 24.99,
      icon: Clock,
      estimatedDays: "1 day",
    },
  ];

  return (
    <RadioGroup value={selectedMethod} onValueChange={onMethodChange}>
      <div className="space-y-3">
        {shippingOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <div key={option.id}>
              <Label htmlFor={option.id} className="cursor-pointer">
                <Card
                  className={`p-4 transition-all duration-200 hover:shadow-md ${
                    selectedMethod === option.id
                      ? "ring-2 ring-primary bg-primary/10 dark:bg-primary/20"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <div className="flex items-center space-x-3 flex-1">
                      <div
                        className={`p-2 rounded-lg ${
                          selectedMethod === option.id
                            ? "bg-primary/20 dark:bg-primary/30"
                            : "bg-gray-100 dark:bg-gray-700"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            selectedMethod === option.id
                              ? "text-primary"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {option.name}
                          </h3>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            ${option.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Label>
            </div>
          );
        })}
      </div>
    </RadioGroup>
  );
}
