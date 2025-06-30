import { Fragment, useState } from "react";
import { Button, Stack, TextField, type TextFieldProps } from "@mui/material";
import { z } from "zod/v4";

const formSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters long." })
    .max(20, { message: "Username must be at most 20 characters long." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

type FormData = z.infer<typeof formSchema>;

export const FormWithZod = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<keyof FormData, string[]>>({
    password: [],
    username: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: [],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = formSchema.safeParse(formData);

    if (parsed.success) {
      console.log("Form data:", parsed.data);
      alert("Form submitted successfully!");
    } else {
      const flatten = z.flattenError(parsed.error).fieldErrors;
      const keys = Object.keys(formData) as Array<keyof FormData>;

      setErrors(
        keys.reduce((acc, key) => {
          acc[key] = flatten[key] || [];
          return acc;
        }, {} as typeof errors)
      );
    }
  };

  const getProps = (name: keyof FormData): TextFieldProps => {
    return {
      value: formData[name],
      name,
      onChange: handleChange,
      error: errors[name].length > 0,
      helperText: (
        <span>
          {errors[name].map((msg) => (
            <Fragment key={msg}>
              <span>{msg}</span>
              <br />
            </Fragment>
          ))}
        </span>
      ),
    };
  };

  return (
    <Stack
      component="form"
      noValidate
      autoComplete="off"
      sx={{ maxWidth: "400px", mx: "auto" }}
      spacing={2}
      useFlexGap
      onSubmit={handleSubmit}
    >
      <TextField label="Username" {...getProps("username")} />
      <TextField label="Password" type="password" {...getProps("password")} />
      <Button type="submit" variant="contained" size="large" sx={{ mt: 1 }}>
        Register
      </Button>
    </Stack>
  );
};
