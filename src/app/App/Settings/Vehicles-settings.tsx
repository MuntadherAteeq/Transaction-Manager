"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface JobCardType {
  id: string;
  name: string;
}

export default function VehiclesSettings() {
  const [jobCardTypes, setJobCardTypes] = useState<JobCardType[]>([
    { id: "1", name: "Maintenance" },
    { id: "2", name: "Repair" },
    { id: "3", name: "Inspection" },
    { id: "4", name: "Tire Change" },
    { id: "5", name: "Oil Change" },
  ]);

  const [newJobCardType, setNewJobCardType] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleAddJobCardType = () => {
    if (!newJobCardType.trim()) {
      toast.error("Error", {
        description: "Job card type name cannot be empty",
      });
      return;
    }

    const newId = (
      Math.max(...jobCardTypes.map((type) => Number.parseInt(type.id)), 0) + 1
    ).toString();
    setJobCardTypes([...jobCardTypes, { id: newId, name: newJobCardType }]);
    setNewJobCardType("");

    toast.success("Success", {
      description: "Job card type added successfully",
    });
  };

  const handleEditStart = (type: JobCardType) => {
    setEditingId(type.id);
    setEditValue(type.name);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleEditSave = (id: string) => {
    if (!editValue.trim()) {
      toast.error("Error", {
        description: "Job card type name cannot be empty",
      });
      return;
    }

    setJobCardTypes(
      jobCardTypes.map((type) =>
        type.id === id ? { ...type, name: editValue } : type
      )
    );
    setEditingId(null);

    toast("Success", {
      description: "Job card type updated successfully",
    });
  };

  const handleDelete = (id: string) => {
    setJobCardTypes(jobCardTypes.filter((type) => type.id !== id));

    toast("Success", {
      description: "Job card type deleted successfully",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Vehicles Settings
          </h1>
          <p className="text-muted-foreground">
            Manage job card types for vehicle maintenance and repairs.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Card Types</CardTitle>
            <CardDescription>
              Add, edit, or remove job card types that can be assigned to
              vehicle maintenance tasks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="new-job-card-type">
                    Add New Job Card Type
                  </Label>
                  <Input
                    id="new-job-card-type"
                    placeholder="Enter job card type name"
                    value={newJobCardType}
                    onChange={(e) => setNewJobCardType(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddJobCardType}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Type
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Vehicles Types</h3>
                <div className="rounded-md border">
                  <div className="divide-y">
                    {jobCardTypes.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">
                        No job card types added yet. Add your first one above.
                      </div>
                    ) : (
                      jobCardTypes.map((type) => (
                        <div
                          key={type.id}
                          className="flex items-center justify-between p-4"
                        >
                          {editingId === type.id ? (
                            <div className="flex items-center gap-2 flex-1">
                              <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className=""
                              />
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditSave(type.id)}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleEditCancel}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <span className="font-medium">{type.name}</span>
                          )}

                          {editingId !== type.id && (
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditStart(type)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(type.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
