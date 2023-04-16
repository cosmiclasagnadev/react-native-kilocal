import {FullHeightGreenBG} from "@/components/pageShells/";
import Link from "next/link";
import React from "react";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import CustomInputField from "@/components/CustomInputField";

const FirstTimeUsing = () => {
  const [formValues, setFormValues] = React.useState({
    firstName: "",
    lastName: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formValues);
  }

  // function for handling form input changes
  function handleChange(e) {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
  }

  return (
    <>
      <IonHeader color={`green`}>
        <IonToolbar>
          <IonTitle>First Time Using</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className="flex items-start justify-center bg-green-200 text-3xl h-screen pt-10">
        <div className="px-3">
          <h1 className="font-black text-2xl">Collect Health Details</h1>
          <p className="text-[14px] leading-snug font-normal mb-5">
            Enter your details below to create an accurate health profile
          </p>
          <form onSubmit={handleSubmit}>
            <CustomInputField
              onChange={handleChange}
              name="firstName"
              placeholder={"First Name"}
            />
            <CustomInputField
              onChange={handleChange}
              name="lastName"
              placeholder={"Last Name"}
            />
            <IonSelect aria-label="sex" placeholder="Biological Sex">
              <IonSelectOption value="male">Male</IonSelectOption>
              <IonSelectOption value="female">Female</IonSelectOption>
            </IonSelect>
            <button
              className="bg-green-600 active:bg-green-400 transition-all ease-in-out text-sm px-5 py-3 rounded-lg"
              type="submit"
            >
              <span>Submit</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FirstTimeUsing;
