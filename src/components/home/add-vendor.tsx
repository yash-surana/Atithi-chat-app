// src/components/VendorUpload.tsx
import React, { useState } from "react";
import * as XLSX from 'xlsx';
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import toast from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";

interface VendorUploadProps {
  eventId: string;
  onClose: () => void;
  loggedUser: any;
  handleFormNext : () => void;
}

const VendorUpload: React.FC<VendorUploadProps> = ({ eventId, onClose, loggedUser, handleFormNext }) => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const checkVendorsExist = useMutation(api.vendor.checkVendorsExist);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCsvFile(e.target.files ? e.target.files[0] : null);
  };

  const downloadTemplate = (type: "vendors") => {
    const file = type === "vendors" ? "/templates/vendor_template.xlsx" : "";
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

  const handleVendorUpload = async () => {
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

        const vendorList = jsonData.map((vendor: any) => ({
          name: vendor.name,
          email: vendor.email,
        //   phone: vendor.phone,
        //   taskType: vendor.role, // Assuming the role from CSV is the task type
        }));

        const response = await checkVendorsExist({ vendors: vendorList, eventId });

        const combinedVendors = [
          ...response.existingVendors.map((v: any) => ({ ...v, status: 'On Atithi' })),
          ...response.nonExistentVendors.map((v: any) => ({ ...v, status: 'Not On Atithi' }))
        ];

        setVendors(combinedVendors);
        setCsvFile(null);
        setLoading(false);
      };

      reader.readAsArrayBuffer(csvFile);
    } catch (error) {
      console.error("Failed to upload vendors:", error);
      setLoading(false);
    }
  };

  const handleNext = () => {
handleFormNext();
  }

  return (
    <div className=" px-2 py-6 md:p-6">
      <Dialog.Title className="text-2xl mb-4 flex flex-row justify-between items-end" style={{ color: 'black' }}><span>Upload Vendors CSV</span> <p className="cursor-pointer underline text-gray-600 text-base float-right " onClick={handleNext}>Do it later</p></Dialog.Title>
      <p>The file should be in a specific template. Please <a className="underline italic text-red-500 cursor-pointer" onClick={() => downloadTemplate("vendors")}>download our template</a> and ensure that the template matches.</p>
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
          onClick={handleVendorUpload}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {vendors.length > 0 && (
        <div className="mt-6 overflow-auto w-full">
          <table className="min-w-full bg-white ">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={index} className={vendor.status === 'On Atithi' ? 'bg-green-100' : 'bg-red-100'}>
                  <td className="py-2 px-4">{vendor.name}</td>
                  <td className="py-2 px-4">{vendor.email}</td>
                  <td className="py-2 px-4">{vendor.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      {handleFormNext!=null && vendors.length!== 0 &&<button
        type="button"
        className="bg-[#b00020] text-white font-bold py-2 px-4 rounded hover:bg-[#9b001a] mt-4 float-right"
        onClick={handleNext}
       
      >
        Next
      </button>}
      
    </div>
  );
};

export default VendorUpload;
