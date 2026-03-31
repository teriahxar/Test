import { ProAlertModal } from "@/components/pro-alert-modal";

export function AlertForm() {
  return (
    <div className="panel-card rounded-[20px] p-5">
      <p className="font-display text-2xl font-semibold text-[#2C2418]">Price alerts</p>
      <p className="mt-2 text-sm text-[#5D554D]">Track drops and spikes with a Pro upgrade.</p>
      <div className="mt-4">
        <ProAlertModal />
      </div>
    </div>
  );
}
