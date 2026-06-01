import React, { useState, useEffect } from "react";
import BASE_URL from "../../apiConfig";

export default function AnnouncementUpload() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [listLoading, setListLoading] = useState(false);

  const fetchAnnouncements = async () => {
    setListLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/announcements/admin`);
      const data = await response.json();
      if (data.success) {
        setAnnouncements(data.data);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return alert("Announcement text cannot be empty.");

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/announcements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, isActive: true }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Announcement added successfully!");
        setText("");
        fetchAnnouncements();
      } else {
        alert(data.message || "Failed to add announcement");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const response = await fetch(`${BASE_URL}/api/announcements/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      const data = await response.json();
      if (data.success) {
        fetchAnnouncements();
      } else {
        alert(data.message || "Failed to toggle status");
      }
    } catch (error) {
      console.error("Toggle error:", error);
      alert("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;

    try {
      const response = await fetch(`${BASE_URL}/api/announcements/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        alert("Announcement deleted successfully");
        fetchAnnouncements();
      } else {
        alert(data.message || "Failed to delete announcement");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Announcements</h2>
        <p className="text-sm text-slate-400 mt-0.5">Manage the header top-bar announcement scroll texts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-fit">
          <h3 className="font-semibold text-slate-800 mb-4">Add Announcement</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Announcement Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g. 🎓 New Batch Starting May 4 · Limited Seats Available"
                className="w-full p-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-violet-600 font-medium"
                rows="4"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !text.trim()}
              className={`w-full py-3 rounded-xl font-semibold text-white text-sm transition-all ${
                loading || !text.trim() ? "bg-slate-300 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700 shadow-md"
              }`}
            >
              {loading ? "Adding..." : "Add Announcement"}
            </button>
          </form>
        </div>

        {/* Existing Announcements List */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm min-h-[450px]">
          <h3 className="font-semibold text-slate-800 mb-6">Active & Past Announcements</h3>

          {listLoading ? (
            <div className="flex items-center justify-center h-48">
              <span className="text-slate-400 text-sm">Loading announcements...</span>
            </div>
          ) : announcements.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 border border-dashed border-slate-100 rounded-2xl">
              <span className="text-slate-400 text-sm font-medium">No announcements found.</span>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((ann) => (
                <div key={ann._id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                  <div className="flex-1 mr-4">
                    <p className="text-sm text-slate-800 font-medium">{ann.text}</p>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">
                      {new Date(ann.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(ann._id, ann.isActive)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg font-semibold border transition-all ${
                        ann.isActive
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                          : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {ann.isActive ? "Active" : "Inactive"}
                    </button>
                    <button
                      onClick={() => handleDelete(ann._id)}
                      className="text-xs px-2.5 py-1.5 rounded-lg font-semibold bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
