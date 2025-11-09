"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/redux/store";
import Modal from "./Modal";
import {
  onCloseLoginModal,
  setLoading,
} from "@/redux/features/login/loginSlice";
import { Controller, useForm } from "react-hook-form";
import type z from "zod";
import type { LOGIN_SCHEMA } from "@/validation";
import Input from "../ui/Input";
import Heading from "../ui/Heading";
import MyButton from "../ui/MyButton";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // <-- client-side helper
type LoginFormData = z.infer<typeof LOGIN_SCHEMA>;
const LoginModal = () => {
  const { isOpenLoginModal, loading } = useAppSelector(
    (state: RootState) => state.login
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handelClose = () => {
    dispatch(onCloseLoginModal());
  };

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    dispatch(setLoading(true));
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error("Invalid credentials");
      }
      if (callback?.ok && !callback?.error) {
        toast.success("Logged in successfully");
        dispatch(onCloseLoginModal());
        dispatch(setLoading(false));
        reset({
          email: "",
          password: "",
        });
      }
      router.refresh();
    });
  };

  const body = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subTitle="Login in to your account" />
      <form className="space-y-4">
        <Controller
          rules={{ required: true }}
          control={control}
          name="email"
          render={() => (
            <Input
              label="Email"
              error={errors.email}
              name="email"
              type="email"
              field={register("email")}
              disabled={loading}
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
              disabled={loading}
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
        onClick={() => {}}
        outline={true}
        label="Continue with Goggle"
        icon={FcGoogle}
        disabled={loading}
      />
      <MyButton
        onClick={() => {}}
        outline={true}
        label="Continue with Github"
        icon={BsGithub}
        disabled={loading}
      />

      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="">
          New to Airbnb?{" "}
          <button
            onClick={() => {
              //TODO ==> Close Register modal and show the login modal
            }}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      actionLabel="Login"
      onClose={handelClose}
      isOpen={isOpenLoginModal}
      title="Login"
      onSubmit={handleSubmit(onSubmit)}
      disable={loading}
      body={body}
      footer={modalFooter}
    />
  );
};

export default LoginModal;
