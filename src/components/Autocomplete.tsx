"use client";

import * as React from "react";
import { Check, Plus } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import useSWR from "swr";
import { Vehicle } from "@prisma/client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface AutoCompleteProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function AutoComplete({
  value,
  onChange,
  disabled = false,
  ...props
}: AutoCompleteProps) {
  const [open, setOpen] = React.useState(false);
  const { data } = useSWR<Vehicle[]>(
    "/api/vehicles",
    (url: string | URL | Request) => fetch(url).then((res) => res.json())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Input
          type="text"
          role="combobox"
          value={value}
          readOnly={true}
          disabled={disabled}
          placeholder="Select Vehicle"
          {...props}
        />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Vehicles ...." />
          <CommandList>
            <CommandEmpty className="p-4">
              <div className="flex items-center ">
                <Plus className="mr-2 h-4 w-4" />
                <span className="text-sm">Add As New Vehicle </span>
              </div>
            </CommandEmpty>
            <CommandGroup>
              {data?.map((vehicle: Vehicle) => (
                <CommandItem
                  key={vehicle.id}
                  onSelect={() => {
                    onChange(vehicle.vehicleNo);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full ">
                      {value === vehicle.vehicleNo && <Check size={12} />}
                    </div>
                    {vehicle.vehicleNo}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
