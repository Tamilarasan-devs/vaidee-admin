import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../apiConfig";
import {
  BookOpen,
  Clock,
  IndianRupee,
  Calendar,
  Search,
  Trash2,
  GraduationCap,
  FileText,
  Edit2,
} from "lucide-react";

export default function AdminPanel() {
  const [course, setCourse] = useState({
    title: "",
    duration: "",
    fees: "",
    schedule: "",
    timing: "",
    description: "",
    eligibility: "",
    training: "",
    tagLine: "",
    payment: "",
    pdfUrl: "",
  });

  const [pdfFile, setPdfFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/courses`);
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
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const formData = new FormData();
      Object.keys(course).forEach((key) => {
        formData.append(key, course[key]);
      });
      if (pdfFile) {
        formData.append("pdf", pdfFile);
      }

      if (editId) {
        await axios.put(`${BASE_URL}/api/courses/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Course Updated Successfully!");
      } else {
        await axios.post(`${BASE_URL}/api/courses`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Course Saved Successfully!");
      }

      setEditId(null);
      setCourse({
        title: "",
        duration: "",
        fees: "",
        schedule: "",
        timing: "",
        description: "",
        eligibility: "",
        training: "",
        tagLine: "",
        payment: "",
        pdfUrl: "",
      });
      setPdfFile(null);
      const fileInput = document.getElementById("course-pdf-input");
      if (fileInput) fileInput.value = "";

      fetchCourses();
    } catch (error) {
      console.log(error);
      alert("Failed to save course");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      const { data } = await axios.delete(
        `${BASE_URL}/api/courses/${id}`
      );

      if (data.success) {
        fetchCourses();
      }
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  const handleEdit = (c) => {
    setEditId(c._id);
    setCourse({
      title: c.title || "",
      duration: c.duration || "",
      fees: c.fees || "",
      schedule: c.schedule || "",
      timing: c.timing || "",
      description: c.description || "",
      eligibility: c.eligibility || "",
      training: c.training || "",
      tagLine: c.tagLine || "",
      payment: c.payment || "",
      pdfUrl: c.pdfUrl || "",
    });
    setPdfFile(null);
    const fileInput = document.getElementById("course-pdf-input");
    if (fileInput) fileInput.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredCourses = courses.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#0c4563] via-[#146082] to-[#1d7ea8]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Course Management
              </h1>

              <p className="text-blue-100 mt-1">
                Manage tailoring programs, schedules and fees.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
              <p className="text-blue-100 text-sm">
                Total Courses
              </p>

              <h2 className="text-3xl font-bold text-white">
                {courses.length}
              </h2>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <p className="text-blue-100 text-sm">
                Courses
              </p>

              <h3 className="text-2xl font-bold text-white">
                {courses.length}
              </h3>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <p className="text-blue-100 text-sm">
                Training Programs
              </p>

              <h3 className="text-2xl font-bold text-white">
                Active
              </h3>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <p className="text-blue-100 text-sm">
                Dashboard Access
              </p>

              <h3 className="text-2xl font-bold text-white">
                Admin
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* FORM */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

              {/* Title */}
              <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0c4563]/10 p-3 rounded-xl">
                    <GraduationCap
                      size={24}
                      className="text-[#0c4563]"
                    />
                  </div>

                  <div>
                    <h2 className="font-bold text-xl text-slate-800">
                      {editId ? "Edit Course" : "Add New Course"}
                    </h2>

                    <p className="text-slate-500 text-sm">
                      {editId ? "Update existing course information." : "Create professional course information."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">

                {/* BASIC INFO */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4">
                    Basic Information
                  </h3>

                  <div className="space-y-4">

                    <input
                      type="text"
                      name="title"
                      value={course.title}
                      onChange={handleChange}
                      placeholder="Enter course title"
                      className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0c4563] focus:border-transparent outline-none"
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="duration"
                        value={course.duration}
                        onChange={handleChange}
                        placeholder="Duration (e.g. 3 Months)"
                        className="w-full p-3 rounded-xl border border-slate-300"
                      />

                      <input
                        type="text"
                        name="fees"
                        value={course.fees}
                        onChange={handleChange}
                        placeholder="Course Fees"
                        className="w-full p-3 rounded-xl border border-slate-300"
                      />
                    </div>
                  </div>
                </div>

                {/* SCHEDULE */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4">
                    Schedule Details
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="schedule"
                      value={course.schedule}
                      onChange={handleChange}
                      placeholder="Mon - Fri"
                      className="w-full p-3 rounded-xl border border-slate-300"
                    />

                    <input
                      type="text"
                      name="timing"
                      value={course.timing}
                      onChange={handleChange}
                      placeholder="10 AM - 12 PM"
                      className="w-full p-3 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>

                {/* TEXTAREAS */}
                <div className="grid gap-4">

                  {[
                    ["description", "Description"],
                    ["eligibility", "Eligibility"],
                    ["training", "Training Details"],
                    ["tagLine", "Special Offer / Tagline"],
                    ["payment", "Payment Information"],
                  ].map(([name, label]) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {label}
                      </label>

                      <textarea
                        name={name}
                        value={course[name]}
                        onChange={handleChange}
                        rows={3}
                        className="w-full p-3 rounded-xl border border-slate-300 resize-none"
                        placeholder={`Enter ${label}`}
                      />
                    </div>
                  ))}

                </div>

                {/* PDF UPLOAD */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4">
                    Course Material (PDF)
                  </h3>

                  <div className="relative">
                    <input
                      id="course-pdf-input"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setPdfFile(e.target.files[0] || null)}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById("course-pdf-input").click()}
                      className="w-full flex items-center gap-4 p-4 border-2 border-dashed border-slate-300 rounded-2xl hover:border-[#0c4563] hover:bg-[#0c4563]/5 transition-all cursor-pointer group"
                    >
                      <span className="flex items-center justify-center w-12 h-12 bg-[#0c4563]/10 rounded-xl text-[#0c4563] group-hover:bg-[#0c4563]/20 transition-colors">
                        <FileText size={22} />
                      </span>
                      <span className="text-left flex-1">
                        {pdfFile ? (
                          <>
                            <span className="block text-slate-800 font-semibold text-sm">{pdfFile.name}</span>
                            <span className="block text-slate-400 text-xs mt-0.5">
                              {(pdfFile.size / 1024 / 1024).toFixed(2)} MB · Click to change
                            </span>
                          </>
                        ) : course.pdfUrl ? (
                          <>
                            <span className="block text-slate-800 font-semibold text-sm">
                              Existing PDF: {course.pdfUrl.split('/').pop()}
                            </span>
                            <span className="block text-slate-400 text-xs mt-0.5">
                              Click to upload a new PDF to replace the existing one
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="block text-slate-500 font-medium text-sm">Click to upload a PDF file</span>
                            <span className="block text-slate-400 text-xs mt-0.5">
                              Syllabus, brochure, or course material (optional)
                            </span>
                          </>
                        )}
                      </span>
                      {pdfFile && (
                        <span
                          className="text-xs text-red-500 hover:text-red-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all border border-transparent hover:border-red-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPdfFile(null);
                            const fileInput = document.getElementById("course-pdf-input");
                            if (fileInput) fileInput.value = "";
                          }}
                        >
                          Remove
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 bg-gradient-to-r from-[#0c4563] to-[#1d7ea8] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    {saving ? (editId ? "Updating..." : "Saving...") : (editId ? "Update Course" : "Save Course")}
                  </button>
                  
                  {editId && (
                    <button
                      onClick={() => {
                        setEditId(null);
                        setCourse({
                          title: "", duration: "", fees: "", schedule: "", timing: "",
                          description: "", eligibility: "", training: "", tagLine: "", payment: "", pdfUrl: ""
                        });
                        setPdfFile(null);
                      }}
                      className="px-6 bg-slate-100 text-slate-600 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* COURSE LIST */}
          <div>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm sticky top-5">

              <div className="border-b border-slate-200 p-5">
                <h2 className="text-xl font-bold text-slate-800">
                  Existing Courses
                </h2>

                <p className="text-sm text-slate-500">
                  Search and manage courses
                </p>
              </div>

              <div className="p-5">

                <div className="relative mb-5">
                  <Search
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="w-full pl-10 p-3 border rounded-xl"
                  />
                </div>

                <div className="space-y-3 max-h-[650px] overflow-y-auto">

                  {filteredCourses.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar
                        size={50}
                        className="mx-auto text-slate-300"
                      />

                      <p className="text-slate-400 mt-3">
                        No courses found
                      </p>
                    </div>
                  ) : (
                    filteredCourses.map((c) => (
                      <div
                        key={c._id}
                        className="group border border-slate-200 rounded-2xl p-4 hover:border-[#0c4563] hover:shadow-md transition-all"
                      >
                        <div className="flex justify-between items-start">

                          <div>
                            <h3 className="font-semibold text-slate-800">
                              {c.title}
                            </h3>

                            <div className="flex flex-wrap gap-2 mt-3">
                              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                                ₹ {c.fees}
                              </span>

                              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                                {c.duration}
                              </span>

                              {c.pdfUrl && (
                                <span className="bg-violet-100 text-violet-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                                  <FileText size={11} />
                                  PDF
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(c)}
                              className="text-blue-500   transition"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(c._id)
                              }
                              className="text-red-500   transition"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                        </div>
                      </div>
                    ))
                  )}

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}