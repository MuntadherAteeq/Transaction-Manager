"use client";
import { notFound } from "next/navigation";
import { useRef, useState } from "react";
import { format } from "date-fns";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Printer, Download, Loader2 } from "lucide-react";

// This would be replaced with your actual data fetching logic
function getJobCard(id: string) {
  // Mock data based on the schema
  return {
    id: Number.parseInt(id),
    date: new Date(),
    km: "45,000",
    operator: "John Doe",
    department: "Maintenance",
    description: "Regular maintenance and oil change",
    mechanic: "Mike Smith",
    type: "Scheduled Maintenance",
    totalAmount: 1250.75,
    nextServiceDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    nextServiceKm: "50,000",
    createdAt: new Date(),
    updatedAt: new Date(),
    Part: [
      {
        id: "part-1",
        partCode: "OIL-5W30",
        description: "Synthetic Engine Oil 5W30",
        quantity: 5,
        rate: 45.99,
        amount: 229.95,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "part-2",
        partCode: "FIL-OIL",
        description: "Oil Filter",
        quantity: 1,
        rate: 15.5,
        amount: 15.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "part-3",
        partCode: "FIL-AIR",
        description: "Air Filter",
        quantity: 1,
        rate: 25.3,
        amount: 25.3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "part-4",
        partCode: "LABOR",
        description: "Labor Charges",
        quantity: 4,
        rate: 245.0,
        amount: 980.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
}

export default function InvoicePage() {
  const jobCard = getJobCard("1");

  return <JobCardInvoice jobCard={jobCard} />;
}

interface Part {
  id: string;
  partCode?: string;
  description?: string;
  quantity?: number;
  rate?: number;
  amount?: number;
}

interface JobCard {
  id: number;
  date?: Date;
  km?: string;
  operator?: string;
  department?: string;
  description?: string;
  mechanic?: string;
  type?: string;
  totalAmount?: number;
  nextServiceDate?: Date;
  nextServiceKm?: string;
  Part: Part[];
}

export function JobCardInvoice({ jobCard }: { jobCard: JobCard }) {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    if (!invoiceRef.current) return;

    setIsGenerating(true);

    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`job-card-invoice-${jobCard.id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto py-8 text-black">
      <div className="flex justify-end  mb-4 print:hidden px-6">
        <Button onClick={generatePDF} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </>
          )}
        </Button>
      </div>

      <div
        ref={invoiceRef}
        className="bg-white shadow-[0px_0px_50px_25px_rgba(0,_0,_0,_0.1)] mx-auto"
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "10mm",
          boxSizing: "border-box",
        }}
      >
        <div className="invoice-header border-b pb-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">Job Card Invoice</h1>
              <p className="text-muted-foreground">
                #{jobCard.id.toString().padStart(5, "0")}
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold">Your Company Name</h2>
              <p className="text-sm text-muted-foreground">
                123 Business Street
              </p>
              <p className="text-sm text-muted-foreground">City, State, ZIP</p>
              <p className="text-sm text-muted-foreground">
                Phone: (123) 456-7890
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <Card className="p-4 bg-white text-black">
            <h3 className="font-semibold mb-2">Job Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Date:</div>
              <div>
                {jobCard.date ? format(jobCard.date, "dd/MM/yyyy") : "N/A"}
              </div>

              <div className="text-muted-foreground">Type:</div>
              <div>{jobCard.type || "N/A"}</div>

              <div className="text-muted-foreground">Mechanic:</div>
              <div>{jobCard.mechanic || "N/A"}</div>

              <div className="text-muted-foreground">Operator:</div>
              <div>{jobCard.operator || "N/A"}</div>

              <div className="text-muted-foreground">Department:</div>
              <div>{jobCard.department || "N/A"}</div>
            </div>
          </Card>

          <Card className="p-4 bg-white text-black">
            <h3 className="font-semibold mb-2">Vehicle Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Current KM:</div>
              <div>{jobCard.km || "N/A"}</div>

              <div className="text-muted-foreground">Description:</div>
              <div>{jobCard.description || "N/A"}</div>

              <div className="text-muted-foreground">Next Service Date:</div>
              <div>
                {jobCard.nextServiceDate
                  ? format(jobCard.nextServiceDate, "dd/MM/yyyy")
                  : "N/A"}
              </div>

              <div className="text-muted-foreground">Next Service KM:</div>
              <div>{jobCard.nextServiceKm || "N/A"}</div>
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-4">Parts & Services</h3>
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>Part Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobCard.Part.map((part) => (
                <TableRow key={part.id}>
                  <TableCell>{part.partCode || "N/A"}</TableCell>
                  <TableCell>{part.description || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    {part.quantity || 0}
                  </TableCell>
                  <TableCell className="text-right">
                    {part.rate?.toFixed(2) || "0.00"}
                  </TableCell>
                  <TableCell className="text-right">
                    {part.amount?.toFixed(2) || "0.00"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end mb-8">
          <div className="w-1/3">
            <div className="flex justify-between py-2 font-medium">
              <span>Subtotal:</span>
              <span>
                {jobCard.Part.reduce(
                  (sum, part) => sum + (part.amount || 0),
                  0
                ).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-2 font-medium">
              <span>Tax (10%):</span>
              <span>0.00</span>
            </div>
            <div className="flex justify-between py-2 border-t border-t-border font-bold">
              <span>Total:</span>
              <span>
                {jobCard.totalAmount?.toFixed(2) ||
                  jobCard.Part.reduce(
                    (sum, part) => sum + (part.amount || 0),
                    0
                  ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 grid grid-cols-2 gap-8">
          <div>
            <p className="font-semibold mb-8">Customer Signature</p>
            <div className="border-b border-gray-300 h-0 w-48"></div>
          </div>
          <div>
            <p className="font-semibold mb-8">Mechanic Signature</p>
            <div className="border-b border-gray-300 h-0 w-48"></div>
          </div>
          <div>
            <p className="font-semibold mb-8">Customer Signature</p>
            <div className="border-b border-gray-300 h-0 w-48"></div>
          </div>
          <div>
            <p className="font-semibold mb-8">Mechanic Signature</p>
            <div className="border-b border-gray-300 h-0 w-48"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
