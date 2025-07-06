import React from "react";

export default function EditModal({ open, onClose, formData, onChange, onSave }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Edit Joke</h2>

        <textarea
          value={formData.content}
          onChange={(e) => onChange({ ...formData, content: e.target.value })}
          className="w-full h-24 p-2 border rounded mb-4"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-600 hover:underline">
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
