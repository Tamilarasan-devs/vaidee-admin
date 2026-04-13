import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../apiConfig";

const NAVY = "#0c4563";
const GOLD = "#b8933a";

export default function Admissions() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAdmission, setSelectedAdmission] = useState(null);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/admissions`);
      if (data.success) {
        setAdmissions(data.data);
      }
    } catch (err) {
      setError("Failed to fetch admissions. Please check if the backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-700";
      case "Rejected": return "bg-red-100 text-red-700";
      default: return "bg-amber-100 text-amber-700";
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const { data } = await axios.patch(`${BASE_URL}/api/admissions/${id}`, { status: newStatus });
      if (data.success) {
        setAdmissions(admissions.map(a => a._id === id ? { ...a, status: newStatus } : a));
        if (selectedAdmission && selectedAdmission._id === id) {
          setSelectedAdmission({ ...selectedAdmission, status: newStatus });
        }
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Student Admissions</h2>
          <p className="text-sm text-slate-400 mt-0.5">Manage and review course applications</p>
        </div>
        <button 
          onClick={fetchAdmissions}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
        >
          Refresh Data
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center">
          {error}
        </div>
      ) : admissions.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-100 text-center shadow-sm">
          <p className="text-slate-400">No admissions found yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm text-left">
              <thead>
                <tr className="text-[11px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50/70 border-b border-slate-100">
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Batch/Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {admissions.map((adm) => (
                  <tr key={adm._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-800">{adm.fullName}</p>
                        <p className="text-xs text-slate-400">{adm.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-slate-700 font-medium">{adm.courseName}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Paid: ₹{adm.advancePaid}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-slate-600">{adm.batch}</span>
                        <span className="text-[11px] text-slate-400">{new Date(adm.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getStatusColor(adm.status)}`}>
                        {adm.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedAdmission(adm)}
                        className="text-violet-600 hover:text-violet-700 font-semibold text-xs bg-violet-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedAdmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Admission Details</h3>
                <p className="text-xs text-slate-400">ID: {selectedAdmission._id}</p>
              </div>
              <button 
                onClick={() => setSelectedAdmission(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Personal */}
                <Section title="Personal Information">
                  <InfoItem label="Full Name" value={selectedAdmission.fullName} />
                  <InfoItem label="Father/Husband" value={selectedAdmission.fatherName} />
                  <InfoItem label="DOB" value={selectedAdmission.dob} />
                  <InfoItem label="Gender" value={selectedAdmission.gender} />
                </Section>

                {/* Contact */}
                <Section title="Contact Details">
                  <InfoItem label="Phone" value={selectedAdmission.phone} />
                  <InfoItem label="WhatsApp" value={selectedAdmission.whatsapp} />
                  <InfoItem label="Email" value={selectedAdmission.email} />
                  <InfoItem label="City" value={selectedAdmission.city} />
                  <InfoItem label="Pincode" value={selectedAdmission.pincode} />
                </Section>

                {/* Course */}
                <Section title="Course Details">
                  <InfoItem label="Course" value={selectedAdmission.courseName} />
                  <InfoItem label="Batch" value={selectedAdmission.batch} />
                  <InfoItem label="Joining Date" value={selectedAdmission.joiningDate} />
                  <InfoItem label="Total Fees" value={`₹${selectedAdmission.totalFees}`} />
                  <InfoItem label="Advance Paid" value={`₹${selectedAdmission.advancePaid}`} />
                </Section>

                {/* Education */}
                <Section title="Educational Details">
                  <InfoItem label="Highest Qual." value={selectedAdmission.qualification} />
                  <InfoItem label="College/School" value={selectedAdmission.college} />
                </Section>

                {/* Address */}
                <div className="md:col-span-2">
                  <Section title="Full Address">
                    <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed">
                      {selectedAdmission.address}
                    </p>
                  </Section>
                </div>

                {/* Actions */}
                <Section title="Management Actions">
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Pending", "Approved", "Rejected"].map(s => (
                      <button
                        key={s}
                        onClick={() => handleUpdateStatus(selectedAdmission._id, s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                          ${selectedAdmission.status === s 
                            ? getStatusColor(s) + " ring-1 ring-inset ring-slate-200" 
                            : "bg-slate-50 text-slate-400 hover:bg-slate-100"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </Section>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button 
                onClick={() => setSelectedAdmission(null)}
                className="px-6 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-semibold hover:bg-slate-900 transition-all shadow-lg shadow-slate-200"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="space-y-4">
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{title}</h4>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-[11px] text-slate-400 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-slate-700">{value || "—"}</p>
    </div>
  );
}
