import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PersonalInfo from "../components/Steps/PersonalInfo";
import SelectPlan from "../components/Steps/SelectPlan";
import AddOns from "../components/Steps/AddOns";
import Summary from "../components/Steps/Summary";
import Success from "../components/Success";

interface FormState {
  name: string;
  email: string;
  phone: string;
  plan: string;
  billing: "monthly" | "yearly";
  addOns?: string[]
}
const steps = ["Your info", "Select plan", "Add-ons", "Summary"]
const addOnsList = [
  { id: "addon1", name: "Online service", description: "Access to multilayer games", price: { monthly: 1, yearly: 10 } },
  { id: "addon2", name: "Larger storage", description: "Extra 1TB of cloud storage", price: { monthly: 2, yearly: 20 } },
  { id: "addon3", name: "Customizable profile", description: "Custom theme on your profile", price: { monthly: 2, yearly: 20 } },
]
const plans = [
  { id: "arcade", name: "Arcade", icon: '/arcade.svg', price: { monthly: 9, yearly: 90 } },
  { id: "advanced", name: "Advanced", icon: '/advanced.svg', price: { monthly: 12, yearly: 120 } },
  { id: "pro", name: "Pro", icon: '/pro.svg', price: { monthly: 15, yearly: 150 } },
]

export default function Home() {
  const [step, setStep] = React.useState(0);
  const [formData, setFormData] = React.useState<FormState>({
    name: "",
    email: "",
    phone: "",
    plan: "arcade",
    billing: "monthly",
  })
  const [isSuccess, setIsSuccess] = React.useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [])

  const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    plan: z.string().min(1, { message: "Plan is required" }),
    billing: z.enum(["monthly", "yearly"]),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormState>({
    resolver: zodResolver(schema),
    defaultValues: formData,
  });

  // Reset the form whenever formData changes
  useEffect(() => {
    reset(formData);
  }, [formData, reset]);


  const onSubmit = (data: FormState) => {
    const updatedData = { ...formData, ...data }
    setFormData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData))

    if (step === steps.length - 1) {
      setIsSuccess(true)
      resetForm()
    } else {
      if (step < steps.length - 1) {
        setStep(step + 1);
      }
    }
  }

  const toggleBilling = () => {
    setFormData((prev) => ({
      ...prev,
      billing: prev.billing === "monthly" ? "yearly" : "monthly",
    }))
  }

  const handlePlanSelect = (plan: string) => {
    setFormData((prev) => ({ ...prev, plan }));
  }

  const handleAddOnSelect = (addOn: string) => {
    setFormData((prev) => {
      const isSelected = prev.addOns?.includes(addOn);
      const updatedAddOns = isSelected
        ? prev.addOns?.filter((id) => id !== addOn)
        : [...(prev.addOns || []), addOn];
      return { ...prev, addOns: updatedAddOns };
    });
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      plan: "arcade",
      billing: "monthly",
    })
    localStorage.removeItem("formData");
  }

  return (
    <div className="w-full h-lvh md:flex md:items-center md:justify-center md:p-sm">
      <div className="flex flex-col md:flex-row md:bg-white w-full md:flex md:p-md md:w-[960px] max-w-full md:h-[650px] md:rounded-md gap-sm">
        <div className="w-full h-[200px] md:h-full md:w-[300px] bg-[url('/bg.svg')] bg-no-repeat bg-[bottom_-95px_right] md:bg-center bg-cover md:rounded-sm p-lg flex flex-row md:flex-col justify-center items-start md:justify-start gap-md text-white">
          {steps.map((value, i) => (
            <div className="flex items-center gap-sm" key={i}>
              <div
                className={`outline outline-1 outline-blue flex items-center justify-center rounded-full w-[36px] h-[36px] font-bold ${step === i && "bg-blue text-primary"
                  }`}
              >
                {i + 1}
              </div>
              <div className="hidden md:block uppercase">
                <div className="text-text2">Step {i + 1}</div>
                <div className="font-bold text-base">{value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="m-sm bg-white absolute overflow-auto top-[100px] max-h-[73vh] md:max-h-full w-[_-webkit-fill-available] p-md rounded-sm md:relative md:top-0 md:w-[calc(100%-300px)]">
          {!isSuccess ?
            <form onSubmit={handleSubmit(onSubmit)}>
              {step === 0 ?
                <PersonalInfo formData={formData} errors={errors} register={register} />
                : step === 1 ?
                  <SelectPlan
                    formData={formData}
                    handlePlanSelect={handlePlanSelect}
                    toggleBilling={toggleBilling}
                    plans={plans}
                  />
                  : step === 2 ?
                    <AddOns formData={formData} handleAddOnSelect={handleAddOnSelect} addOnsList={addOnsList} />
                    : step === 3 &&
                    <Summary
                      formData={formData}
                      plans={plans}
                      addOnsList={addOnsList}
                      handleEdit={setStep}
                    />
              }
              <div className={`bg-white fixed left-0 right-0 bottom-0 p-sm flex ${step == 0 ? 'justify-end' : 'justify-between'} md:absolute md:p-0 md:mx-lg md:mb-lg`}>
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="bg-white px-md py-sm text-text rounded-xs"
                  >
                    Go Back
                  </button>
                )}
                <button
                  type="submit"
                  className='px-md py-sm text-white font-semibold rounded-xs bg-primary'
                >
                  {step === 3 ? "Confirm" : "Next Step"}
                </button>
              </div>
            </form>
            :
            <Success
              message="Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com."
            />
          }
        </div>
      </div>
    </div>
  );
}
