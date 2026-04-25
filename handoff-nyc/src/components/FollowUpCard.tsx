import { Calendar } from "lucide-react";
import { FollowUpAppointment } from "@/lib/carePlanTypes";
import { ConfidenceBadge } from "./ConfidenceBadge";

export function FollowUpCard({ appointment }: { appointment: FollowUpAppointment }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm relative">
      <div className="absolute top-4 right-4">
        <ConfidenceBadge confidence={appointment.confidence} />
      </div>
      <div className="flex items-start gap-4">
        <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-lg shrink-0">
          <Calendar className="w-6 h-6 text-teal-600 dark:text-teal-400" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">{appointment.provider}</h4>
          <p className="text-teal-700 dark:text-teal-400 font-medium">{appointment.date}</p>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <p><span className="font-medium">Location:</span> {appointment.location}</p>
            <p className="mt-1"><span className="font-medium">Instructions:</span> {appointment.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
