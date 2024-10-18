import { SegmentedControl } from "@mantine/core";
import classes from "./SegmentControl.module.css";

interface SegmentControlProps {
  activeForm: string;
  setActiveForm: (form: string) => void;
}

export default function SegmentControl({
  activeForm,
  setActiveForm,
}: SegmentControlProps) {
  return (
    <SegmentedControl
      radius="xl"
      size="md"
      data={["Login", "Slgn Up"]}
      value={activeForm}
      onChange={setActiveForm}
      classNames={classes}
    />
  );
}
