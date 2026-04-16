import { useState, useEffect } from "react";
import { Upload, Plus, Trash2, CheckCircle, FileSpreadsheet, X, Edit, Save } from "lucide-react";
import Papa from "papaparse"; // For CSV parsing
import { addProduct, addBulkProducts, fetchProducts, updateProduct, deleteProduct } from "../services/api";

export default function AdminDashboard() {
  const [product, setProduct] = useState({
    name: "", price: "", originalPrice: "", category: "Fancy Saree", image: "", description: ""
  });
  const [bulkProducts, setBulkProducts] = useState([]);
  const [status, setStatus] = useState("");
  
  // NEW STATE FOR ALL PRODUCTS
  const [allProducts, setAllProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setAllProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  // --- FEATURE 1: CLOUDINARY IMAGE UPLOAD ---
  const handleImageUpload = (isEdit = false) => {
    window.cloudinary.openUploadWidget(
      { cloudName: 'your_cloud_name', uploadPreset: 'your_preset' },
      (error, result) => {
        if (!error && result && result.event === "success") {
          if (isEdit) {
            setEditFormData({ ...editFormData, image: result.info.secure_url });
          } else {
            setProduct({ ...product, image: result.info.secure_url });
          }
        }
      }
    );
  };

  // --- FEATURE 2: BULK CSV PROCESSING ---
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setBulkProducts(results.data);
          setStatus(`${results.data.length} items staged for bulk upload`);
        },
      });
    }
  };

  const submitSingle = async (e) => {
    e.preventDefault();
    try {
      const productPayload = { ...product };
      if (!productPayload.image) {
        productPayload.image = "https://images.unsplash.com/photo-1610030469983-98e550d615e1?q=80&w=800&auto=format&fit=crop"; 
      }
      await addProduct(productPayload);
      setStatus("Masterpiece added to Atelier!");
      setProduct({ name: "", price: "", originalPrice: "", category: "Fancy Saree", image: "", description: "" });
      loadProducts();
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Failed to add product.";
      setStatus(`Failed to add product: ${errorMsg}`);
    }
  };

  const submitBulk = async () => {
    try {
      const payload = bulkProducts.map(p => ({
        ...p,
        image: p.image || "https://images.unsplash.com/photo-1610030469983-98e550d615e1?q=80&w=800&auto=format&fit=crop"
      }));
      await addBulkProducts(payload);
      setStatus(`Successfully launched ${bulkProducts.length} products!`);
      setBulkProducts([]);
      loadProducts();
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Failed to add bulk products.";
      setStatus(`Failed to add bulk products: ${errorMsg}`);
    }
  };

  const handleDelete = async (id) => {
    if (typeof id !== "string") {
      setStatus("Cannot delete static local products. Only database items can be deleted.");
      return;
    }
    try {
      await deleteProduct(id);
      setStatus("Product removed from Atelier");
      loadProducts();
    } catch (err) {
      setStatus("Failed to delete product.");
    }
  };

  const handleEditClick = (p) => {
    if (typeof p.id !== "string") {
      setStatus("Cannot edit static local products. Only database items can be edited.");
      return;
    }
    setEditingId(p.id);
    setEditFormData(p);
  };

  const handleSaveEdit = async () => {
    try {
      await updateProduct(editingId, editFormData);
      setStatus("Product updated beautifully.");
      setEditingId(null);
      loadProducts();
    } catch (err) {
      setStatus("Failed to update product.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-28 md:pt-36 pb-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-8 gap-6">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-arinya-dark">Atelier <span className="italic text-arinya-gold">Control</span></h1>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-arinya-gray mt-2 font-bold">Inventory & Heritage Management</p>
          </div>
          {status && (
            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 animate-bounce">
              <CheckCircle className="w-4 h-4" /> {status}
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* --- SECTION A: SINGLE PRODUCT CURATION --- */}
          <section className="space-y-6">
            <h2 className="font-serif text-2xl italic text-arinya-dark flex items-center gap-3">
              <Plus className="w-5 h-5 text-arinya-gold" /> Single Entry
            </h2>
            <form onSubmit={submitSingle} className="bg-white p-8 border border-gray-50 shadow-xl rounded-sm space-y-6">
              <div className="space-y-4">
                <input 
                  type="text" placeholder="Product Name" required value={product.name}
                  className="w-full border-b border-gray-100 py-3 outline-none focus:border-arinya-gold text-sm font-sans"
                  onChange={(e) => setProduct({...product, name: e.target.value})}
                />
                <div className="grid grid-cols-3 gap-4">
                  <input type="number" placeholder="MRP (₹)" value={product.originalPrice} className="w-full border-b border-gray-100 py-3 outline-none text-sm" onChange={(e) => setProduct({...product, originalPrice: e.target.value})}/>
                  <input type="number" placeholder="Offer (₹)" required value={product.price} className="w-full border-b border-gray-100 py-3 outline-none text-sm" onChange={(e) => setProduct({...product, price: e.target.value})}/>
                  <select className="border-b border-gray-100 py-3 outline-none text-sm bg-transparent" value={product.category} onChange={(e) => setProduct({...product, category: e.target.value})}>
                    <option>Fancy Saree</option><option>Lehenga</option><option>Silk Saree</option><option>Gown</option><option>Crop Top</option><option>Suit</option><option>Mens Wear</option>
                  </select>
                </div>
                <input 
                  type="text" placeholder="Description" value={product.description}
                  className="w-full border-b border-gray-100 py-3 outline-none focus:border-arinya-gold text-sm font-sans"
                  onChange={(e) => setProduct({...product, description: e.target.value})}
                />
                
                {/* Image Upload Area */}
                <div 
                  onClick={() => handleImageUpload(false)}
                  className="group border-2 border-dashed border-gray-100 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-arinya-gold transition-all bg-[#FAF9F6]"
                >
                  {product.image ? (
                    <img src={product.image} className="h-32 rounded-sm shadow-md" alt="Preview" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-300 group-hover:text-arinya-gold transition-colors mb-2" />
                      <p className="text-[10px] uppercase tracking-widest text-gray-400">Upload Luxury Visual</p>
                    </>
                  )}
                </div>
                {/* Image Link Input */}
                <div className="pt-2">
                  <p className="text-[10px] uppercase tracking-widest text-arinya-gray mb-1">Or Provide Image Link</p>
                  <input 
                    type="url" placeholder="https://example.com/image.jpg" value={product.image}
                    className="w-full border-b border-gray-100 py-3 outline-none focus:border-arinya-gold text-sm font-sans"
                    onChange={(e) => setProduct({...product, image: e.target.value})}
                  />
                </div>
              </div>
              <button type="submit" className="btn-accent w-full py-4 text-[#0F0F0F] font-bold uppercase tracking-[0.3em] text-[11px]">Publish Single Piece</button>
            </form>
          </section>

          {/* --- SECTION B: BULK SEASONAL UPLOAD --- */}
          <section className="space-y-6">
            <h2 className="font-serif text-2xl italic text-arinya-dark flex items-center gap-3">
              <FileSpreadsheet className="w-5 h-5 text-arinya-gold" /> Bulk Import
            </h2>
            <div className="bg-white p-8 border border-gray-50 shadow-xl rounded-sm h-full flex flex-col">
              <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-lg p-10 relative">
                <input 
                  type="file" accept=".csv" 
                  onChange={handleCSVUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                />
                <FileSpreadsheet className="w-12 h-12 text-arinya-gold opacity-20 mb-4" />
                <p className="font-sans text-[10px] uppercase tracking-widest text-arinya-gray text-center">
                  Drop CSV file here to <br /> upload seasonal collections
                </p>
              </div>

              {bulkProducts.length > 0 && (
                <div className="mt-6 space-y-4">
                  <div className="max-h-40 overflow-y-auto border border-gray-50 p-4 rounded-sm">
                    {bulkProducts.map((p, i) => (
                      <div key={i} className="flex justify-between text-[10px] uppercase py-1 border-b border-gray-50 last:border-0">
                        <span className="text-arinya-dark truncate max-w-[150px]">{p.name}</span>
                        <span className="text-arinya-gold">₹{p.price}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={submitBulk} className="btn-accent w-full py-4 text-[#0F0F0F] font-bold uppercase tracking-[0.3em] text-[11px]">
                    Confirm & Launch {bulkProducts.length} Products
                  </button>
                </div>
              )}
            </div>
          </section>

        </div>

        {/* --- SECTION C: ALL PRODUCTS (ATELIER SHOWCASE) --- */}
        <section className="space-y-6 pt-12 border-t border-gray-100">
          <h2 className="font-serif text-2xl italic text-arinya-dark">Atelier Showcase</h2>
          <div className="bg-white border border-gray-50 shadow-xl rounded-sm overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF9F6] border-b border-gray-100 font-sans text-[10px] uppercase tracking-widest text-arinya-gray">
                  <th className="p-4">Piece</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Original (₹)</th>
                  <th className="p-4">Final (₹)</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map(p => {
                  const isEditing = editingId === p.id;
                  const canEdit = typeof p.id === "string";

                  return (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <img src={isEditing ? editFormData.image : p.image} alt={p.name} className="w-12 h-16 object-cover rounded-sm shadow-sm cursor-pointer" onClick={() => { if(isEditing) handleImageUpload(true) }} />
                          {isEditing ? (
                            <div className="flex flex-col gap-2 w-full">
                              <input type="text" value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} className="border-b border-gray-200 outline-none text-sm w-full bg-transparent" placeholder="Name" />
                              <textarea value={editFormData.description} onChange={(e) => setEditFormData({...editFormData, description: e.target.value})} className="border-b border-gray-200 outline-none text-xs w-full bg-transparent resize-none" placeholder="Description" rows={2} />
                              <input type="url" value={editFormData.image} onChange={(e) => setEditFormData({...editFormData, image: e.target.value})} className="border-b border-gray-200 outline-none text-[10px] w-full bg-transparent text-gray-500" placeholder="Image URL (e.g. https://...)" />
                            </div>
                          ) : (
                            <div>
                              <p className="font-serif text-sm text-arinya-dark">{p.name}</p>
                              <p className="text-[9px] text-gray-500 line-clamp-1 max-w-[200px]">{p.description}</p>
                              {p.sku && <p className="text-[9px] uppercase text-gray-400 font-sans tracking-widest mt-1">{p.sku}</p>}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 align-top pt-6">
                        {isEditing ? (
                          <select className="border-b border-gray-200 outline-none text-sm bg-transparent w-full" value={editFormData.category} onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}>
                            <option>Fancy Saree</option><option>Lehenga</option><option>Silk Saree</option><option>Gown</option><option>Crop Top</option><option>Suit</option><option>Mens Wear</option>
                          </select>
                        ) : (
                          <span className="text-[10px] uppercase tracking-wider text-arinya-gray">{p.category}</span>
                        )}
                      </td>
                      <td className="p-4 align-top pt-6">
                        {isEditing ? (
                          <input type="number" value={editFormData.originalPrice || ''} onChange={(e) => setEditFormData({...editFormData, originalPrice: e.target.value})} className="border-b border-gray-200 outline-none text-sm w-20 bg-transparent text-gray-500" placeholder="MRP" />
                        ) : (
                          <span className="text-sm line-through text-gray-400">₹{p.originalPrice || '-'}</span>
                        )}
                      </td>
                      <td className="p-4 text-arinya-gold font-medium align-top pt-6">
                        {isEditing ? (
                          <input type="number" value={editFormData.price} onChange={(e) => setEditFormData({...editFormData, price: e.target.value})} className="border-b border-gray-200 outline-none text-sm w-20 bg-transparent text-arinya-gold" placeholder="Offer" />
                        ) : (
                          <span className="text-sm">₹{p.price}</span>
                        )}
                      </td>
                      <td className="p-4 align-top pt-6">
                        <div className="flex items-center justify-end gap-3">
                          {isEditing ? (
                            <>
                              <button onClick={handleSaveEdit} className="text-green-600 hover:text-green-700 p-2 border border-green-200 rounded-sm hover:bg-green-50"><Save className="w-4 h-4" /></button>
                              <button onClick={() => setEditingId(null)} className="text-gray-500 hover:text-gray-700 p-2 border border-gray-200 rounded-sm hover:bg-gray-50"><X className="w-4 h-4" /></button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => handleEditClick(p)} className={`p-2 transition-colors border rounded-sm ${canEdit ? 'text-blue-600 border-blue-200 hover:bg-blue-50' : 'text-gray-300 border-gray-100 cursor-not-allowed'}`} title={canEdit ? "Edit piece" : "Static pieces cannot be edited"}><Edit className="w-4 h-4" /></button>
                              <button onClick={() => handleDelete(p.id)} className={`p-2 transition-colors border rounded-sm ${canEdit ? 'text-red-500 border-red-200 hover:bg-red-50' : 'text-gray-300 border-gray-100 cursor-not-allowed'}`} title={canEdit ? "Delete piece" : "Static pieces cannot be deleted"}><Trash2 className="w-4 h-4" /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {allProducts.length === 0 && (
              <div className="p-8 text-center text-gray-400 text-sm font-serif italic">
                The atelier is currently empty.
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
