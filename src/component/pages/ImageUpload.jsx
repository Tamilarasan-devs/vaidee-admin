import React, { useState, useEffect } from "react";
import BASE_URL from "../../apiConfig";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [category, setCategory] = useState("gallery");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch existing images of the selected category
  const fetchImages = async () => {
    setImagesLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/images?category=${category}&page=${page}&limit=6`);
      const data = await response.json();
      if (data.success) {
        setImages(data.data);
        setTotalPages(data.pagination.pages || 1);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setImagesLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [category, page]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image file first.");

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", category);

    try {
      const response = await fetch(`${BASE_URL}/api/images`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert("Image uploaded successfully!");
        setFile(null);
        setPreview("");
        setPage(1); // Reset to page 1
        fetchImages();
      } else {
        alert(data.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong during upload");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      const response = await fetch(`${BASE_URL}/api/images/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        alert("Image deleted successfully");
        fetchImages();
      } else {
        alert(data.message || "Failed to delete image");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong during deletion");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Manage Images</h2>
        <p className="text-sm text-slate-400 mt-0.5">Upload and manage images for Gallery and Testimonials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-fit">
          <h3 className="font-semibold text-slate-800 mb-4">Upload New Image</h3>
          <form onSubmit={handleUpload} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCategory("gallery")}
                  className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all ${
                    category === "gallery"
                      ? "bg-violet-600 border-violet-600 text-white shadow-sm"
                      : "border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
                  }`}
                >
                  Gallery
                </button>
                <button
                  type="button"
                  onClick={() => setCategory("testimonial")}
                  className={`py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all ${
                    category === "testimonial"
                      ? "bg-violet-600 border-violet-600 text-white shadow-sm"
                      : "border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
                  }`}
                >
                  Testimonial
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Select Image</label>
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition duration-150">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-contain p-2 rounded-2xl" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <p className="text-xs text-slate-500 font-medium">Click to choose image</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !file}
              className={`w-full py-3 rounded-xl font-semibold text-white text-sm transition-all ${
                loading || !file ? "bg-slate-300 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700 shadow-md shadow-violet-500/20"
              }`}
            >
              {loading ? "Uploading..." : "Upload to Cloudinary"}
            </button>
          </form>
        </div>

        {/* Existing Images Showcase */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[450px]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-800">
                Existing {category === "gallery" ? "Gallery" : "Testimonial"} Images
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => { setCategory("gallery"); setPage(1); }}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    category === "gallery" ? "bg-violet-50 text-violet-700" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Gallery List
                </button>
                <button
                  onClick={() => { setCategory("testimonial"); setPage(1); }}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    category === "testimonial" ? "bg-violet-50 text-violet-700" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Testimonial List
                </button>
              </div>
            </div>

            {imagesLoading ? (
              <div className="flex items-center justify-center h-48">
                <span className="text-slate-400 text-sm">Loading images...</span>
              </div>
            ) : images.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 border border-dashed border-slate-100 rounded-2xl">
                <span className="text-slate-400 text-sm font-medium">No images uploaded in this category.</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((img) => (
                  <div key={img._id} className="relative group rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50">
                    <img src={img.url} alt="Uploaded" className="w-full h-32 object-cover" />
                    <button
                      onClick={() => handleDelete(img._id)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-lg shadow"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg disabled:opacity-50 hover:bg-slate-100 transition-colors"
              >
                Previous
              </button>
              <span className="text-xs text-slate-500 font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg disabled:opacity-50 hover:bg-slate-100 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
