// src/components/GuestUpload.tsx
import React, { useState } from "react";
import * as XLSX from 'xlsx';
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import toast from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";

interface GuestUploadProps {
  eventId: string;
  onClose: () => void;
  loggedUser: any;
  handleFormNext: () => void;
}

const GuestUpload: React.FC<GuestUploadProps> = ({ eventId, onClose, loggedUser, handleFormNext }) => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const checkGuestsExist = useMutation(api.guests.checkGuestsExist);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCsvFile(e.target.files ? e.target.files[0] : null);
  };

  const downloadTemplate = (type: "guests") => {
    const file = type === "guests" ? "/templates/guest_template.xlsx" : "";
    if (file) {
      const link = document.createElement("a");
      link.href = file;
      link.download = file.split('/').pop(); // Extracts the filename for download attribute
      link.click();
    } else {
      toast.error("File not found");
      console.error("Invalid template type specified");
    }
  };

  const handleGuestUpload = async () => {
    if (!csvFile || !eventId || !loggedUser) {
      toast.error("Invalid file or event ID");
      return;
    }

    setLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const guestList = jsonData.map((guest: any) => ({
          name: guest.name,
          email: guest.email,
        }));

        const response = await checkGuestsExist({ guests: guestList, eventId });

        const combinedGuests = [
          ...response.existingGuests.map((g: any) => ({ ...g, status: 'On Atithi' })),
          ...response.nonExistentGuests.map((g: any) => ({ ...g, status: 'Not On Atithi' }))
        ];

        setGuests(combinedGuests);
        setCsvFile(null);
        setLoading(false);
      };

      reader.readAsArrayBuffer(csvFile);
    } catch (error) {
      console.error("Failed to upload guests:", error);
      setLoading(false);
    }
  };

  const handleNext = () => {
    handleFormNext();
  };

  return (
    <div className="px-2 py-6 md:p-6">
      <Dialog.Title className="text-2xl mb-4 flex flex-row justify-between items-end" style={{ color: 'black' }}>
        <span>Upload Guests CSV</span>
        <p className="cursor-pointer underline text-gray-600 text-base float-right" onClick={handleNext}>Do it later</p>
      </Dialog.Title>
      <p>The file should be in a specific template. Please <a className="underline italic text-red-500 cursor-pointer" onClick={() => downloadTemplate("guests")}>download our template</a> and ensure that the template matches.</p>
      <div className="mb-4">
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="w-full border rounded p-2 bg-gray-100 text-black" />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2 hover:bg-gray-600"
          onClick={onClose}
        >
          Back
        </button>
        <button
          type="button"
          className="bg-[#b00020] text-white font-bold py-2 px-4 rounded hover:bg-[#9b001a]"
          onClick={handleGuestUpload}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {guests.length > 0 && (
        <div className="mt-6 overflow-auto w-full">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest, index) => (
                <tr key={index} className={guest.status === 'On Atithi' ? 'bg-green-100' : 'bg-red-100'}>
                  <td className="py-2 px-4">{guest.name}</td>
                  <td className="py-2 px-4">{guest.email}</td>
                  <td className="py-2 px-4">{guest.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {handleFormNext != null && guests.length !== 0 && (
        <button
          type="button"
          className="bg-[#b00020] text-white font-bold py-2 px-4 rounded hover:bg-[#9b001a] mt-4 float-right"
          onClick={handleNext}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default GuestUpload;
