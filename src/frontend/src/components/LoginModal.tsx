import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, Loader2, LogIn } from "lucide-react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const { login, clear, loginStatus, identity, isLoggingIn } =
    useInternetIdentity();

  const isLoggedIn = loginStatus === "success" && !!identity;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm" data-ocid="login.dialog">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isLoggedIn ? "You're Logged In" : "Log in to PaintPro"}
          </DialogTitle>
          <DialogDescription>
            {isLoggedIn
              ? "You are authenticated and can book services or manage your subscription."
              : "Securely authenticate with Internet Identity to access your account."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="text-sm">
                  <div className="font-semibold text-foreground">
                    Authenticated
                  </div>
                  <div className="text-xs text-muted-foreground truncate max-w-[220px]">
                    {identity.getPrincipal().toString()}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  data-ocid="login.close_button"
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  variant="destructive"
                  data-ocid="login.logout.button"
                  onClick={() => {
                    clear();
                    onClose();
                  }}
                  className="flex-1"
                >
                  Log Out
                </Button>
              </div>
            </>
          ) : (
            <Button
              data-ocid="login.submit_button"
              onClick={login}
              disabled={isLoggingIn}
              className="w-full bg-primary text-primary-foreground hover:opacity-90 font-semibold"
            >
              {isLoggingIn ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-4 w-4" />
              )}
              {isLoggingIn
                ? "Authenticating..."
                : "Continue with Internet Identity"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
