"use client";
// import { AiFillGithub } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";
// import { useCallback, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGISTER_SCHEMA } from "@/validation";
import type z from "zod";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/redux/store";
import { onClose, registerUser } from "@/redux/features/register/registerSlice";
import Heading from "../ui/Heading";
import Input from "../ui/Input";
import MyButton from "../ui/MyButton";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
type FormType = z.infer<typeof REGISTER_SCHEMA>;

const RegisterModal = () => {
  const { loading, isOpen } = useAppSelector(
    (state: RootState) => state.register
  );
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(REGISTER_SCHEMA),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormType> = (data) => {
    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        dispatch(onClose());
      })
      .catch((error) => {
        toast.error(error || "Something went wrong!");
      });
  };

  const handleClose = () => {
    dispatch(onClose());
  };

  // Body ot the modal
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subTitle="Create An Account" />
      <form className="space-y-4">
        <Controller
          rules={{ required: true }}
          control={control}
          name="name"
          render={() => (
            <Input
              label="name"
              error={errors.name}
              name="name"
              type="text"
              field={register("name")}
            />
          )}
        />
        <Controller
          rules={{ required: true }}
          control={control}
          name="email"
          render={() => (
            <Input
              error={errors.email}
              name="email"
              type="email"
              label="Email"
              field={register("email")}
            />
          )}
        />
        <Controller
          rules={{ required: true }}
          control={control}
          name="password"
          render={() => (
            <Input
              error={errors.password}
              name="password"
              type="password"
              label="Password"
              field={register("password")}
            />
          )}
        />
      </form>
    </div>
  );

  const modalFooter = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <MyButton
        onClick={() => signIn("google")}
        outline={true}
        label="Continue with Google"
        icon={FcGoogle}
      />
      <MyButton
        onClick={() => signIn("github")}
        outline={true}
        label="Continue with Github"
        icon={BsGithub}
      />

      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="">
          Already have an account?{" "}
          <button
            onClick={() => {
              //TODO ==> Close Register modal and show the login modal
            }}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disable={loading}
      isOpen={isOpen}
      title="Register"
      actionLabel="continue"
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={modalFooter}
    />
  );
};

export default RegisterModal;
