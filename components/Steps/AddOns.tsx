import React from "react";

interface AddOnsProps {
  formData: {
    billing: "monthly" | "yearly";
    addOns?: string[]
  };
  handleAddOnSelect: (addOn: string) => void
  addOnsList: { id: string; name: string; description: string; price: { monthly: number; yearly: number } }[]
}

const AddOns: React.FC<AddOnsProps> = ({ formData, handleAddOnSelect, addOnsList }) => {
  return (
    <div>
      <div className="text-primary text-xl md:text-lg font-semibold mb-xs">Pick add-ons</div>
      <div className="text-text">Add-ons help enhance your gaming experience</div>
      <div className="space-y-sm mt-lg">
        {addOnsList.map((addOn) => (
          <div
            key={addOn.id}
            className={`flex items-center gap-md border p-sm md:p-md rounded-xs cursor-pointer ${formData.addOns?.includes(addOn.id) ? "bg-lightBg border-secondary" : "border-border"} hover:border-secondary`}
            onClick={() => handleAddOnSelect(addOn.id)}
          >
            <div className={`w-md h-md border rounded-[4px] p-xs ${formData.addOns?.includes(addOn.id) ? 'bg-secondary' : 'border-border bg-white'}`}>
              <img src='/check.svg' />
            </div>
            <div className="flex justify-between w-[-webkit-fill-available] items-center">
              <div>
                <div className="font-bold text-primary text-base">{addOn.name}</div>
                <p className="text-sm text-text">{addOn.description}</p>
              </div>
              <div className="text-secondary font-semibold">+${addOn.price[formData.billing]}/{formData.billing}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddOns;