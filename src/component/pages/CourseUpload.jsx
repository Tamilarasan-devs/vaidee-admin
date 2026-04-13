import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../../apiConfig";
export default function AdminPanel() {
  const [course, setCourse] = useState({
    title: "Basic to Advanced Tailoring Class",
    duration: "1 Month",
    fees: "1500",
    schedule: "Mon, Wed, Fri",
    timing: "10AM - 8PM",
    description: "",
    eligibility:
      "Anyone interested in learning tailoring, no prior experience required.",
    training:
      "Full hands-on training with experienced instructors covering all aspects of tailoring.",
    tagLine:
      "Limited seats available! Enroll now to secure your spot.",
    payment:
      "All payments via UPI, Bank Transfer, or Cash.",
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {

try {
  const response = await axios.post(`${BASE_URL}/api/courses`, course);
    console.log('response :',response.data);
} catch (error) {
  console.log(error)
}

    
    localStorage.setItem("courseData", JSON.stringify(course));
    // alert("Course Updated Successfully!");
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
    </div>
  );
}