import PlanCard from "../Plan/Card";

interface SelectPlanProps {
  formData: { plan: string; billing: "monthly" | "yearly" };
  handlePlanSelect: (plan: string) => void;
  toggleBilling: () => void;
  plans: { id: string; name: string; price: { monthly: number; yearly: number }; icon: string }[]
}

const SelectPlan = ({ formData, handlePlanSelect, toggleBilling, plans }: SelectPlanProps) => (
  <div>
    <div className="text-primary text-xl md:text-lg font-semibold mb-xs">Select your plan</div>
    <div className="text-text">You have the option of monthly or yearly billing</div>
    <div className="mt-lg">
      <div className="flex flex-wrap gap-sm">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            id={plan.id}
            name={plan.name}
            price={formData.billing === "monthly" ? plan.price.monthly : plan.price.yearly}
            billing={formData.billing}
            selected={formData.plan === plan.id}
            onSelect={handlePlanSelect}
            icon={plan.icon}
          />
        ))}
      </div>
      <div className="flex justify-center items-center gap-sm mt- bg-lightBg rounded-xs mt-md p-sm">
        <span className={formData.billing === "monthly" ? "text-primary" : "text-text"}>
          Monthly
        </span>
        <div
          className="w-[42px] h-[24px] bg-primary rounded-[50px] flex items-center p-[2px] cursor-pointer"
          onClick={toggleBilling}
        >
          <div className={`w-[16px] h-[16px] bg-white rounded-[50px] transition-transform duration-200 ${formData.billing === "yearly" ? "translate-x-[20px]" : "translate-x-[2px]"}`}></div>
        </div>
        <span className={formData.billing === "yearly" ? "text-primary" : "text-text"}>
          Yearly
        </span>
      </div>
    </div>
  </div>
)

export default SelectPlan;
