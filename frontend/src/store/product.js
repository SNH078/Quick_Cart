import { create } from 'zustand'

// Create a Zustand store for managing products
export const useProductStore = create((set) => ({
  products: [], // Initial state: empty array of products
  setProducts: (products) => set({ products }), // Function to set the entire product list

//----------------------------------------------------

  createProduct: async (newProduct) => {
    // Validate the new product
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please provide all fields" }
    }

    // Make a POST request to the backend API to create a new product
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })

    // Parse the response
    const data = await res.json()

    // data: The entire response object from the API.
    // data.data: The actual data (array of products) inside the response object.
    // (Example response from the API:)
    /*{ 
      "data": [
        { "id": 1, "name": "Product 1", "price": 100 },
        { "id": 2, "name": "Product 2", "price": 200 }
      ]
    }*/
      
  // state : current state of the store
    //callback function returns a new state object with the updated products array

    set((state) => ({ products: [...state.products, data.data] }))

    return { success: true, message: "Product created successfully!" }
  },

  //----------------------------------------------------
  //fetch the products from the backend.
// The fetched products are displayed in a list.
  fetchProducts:async()=>{
    const res = await fetch('/api/products');
    const data = await res.json();
    set({products: data.data});
  },
//----------------------------------------------------

  deleteProduct: async (pId) => {
    // Make a DELETE request to the backend API to delete a product
    const res = await fetch(`/api/products/${pId}`, {
      method: 'DELETE',
    })

    // Parse the response
    const data = await res.json()

    if(!data.success){
      return { success: false, message: data.message }
    }
    // Update the local state by removing the deleted product
    //below set()...etc ..updates the UI immediately w/o the need to refresh
    set((state) => ({
      products: state.products.filter((product) => product._id !== pId),
    }))
//if above line is removed ..we need to refresh to see the updated list
    return { success: true, message: "Product deleted successfully!" }
  },

  updateProduct:async(pId,updatedProduct)=>{
    const res = await fetch(`/api/products/${pId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),  // updated
        })
        const data = await res.json(); // updated 
        if(!data.success){
            return { success: false, message: data.message }
          }
           //below set()...etc ..updates the UI immediately w/o the need to refresh
            set(state => ({
              products: state.products.map(product => product._id === pId ? data.data : product),
                }
            ))
            
            return { success: true, message: "Product updated successfully!" }

},
}))