import classes from "./RegisterForm.module.css";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode, useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Container,
  Modal,
  Text,
  Group,
} from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";
import { useRegisterUserMutation } from "../../features/user/userApiSlice";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  tc_no: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [opened, { open, close }] = useDisclosure(false);

  const [modalContent, setModalContent] = useState<{
    success: boolean;
    title: string;
    message: ReactNode;
  } | null>(null);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      tc_no: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      firstName: (value: string) =>
        value.length < 2 ? "Please enter a valid first name" : null,
      lastName: (value: string) =>
        value.length < 2 ? "Please enter a valid last name" : null,
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Please enter a valid email",
      username: (value: string) =>
        value.length < 3
          ? "The username must be at least 8 characters long."
          : null,
      tc_no: (value: string) =>
        value.length !== 11 ? "ID must be 11 characters." : null,
      password: (value: string) =>
        value.length < 6
          ? "The username must be at least 6 characters long."
          : null,
      confirmPassword: (value: string, values: FormValues) =>
        value !== values.password ? "Passwords are not matching!" : null,
    },
  });

  // Form gönderim işlemi
  const handleSubmit = async (values: FormValues) => {
    try {
      const result = await registerUser(values).unwrap();
      console.log("User registered successfully", result);
      setModalContent({
        success: true,
        title: "Success!",
        message: (
          <>
            <p> Registration successful!</p>
            <Text
              component="a"
              href="/login"
              style={{
                textDecoration: "underline",
                color: "blue",
                cursor: "pointer",
              }}
              onClick={() => {
                setTimeout(() => {
                  window.location.href = "/login";
                }, 2000);
              }}
            >
              Please log in to continue.
            </Text>
          </>
        ),
      });
    } catch (err) {
      const apiError: { data: { message: string }; status: number } = err as {
        data: { message: string };
        status: number;
      };
      setModalContent({
        success: false,
        title: "Hata!",
        message: apiError.data.message,
      });
    } finally {
      open();
    }
  };

  return (
    <Container className={classes["form-container"]} size="lg" mt="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className={classes["input-group"]}>
          <TextInput
            label="Firstname"
            placeholder="Enter your firstname"
            {...form.getInputProps("firstName")}
          />
        </div>
        <div className={classes["input-group"]}>
          <TextInput
            label="Lastname"
            placeholder="Enter your lastname"
            {...form.getInputProps("lastName")}
          />
        </div>
        <div className={classes["input-group"]}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            {...form.getInputProps("email")}
          />
        </div>
        <div className={classes["input-group"]}>
          <TextInput
            label="Username"
            placeholder="Enter your username"
            {...form.getInputProps("username")}
          />
        </div>
        <div className={classes["input-group"]}>
          <TextInput
            label="ID"
            placeholder="Enter your ID"
            maxLength={11}
            {...form.getInputProps("tc_no")}
          />
        </div>
        <div className={classes["input-group"]}>
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            {...form.getInputProps("password")}
          />
        </div>
        <div className={classes["input-group"]}>
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            {...form.getInputProps("confirmPassword")}
          />
        </div>
        <div className={classes["button-group"]}>
          <Button disabled={isLoading} type="submit">
            Register
          </Button>
        </div>
      </form>
      {modalContent && (
        <Modal
          opened={opened}
          onClose={close}
          centered
          title={modalContent.title}
        >
          <Group className={classes.modalContent} mt="md">
            {modalContent.success ? (
              <IconCheck size={128} color="green" />
            ) : (
              <IconX size={128} color="red" />
            )}
          </Group>
          <Text className={classes.modalText}>{modalContent.message}</Text>
        </Modal>
      )}
    </Container>
  );
}
