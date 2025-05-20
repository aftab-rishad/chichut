"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon, Check } from "lucide-react";
import ColorPicker from "react-pick-color";
import { useState } from "react";

function SelectColor({ productColor, setProductColor }) {
  const [color, setColor] = useState("#fff");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const handleRemoveColor = (index) => {
    setProductColor((prev) => {
      const newColors = [...prev];
      newColors.splice(index, 1);
      return newColors;
    });
  };

  const handleAddColor = () => {
    setProductColor((prev) => [...prev, color]);
    setIsColorPickerOpen(false);
  };

  return (
    <div className={`flex flex-col ${productColor?.length > 0 ? "gap-2" : ""}`}>
      <span className="flex flex-wrap gap-2">
        {productColor?.map((color, index) => (
          <div
            onClick={() => {
              handleRemoveColor(index);
            }}
            key={index}
            style={{
              backgroundColor: color,
            }}
            className={`w-6 h-6 rounded-md items-center justify-center flex cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 border border-foreground`}
          >
            <XIcon className="h-full w-full p-1 text-foreground opacity-0 hover:opacity-100 transition-all duration-200 ease-in-out" />
          </div>
        ))}
      </span>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant={"outline"}
          onClick={() => {
            setIsColorPickerOpen((prev) => !prev);
          }}
        >
          {isColorPickerOpen ? "Close" : "Select"} Color
          {isColorPickerOpen ? (
            <XIcon className="h-8 w-8" />
          ) : (
            <PlusIcon className="h-8 w-8" />
          )}
        </Button>
        <Button
          type="button"
          disabled={!isColorPickerOpen}
          size="icon"
          variant={"outline"}
          onClick={handleAddColor}
        >
          <Check className="h-8 w-8" />
        </Button>
      </div>
      {isColorPickerOpen && (
        <div className="relative mt-1 z-10">
          <ColorPicker
            className="absolute z-10"
            color={color}
            onChange={(color) => setColor(color.hex)}
          />
        </div>
      )}
    </div>
  );
}

export default SelectColor;
