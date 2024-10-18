import { useForm } from "@mantine/form";
import { TextInput, Textarea, Button } from "@mantine/core";
import { useCreateReportMutation } from "../../features/report/reportApiSice";
import { IconX, IconCheck } from "@tabler/icons-react";
import { Notification, rem } from "@mantine/core";
import { useEffect, useState } from "react";
import classes from "./ReportForm.module.css";

interface FormValues {
  patientFirstName: string;
  patientLastName: string;
  patientTcNo: string;
  diagnosisTitle: string;
  diagnosisDetails: string;
  reportImage?: File | null;
}

export default function ReportForm() {
  const [createReport, { isLoading }] = useCreateReportMutation();
  const [success, setSuccess] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  const form = useForm({
    initialValues: {
      patientFirstName: "",
      patientLastName: "",
      patientTcNo: "",
      diagnosisTitle: "",
      diagnosisDetails: "",
    },
    validate: {
      patientFirstName: (value) =>
        value.length > 0 ? null : "First name is required",
      patientLastName: (value) =>
        value.length > 0 ? null : "Last name is required",
      patientTcNo: (value) => {
        const regex = /^\d{11}$/;
        return regex.test(value) ? null : "TC Number must be exactly 11 digits";
      },
      diagnosisTitle: (value) =>
        value.length > 0 ? null : "Diagnosis title is required",
      diagnosisDetails: (value) =>
        value.length > 0 ? null : "Diagnosis details is required ",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsFormSubmit(true);
    try {
      await createReport(values).unwrap();
      setSuccess(true);
      setNotificationMessage("Report created successfully!");
    } catch (error) {
      setSuccess(false);
      console.error(error);
      setNotificationMessage("An error occured!");
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>; // timer'ı dışarıda tanımlıyoruz

    if (isFormSubmit) {
      timer = setTimeout(() => {
        setIsFormSubmit(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [isFormSubmit]);

  return (
    <div className={classes.formContainer}>
      <h2 className={classes.formTitle}>Create New Report</h2>

      {isFormSubmit && (
        <Notification
          withCloseButton={false}
          style={{ width: "30%" }}
          icon={success ? checkIcon : xIcon}
          color={success ? "teal" : "red"}
          title={success ? "All good!" : "Bummer!"}
        >
          {notificationMessage}
        </Notification>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className={classes.formGrid}>
          <div>
            <label className={classes.formLabel}>Patient First Name</label>
            <TextInput
              className={classes.formInput}
              {...form.getInputProps("patientFirstName")}
            />
          </div>

          <div>
            <label className={classes.formLabel}>Patient Last Name</label>
            <TextInput
              className={classes.formInput}
              {...form.getInputProps("patientLastName")}
            />
          </div>

          <div>
            <label className={classes.formLabel}>Patient TC No</label>
            <TextInput
              className={classes.formInput}
              {...form.getInputProps("patientTcNo")}
            />
          </div>

          <div>
            <label className={classes.formLabel}>Diagnosis Title</label>
            <TextInput
              className={classes.formInput}
              {...form.getInputProps("diagnosisTitle")}
            />
          </div>

          <div className={classes.fullWidth}>
            <label className={classes.formLabel}>Diagnosis Details</label>
            <Textarea
              className={classes.formTextarea}
              {...form.getInputProps("diagnosisDetails")}
            />
          </div>

          {/* <div className={classes.fullWidth}>
            <label className={classes.formLabel}>Report Image</label>
            <input
              type="file"
              name="reportImage"
              placeholder="Upload an image"
              className={classes.imageUpload}
              onChange={handleFileChange}
            />
          </div> */}

          <div className={classes.fullWidth}>
            <Button
              disabled={isLoading}
              type="submit"
              className={classes.formButton}
            >
              Submit Report
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
