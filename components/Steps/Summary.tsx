import React from "react";

interface SummaryProps {
    formData: {
        name: string;
        email: string;
        phone: string;
        plan: string;
        billing: "monthly" | "yearly";
        addOns?: string[];
    };
    plans: { id: string; name: string; price: { monthly: number; yearly: number }; icon: string }[];
    addOnsList: { id: string; name: string; description: string; price: { monthly: number; yearly: number } }[];
    handleEdit: (step: number) => void;
}

const Summary: React.FC<SummaryProps> = ({ formData, plans, addOnsList, handleEdit }) => {
    const selectedPlan = plans.find(plan => plan.id === formData.plan)

    const selectedAddOns = formData.addOns?.map(addOnId =>
        addOnsList.find(addOn => addOn.id === addOnId)
    ) || [];

    // Calculate the total price
    const planPrice = selectedPlan?.price[formData.billing] || 0;
    const addOnsPrice = selectedAddOns.reduce((total, addOn) => {
        const addOnPrice = addOn?.price[formData.billing]
        return total + (addOnPrice ? addOnPrice : 0)
    }, 0)

    const totalPrice = planPrice + addOnsPrice

    return (
        <div>
            <div className="text-primary text-xl md:text-lg font-semibold mb-xs">Finishing up</div>
            <div className="text-text">Double-check everything looks OK before confirming.</div>
            <div className="space-y-md mt-lg">
                <div className="p-md rounded-sm bg-[#f8f9ff]">
                    <div className="flex justify-between items-center border-b pb-sm">
                        <div>
                            <div className="text-base font-bold text-primary">
                                {selectedPlan?.name} ({formData.billing})
                            </div>
                            <button
                                type="button"
                                onClick={() => handleEdit(1)}
                                className="text-text underline text-sm"
                            >
                                Change
                            </button>
                        </div>
                        <div className="font-semibold text-primary">
                            ${planPrice}
                        </div>
                    </div>

                    {/* Add-Ons Section */}
                    <div className="space-y-sm mt-sm">
                        {selectedAddOns.map((addOn) => (
                            <div key={addOn?.id} className="flex justify-between items-center">
                                <span className="text-sm text-text">{addOn?.name}</span>
                                <span className="text-sm text-primary">+${addOn?.price[formData.billing]}/{formData.billing}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Total Section */}
                <div className="flex justify-between items-center px-md">
                    <span className="text-text">Total (per {formData.billing})</span>
                    <span className="font-bold text-secondary text-base">${totalPrice}/{formData.billing}</span>
                </div>
            </div>
        </div>
    );
};

export default Summary;
