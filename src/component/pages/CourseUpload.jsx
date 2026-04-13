import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../apiConfig";
export default function AdminPanel() {
  const [course, setCourse] = useState({
    title: "",
    duration: "",
    fees: "",
    schedule: "",
    timing: "",
    description: "",
    eligibility:
      "",
    training:
      "",
    tagLine:
      "",
    payment:
      "",
  });
  const [courses, setCourses] = useState([]);

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
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {

try {
  const response = await axios.post(`${BASE_URL}/api/courses`, course);
    console.log('response :',response.data);
    alert("Course Saved Successfully!");
    setCourse({ // Reset form
      title: "", duration: "", fees: "", schedule: "", timing: "",
      description: "", eligibility: "", training: "", tagLine: "", payment: ""
    });
    fetchCourses();
} catch (error) {
  console.log(error)
  alert("Failed to save course");
}
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const { data } = await axios.delete(`${BASE_URL}/api/courses/${id}`);
      if (data.success) {
        alert("Course deleted successfully");
        fetchCourses();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete course");
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8">

        {/* Header */}
        <h2 className="text-3xl font-bold text-[#0c4563] mb-2">
       Course   Upload & Management
        </h2>
        <p className="text-gray-500 mb-6">
          Manage your tailoring course content
        </p>

        <div className="space-y-6">

          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold text-[#0c4563] mb-3">
              Basic Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={course.title}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0c4563] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={course.duration}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0c4563]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Fees (₹)
                  </label>
                  <input
                    type="text"
                    name="fees"
                    value={course.fees}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0c4563]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-lg font-semibold text-[#0c4563] mb-3">
              Schedule Details
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Class Days
                </label>
                <input
                  type="text"
                  name="schedule"
                  value={course.schedule}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0c4563]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Timing
                </label>
                <input
                  type="text"
                  name="timing"
                  value={course.timing}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0c4563]"
                />
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div>
            <h3 className="text-lg font-semibold text-[#0c4563] mb-3">
              Course Content
            </h3>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={course.description}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-[#0c4563]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Eligibility
                </label>
                <textarea
                  name="eligibility"
                  value={course.eligibility}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg h-20 focus:ring-2 focus:ring-[#0c4563]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Training Details
                </label>
                <textarea
                  name="training"
                  value={course.training}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-[#0c4563]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Tagline / Offer
                </label>
                <textarea
                  name="tagLine"
                  value={course.tagLine}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg h-20 focus:ring-2 focus:ring-[#0c4563]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Payment Info
                </label>
                <textarea
                  name="payment"
                  value={course.payment}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg h-20 focus:ring-2 focus:ring-[#0c4563]"
                />
              </div>

            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-[#0c4563] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Save Course Details
          </button>

        </div>
      </div>

      {/* Courses List */}
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-xl p-8 sticky top-6">
        <h2 className="text-2xl font-bold text-[#0c4563] mb-4">Existing Courses</h2>
        <div className="space-y-4">
          {courses.length === 0 ? (
            <p className="text-gray-400 italic text-center py-8">No courses found.</p>
          ) : (
            courses.map((c) => (
              <div key={c._id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between hover:border-[#0c4563] transition-all group">
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-[#0c4563] truncate">{c.title}</h3>
                  <div className="flex gap-3 mt-1">
                    <span className="text-[10px] text-gray-500 font-medium">₹{c.fees}</span>
                    <span className="text-[10px] text-gray-500 font-medium">{c.duration}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete Course"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}