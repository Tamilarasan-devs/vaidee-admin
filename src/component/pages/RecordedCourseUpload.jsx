import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../apiConfig";

const NAVY = "#0c4563";

export default function RecordedCourseUpload() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    videoUrl: "",
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/recorded-courses`);
      if (data.success) {
        setCourses(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/api/recorded-courses`, course);
      if (data.success) {
        alert("Recorded course added successfully!");
        setCourse({ title: "", description: "", videoUrl: "" });
        fetchCourses();
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const { data } = await axios.delete(`${BASE_URL}/api/recorded-courses/${id}`);
      if (data.success) {
        fetchCourses();
      }
    } catch (err) {
      alert("Failed to delete course");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Upload Form */}
      <div className="bg-white shadow-xl rounded-3xl p-8 border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Upload Recorded Course</h2>
        <p className="text-slate-500 mb-8 text-sm">Add a new video lesson to the student library</p>

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Course Title</label>
            <input
              type="text"
              name="title"
              value={course.title}
              onChange={handleChange}
              placeholder="e.g., Basic Saree Blouse Cutting"
              required
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Video URL (YouTube/Vimeo/Direct)</label>
            <input
              type="url"
              name="videoUrl"
              value={course.videoUrl}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=..."
              required
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              rows={4}
              placeholder="Explain what this lesson covers..."
              required
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Save Recorded Course"}
            </button>
          </div>
        </form>
      </div>

      {/* Course List */}
      <div className="bg-white shadow-xl rounded-3xl p-8 border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Existing Lessons</h2>
        <div className="grid grid-cols-1 gap-4">
          {courses.length === 0 ? (
            <p className="text-slate-400 text-center py-8 italic">No lessons uploaded yet.</p>
          ) : (
            courses.map((c) => (
              <div key={c._id} className="group p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between hover:border-violet-200 transition-all">
                <div className="min-w-0 flex-1 pr-4">
                  <h3 className="font-bold text-slate-800 truncate">{c.title}</h3>
                  <p className="text-xs text-slate-500 truncate mt-1">{c.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold px-2 py-1 bg-violet-100 text-violet-700 rounded-lg uppercase">Video</span>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    title="Delete Course"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
