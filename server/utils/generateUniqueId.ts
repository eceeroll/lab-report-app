import ShortUniqueId from "short-unique-id";
import Report from "../models/Report";

export const generateUniqueId = async (length: number) => {
  const uid = new ShortUniqueId({ length, dictionary: "number" });

  let newFileNumber: string;
  let isUnique = false;

  do {
    newFileNumber = uid.rnd();
    const existingReport = await Report.findOne({ fileNumber: newFileNumber });
    if (!existingReport) {
      isUnique = true;
    }
  } while (!isUnique);
  return newFileNumber;
};
