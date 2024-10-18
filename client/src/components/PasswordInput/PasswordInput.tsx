import { PasswordInput, Text, Group, Anchor } from "@mantine/core";

interface IForgotPasswordInputProps {
  name?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ForgotPasswordInput({
  name,
  value,
  onChange,
}: IForgotPasswordInputProps) {
  return (
    <>
      <Group justify="space-between" mb={5}>
        <Text component="label" htmlFor="your-password" size="sm" fw={500}>
          Your password
        </Text>

        <Anchor
          href="#"
          onClick={(event) => event.preventDefault()}
          pt={2}
          fw={500}
          fz="xs"
        >
          Forgot your password?
        </Anchor>
      </Group>
      <PasswordInput
        name={name}
        value={value}
        onChange={onChange}
        placeholder="Your password"
        id="your-password"
      />
    </>
  );
}
