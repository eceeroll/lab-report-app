import cx from "clsx";
import { useEffect, useState } from "react";
import {
  Table,
  ScrollArea,
  Textarea,
  Modal,
  TextInput,
  Button,
} from "@mantine/core";
import classes from "./TableStickyHeader.module.css";
import { Report } from "../../types";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import { formatDate } from "../../utils/formatDate";
import {
  useDeleteReportMutation,
  useGetReportByIdQuery,
  useUpdateReportMutation,
} from "../../features/report/reportApiSice";
import { useDisclosure } from "@mantine/hooks";

interface TableProps {
  reports: Report[];
}

export function TableStickyHeader({ reports }: TableProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isEditModalOpen, { open: showEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [deleteReport] = useDeleteReportMutation();
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [editData, setEditData] = useState({
    patientFirstName: "",
    patientLastName: "",
    patientTcNo: "",
    diagnosisTitle: "",
    diagnosisDetails: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const { data: selectedReport } = useGetReportByIdQuery(selectedReportId, {
    skip: !selectedReportId,
  });

  const [updateReport, { isLoading, isError }] = useUpdateReportMutation();

  const handleEdit = async (id) => {
    setSelectedReportId(id);
    showEditModal();
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      confirm("Are you sure?");
      await deleteReport({ id }).unwrap();
      alert("Report Deleted Successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedReport) {
      setEditData({
        patientFirstName: selectedReport.patient.firstName,
        patientLastName: selectedReport.patient.lastName,
        patientTcNo: selectedReport.patient.tcNo,
        diagnosisTitle: selectedReport.diagnosisTitle,
        diagnosisDetails: selectedReport.diagnosisDetails,
      });
    }
  }, [selectedReport]);

  // const handleInfoClick = async () => {};

  const handleSaveChanges = async () => {
    const updatedReport = await updateReport({ editData, selectedReportId });
    console.log(updatedReport);
  };

  const rows = reports.map((report) => (
    <Table.Tr key={report._id}>
      <Table.Td>{report.fileNumber}</Table.Td>
      <Table.Td>{formatDate(report.reportDate)}</Table.Td>
      <Table.Td>{report.patient.tcNo}</Table.Td>
      <Table.Td>
        <div className={classes.buttons}>
          <div
            onClick={() => handleEdit(report._id)}
            className={classes["icon-button"]}
          >
            <FaEdit size={16} />
          </div>
          <div
            className={classes["icon-button"]}
            onClick={() => handleDelete(report._id)}
          >
            <FaTrash size={16} />
          </div>
          <div className={classes["icon-button"]}>
            <FaInfoCircle size={16} />
          </div>
        </div>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <ScrollArea
        ml={160}
        h={300}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table miw={700}>
          <Table.Thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <Table.Tr>
              <Table.Th>File Number</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Patient ID</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>

      <Modal
        opened={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Report"
        size={"xs"}
      >
        {selectedReport ? (
          <form>
            <TextInput
              label="Patient First Name"
              value={editData.patientFirstName}
              onChange={(e) =>
                setEditData({ ...editData, patientFirstName: e.target.value })
              }
              disabled={!isEditing}
            />
            <TextInput
              label="Patient Last Name"
              value={editData.patientLastName}
              onChange={(e) =>
                setEditData({ ...editData, patientLastName: e.target.value })
              }
              disabled={!isEditing}
            />
            <TextInput
              label="Patient ID"
              value={editData.patientTcNo}
              onChange={(e) =>
                setEditData({ ...editData, patientTcNo: e.target.value })
              }
              disabled={!isEditing}
            />
            <TextInput
              label="Diagnosis Title"
              value={editData.diagnosisTitle}
              onChange={(e) =>
                setEditData({ ...editData, diagnosisTitle: e.target.value })
              }
              disabled={!isEditing}
            />
            <Textarea
              label="Diagnosis Details"
              value={editData.diagnosisDetails}
              onChange={(e) =>
                setEditData({ ...editData, diagnosisDetails: e.target.value })
              }
              disabled={!isEditing}
            />
            <Button onClick={() => handleSaveChanges()}>Save Changes</Button>
          </form>
        ) : (
          <p>Loading report data...</p>
        )}
      </Modal>
    </>
  );
}
