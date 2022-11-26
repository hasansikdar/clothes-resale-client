import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/UserContext';

const Modal = ({ productModal }) => {
    const { user } = useContext(AuthContext);

    const { productSellingPrice } = productModal;


    return (
        <div>
            {/* The button to open modal */}
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="product-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="product-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{productModal?.productName}</h3><br></br>
                    <h3 className="text-md"><span className='font-bold'>Name:</span> {user?.displayName}</h3>
                    <h3 className="text-md"><span className='font-bold'>Email:</span> {user?.email}</h3>
                    <h3 className="text-md"><span className='font-bold'>Product Price:</span>  ${productSellingPrice}</h3>
                    <div className="form-control mt-5">
                        <input type="text" placeholder="Phone Number" className="input input-bordered my-2" />
                        <input type="text" placeholder="Metting Location" className="input input-bordered" />
                    </div>
                    <br></br>
                    <button className='btn btn-primary'>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;