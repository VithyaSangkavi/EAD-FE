import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import CoverImage from '../../assets/background-image.jpg';

function InventoryManagement() {
  const [products, setProducts] = useState([]);
  // const [isVendor, setIsVendor] = useState(false); // Track if the user is a Vendor
  // const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an Admin

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const userEmail = localStorage.getItem('userEmail');
        const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];

        if (!token) {
          // Handle case where the user is not logged in
          return;
        }

        let apiUrl = '';
        if (storedRoles.includes('Admin') || storedRoles.includes('CSR')) {
          apiUrl = 'http://localhost:5296/api/Inventory/admin/products';
        } else if (storedRoles.includes('Vendor')) {
          apiUrl = `http://localhost:5296/api/Inventory/user/${userEmail}/products`;
        } else {
          return;
        }

        // let apiUrl = '';

        // // Use vendor-specific API if the user is a Vendor, otherwise use admin API
        // if (isVendorUser) {
        //   apiUrl = `http://localhost:5296/api/Inventory/user/${userEmail}/products`;
        // } else if (isAdminUser) {
        //   apiUrl = 'http://localhost:5296/api/Inventory/admin/products';
        // } else {
        //   // Handle other roles, if necessary
        //   return;
        // }

        // Make request with Authorization header
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Products Data:', response.data);
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        // Handle error (e.g., show an alert or set an error message)
      }
    };

    fetchProducts();
  }, []);

  const handleRemoveStock = async (productId) => {
    console.log('Removing stock for product with ID:', productId);
    // Here, you'd send a request to your API to remove stock from the inventory.
  };

  return (
    <div
      className="content-screen"
      style={{ backgroundImage: `url(${CoverImage})` }}
    >
      {products.length > 0 ? (
        <div className="container mt-5">
          <h2 style={{ marginTop: '100px' }}>Inventory Management</h2>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Stock Quantity</th>
                <th>Low Stock Alert</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((userProduct) => (
                <React.Fragment key={userProduct.user}>
                  {Object.entries(userProduct.categories).map(
                    ([categoryName, categoryInfo]) =>
                      categoryInfo.products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.name || 'No Name'}</td>{' '}
                          {/* Display product name */}
                          <td>{categoryName}</td> {/* Display category name */}
                          <td>{product.stockQuantity || 'N/A'}</td>{' '}
                          {/* Display stock quantity */}
                          <td>
                            {product.stockQuantity < 10 ? (
                              <Alert variant="danger">Low Stock</Alert>
                            ) : (
                              'In Stock'
                            )}
                          </td>
                          <td>
                            <Button
                              variant="warning"
                              onClick={() => handleRemoveStock(product.id)}
                              disabled={product.stockQuantity === 0}
                            >
                              Remove Stock
                            </Button>
                          </td>
                        </tr>
                      ))
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p>No inventory available</p>
      )}
    </div>
  );
}

export default InventoryManagement;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, Button, Alert } from 'react-bootstrap';
// import CoverImage from '../../assets/background-image.jpg';

// function InventoryManagement() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem('token');

//         if (!token) {
//           // setError('Please log in.');

//           return;
//         }

//         // Make request with Authorization header
//         const response = await axios.get(
//           'http://localhost:5296/api/Inventory/admin/products',
//           {
//             headers: {
//               Authorization: Bearer ${token},
//             },
//           }
//         );
//         console.log('Products Data:', response.data);
//         setProducts(response.data);
//       } catch (err) {
//         console.error('Error fetching products:', err);
//         // setError('Failed to load products. Please make sure you are authorized.' );
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleRemoveStock = async (productId) => {
//     console.log('Removing stock for product with ID:', productId);
//     // Here, you'd send a request to your API to remove stock from the inventory.
//   };

//   return (
//     <div
//       className="content-screen"
//       style={{ backgroundImage: url(${CoverImage}) }}
//     >
//       {products.length > 0 ? (
//         <div className="container mt-5">
//           <h2 style={{ marginTop: '100px' }}>Inventory Management</h2>

//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Product Name</th>
//                 <th>Category</th>
//                 <th>Stock Quantity</th>
//                 <th>Low Stock Alert</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((userProduct) => (
//                 <React.Fragment key={userProduct.user}>
//                   {Object.entries(userProduct.categories).map(
//                     ([categoryName, categoryInfo]) =>
//                       categoryInfo.products.map((product) => (
//                         <tr key={product.id}>
//                           <td>{product.name || 'No Name'}</td>{' '}
//                           {/* Display product name */}
//                           <td>{categoryName}</td> {/* Display category name */}
//                           <td>{product.stockQuantity || 'N/A'}</td>{' '}
//                           {/* Display stock quantity */}
//                           <td>
//                             {product.stockQuantity < 10 ? (
//                               <Alert variant="danger">Low Stock</Alert>
//                             ) : (
//                               'In Stock'
//                             )}
//                           </td>
//                           <td>
//                             <Button
//                               variant="warning"
//                               onClick={() => handleRemoveStock(product.id)}
//                               disabled={product.stockQuantity === 0}
//                             >
//                               Remove Stock
//                             </Button>
//                           </td>
//                         </tr>
//                       ))
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       ) : (
//         <p>No inventory available</p>
//       )}
//     </div>
//   );
// }

// export default InventoryManagement;
