"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CreditCard, Banknote } from "lucide-react";

export default function PaymentMethod({ selectedMethod, onMethodChange }) {
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const paymentOptions = [
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      icon: CreditCard,
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      description: "Pay when you receive your order",
      icon: Banknote,
    },
  ];

  return (
    <div className="space-y-4">
      <RadioGroup value={selectedMethod} onValueChange={onMethodChange}>
        <div className="space-y-3">
          {paymentOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div key={option.id}>
                <Label htmlFor={option.id} className="cursor-pointer">
                  <Card
                    className={`p-4 transition-all duration-200 hover:shadow-md ${
                      selectedMethod === option.id
                        ? "ring-2 ring-primary bg-primary/10 dark:bg-primary/20"
                        : " hover:bg-foreground/5"
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
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {option.name}
                          </h3>
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
      {selectedMethod === "cod" && (
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
          <p className="text-sm text-amber-700 dark:text-amber-300">
            You will pay in cash when your order is delivered to your address.
          </p>
        </div>
      )}
    </div>
  );
}
