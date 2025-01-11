import React from "react";

interface PlanCardProps {
    id: string;
    name: string;
    price: number;
    billing: "monthly" | "yearly";
    selected: boolean;
    onSelect: (id: string) => void;
    icon: string
}

const PlanCard: React.FC<PlanCardProps> = ({
    id,
    name,
    price,
    billing,
    selected,
    onSelect,
    icon,
}) => {
    return (
        <div
            onClick={() => onSelect(id)}
            className={`cursor-pointer border rounded-sm p-md w-full md:w-[calc((100%-24px)/3)] flex md:flex-col items-center md:items-start gap-sm md:gap-xl transition-all duration-300 ${selected ? "border-secondary bg-lightBg shadow-md" : "border-border"}`}
        >
            {icon && <img src={icon} />}
            <div className="flex flex-col gap-[2px]">
                <div className="text-base md:text-md font-semibold text-primary">{name}</div>
                <div className="text-sm text-text">
                    ${price}/{billing === "monthly" ? "mo" : "yr"}
                </div>
                {billing === "yearly" && (
                    <div className="text-sm text-primary">2 months free</div>
                )}
            </div>
        </div>
    );
};

export default PlanCard;