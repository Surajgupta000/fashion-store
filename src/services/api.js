import api from '../api/axios';
import localProducts from '../data/products';

export const fetchProducts = async () => {
    try {
        const response = await api.get('/products');
        // Normalize DB products to match frontend expectations (id, isNew)
        const dbProducts = response.data.map(p => ({
            ...p,
            id: p._id,
            isNew: p.isArrival || false,
            // Fallback image in case the database contains a broken or empty one
            image: p.image || "https://images.unsplash.com/photo-1610030469983-98e550d615e1?q=80&w=800&auto=format&fit=crop"
        }));
        
        // Merge the backend database products with the locally stored static products
        // so that the entire previous collection remains visible while adding new ones
        return [...dbProducts, ...localProducts];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [...localProducts]; // If backend fails, fallback entirely to local data
    }
};

export const addProduct = async (productData) => {
    try {
        const response = await api.post('/products/add', productData);
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

export const addBulkProducts = async (productsArray) => {
    try {
        const response = await api.post('/products/bulk-add', productsArray);
        return response.data;
    } catch (error) {
        console.error("Error bulk adding products:", error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};
