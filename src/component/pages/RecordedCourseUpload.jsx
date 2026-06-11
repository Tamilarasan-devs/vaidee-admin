import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../apiConfig";

const NAVY = "#0c4563";

export default function RecordedCourseUpload() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
  });
  const [videoUrls, setVideoUrls] = useState([{ title: "", url: "" }]);
  const [pdfFile, setPdfFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...videoUrls];
    newLinks[index][field] = value;
    setVideoUrls(newLinks);
  };

  const handleAddLink = () => setVideoUrls([...videoUrls, { title: "", url: "" }]);
  
  const handleRemoveLink = (index) => {
    const newLinks = videoUrls.filter((_, i) => i !== index);
    setVideoUrls(newLinks);
  };

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
      const formData = new FormData();
      formData.append("title", course.title);
      formData.append("description", course.description);
      formData.append("videoUrls", JSON.stringify(videoUrls));
      if (pdfFile) {
        formData.append("pdfFile", pdfFile);
      }

      const { data } = await axios.post(`${BASE_URL}/api/recorded-courses`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (data.success) {
        alert("Recorded course added successfully!");
        setCourse({ title: "", description: "" });
        setVideoUrls([{ title: "", url: "" }]);
        setPdfFile(null);
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
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Video Links</label>
              <button type="button" onClick={handleAddLink} className="text-xs font-bold text-violet-600 hover:text-violet-800">
                + Add Link
              </button>
            </div>
            {videoUrls.map((link, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Link Title (e.g., Part 1)"
                  value={link.title}
                  onChange={(e) => handleLinkChange(index, "title", e.target.value)}
                  required
                  className="w-1/3 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                />
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={link.url}
                  onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                  required
                  className="flex-1 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                />
                {videoUrls.length > 1 && (
                  <button type="button" onClick={() => handleRemoveLink(index)} className="text-red-500 font-bold px-4 hover:bg-red-50 rounded-2xl">
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">PDF Material (Optional)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-violet-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
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
                  <div className="mt-2 flex gap-4 text-xs font-mono text-slate-600 bg-white p-2 rounded-lg border border-slate-100 inline-flex">
                    <span>User: <strong className="text-violet-600">{c.username}</strong></span>
                    <span>Pass: <strong className="text-violet-600">{c.password}</strong></span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-2">
                    <span className="text-[10px] font-bold px-2 py-1 bg-violet-100 text-violet-700 rounded-lg uppercase">{c.videoUrls?.length || 0} Videos</span>
                    {c.pdfUrl && <span className="text-[10px] font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded-lg uppercase">PDF</span>}
                  </div>
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
