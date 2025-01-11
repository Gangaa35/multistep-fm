import TextInput from "../InputTypes/Text";

interface PersonalInfoProps {
    formData: { name: string; email: string; phone: string };
    errors: any;
    register: any;
}

const PersonalInfo = ({ formData, errors, register }: PersonalInfoProps) => (
    <>
        <div className="text-primary text-xl md:text-lg font-semibold mb-xs">Personal info</div>
        <div className="text-text">Please provide your name, email address, and phone number.</div>
        <div className="mt-lg">
            <TextInput
                label="Name"
                name="name"
                register={register}
                placeholder="Enter your name"
                required
                error={errors.name?.message}
            />
            <TextInput
                label="Email Address"
                name="email"
                register={register}
                placeholder="Enter your email"
                required
                error={errors.email?.message}
            />
            <TextInput
                label="Phone number"
                name="phone"
                register={register}
                placeholder="Enter your phone number"
                required
                error={errors.phone?.message}
            />
        </div>
    </>
);

export default PersonalInfo;
