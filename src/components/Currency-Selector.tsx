"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";

// Currency data with ISO code, name, symbol, decimal places, and flag code
const currencies = [
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    decimals: 2,
    flag: "us",
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    decimals: 2,
    flag: "eu",
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    decimals: 2,
    flag: "gb",
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    decimals: 0,
    flag: "jp",
  },
  {
    code: "CNY",
    name: "Chinese Yuan",
    symbol: "¥",
    decimals: 2,
    flag: "cn",
  },
  {
    code: "BHD",
    name: "Bahraini Dinar",
    symbol: "BD",
    decimals: 3,
    flag: "bh",
  },
  {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
    decimals: 2,
    flag: "in",
  },
  {
    code: "BTC",
    name: "Bitcoin",
    symbol: "₿",
    decimals: 8,
    flag: "btc",
  },
  {
    code: "AED",
    name: "UAE Dirham",
    symbol: "د.إ",
    decimals: 2,
    flag: "ae",
  },
  {
    code: "SAR",
    name: "Saudi Riyal",
    symbol: "﷼",
    decimals: 2,
    flag: "sa",
  },
];

interface CurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  const [open, setOpen] = React.useState(false);

  const selectedCurrency =
    currencies.find((currency) => currency.code === value) || currencies[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <FlagIcon code={selectedCurrency.flag} />
            <span>
              {selectedCurrency.code} - {selectedCurrency.name}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search currency..." />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {currencies.map((currency) => (
                <CommandItem
                  key={currency.code}
                  value={currency.code}
                  onSelect={() => {
                    onChange(currency.code);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2 w-full">
                    <FlagIcon code={currency.flag} />
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {currency.code} ({currency.symbol})
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {currency.name}
                      </span>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      {currency.decimals}{" "}
                      {currency.decimals === 1 ? "decimal" : "decimals"}
                    </Badge>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === currency.code ? "opacity-100" : "opacity-0"
                      )}
                    />
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

// Simple component to display flag icons
function FlagIcon({ code }: { code: string }) {
  return (
    <div className="relative w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-muted">
      {code === "btc" ? (
        <span className="text-xs">₿</span>
      ) : (
        <img
          src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
          alt={`${code} flag`}
          className="w-5 h-auto object-cover"
        />
      )}
    </div>
  );
}
