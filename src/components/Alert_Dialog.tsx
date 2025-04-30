import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

export function Alert_Dialog({
  title,
  children,
  variant,
  description,
  dismissText,
  confirmText,
  onDismiss,
  onConfirm,
}: {
  title: string;
  variant?:
    | "default"
    | "link"
    | "secondary"
    | "destructive"
    | "success"
    | "warning"
    | "outline"
    | "ghost"
    | null;
  description: string;
  dismissText?: string;
  confirmText?: string;
  onDismiss?: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onDismiss}>
            {dismissText ?? "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={onConfirm}
              className="w-full border-2 sm:w-auto"
              variant={variant ?? "default"}
            >
              {confirmText ?? "Confirm"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
