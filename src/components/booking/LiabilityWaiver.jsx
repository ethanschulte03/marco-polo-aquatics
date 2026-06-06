import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function LiabilityWaiver({ signature, onSignatureChange, agreed, onAgreedChange }) {
  const checks = [
    "The lesson takes place at a private pool.",
    "A parent or guardian will be present for the entire lesson.",
    "Marco Polo Aquatics is not liable for injuries resulting from failure to follow instructor guidance.",
    "I understand the 24-hour cancellation policy.",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 bg-accent/10 border border-accent/30 rounded-xl p-4">
        <AlertCircle size={18} className="text-accent mt-0.5 flex-shrink-0" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          Please read and acknowledge the following before confirming your booking.
        </p>
      </div>

      <div className="bg-muted/40 rounded-xl p-6 space-y-3">
        <h3 className="font-heading font-semibold text-secondary text-base mb-4">Liability Waiver & Acknowledgments</h3>
        {checks.map((check, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <CheckCircle2 size={15} className="text-primary mt-0.5 flex-shrink-0" />
            <span>{check}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="waiver-agree"
            checked={agreed}
            onChange={(e) => onAgreedChange(e.target.checked)}
            className="mt-1 w-4 h-4 accent-primary cursor-pointer"
          />
          <label htmlFor="waiver-agree" className="text-sm text-muted-foreground cursor-pointer">
            I have read and agree to all of the above terms and conditions.
          </label>
        </div>

        <div className="space-y-2">
          <Label>Digital Signature (type your full name) *</Label>
          <Input
            placeholder="Type your full legal name to sign"
            value={signature}
            onChange={(e) => onSignatureChange(e.target.value)}
            className="italic"
          />
          {signature && (
            <p className="text-xs text-muted-foreground">
              Signed by: <em className="text-secondary font-medium">{signature}</em>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}