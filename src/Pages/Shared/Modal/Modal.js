import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/UserContext';

const Modal = ({ productModal, setOpenModal }) => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const { productSellingPrice, productImage, userEmail,productCategory,productName, _id } = productModal;


    // 

    const handleOrder = event => {
        event.preventDefault();
        setLoading(true);
        const order = {
            username: user?.displayName,
            userPhoto: user?.photoURL,
            userOrderEmail: user?.email,
            productPrice: productSellingPrice,
            sellerEmail: userEmail,
            productCategory,
            productName,
            productId: _id,
            productImage,
            phoneNumber: event.target.phone.value,
            mettingLocation: event.target.meetingLocation.value,
        }

        bookingOrder(order);

    }

    // order booking in bd 
    const bookingOrder = order => {
        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                setLoading(false);
                toast.success('Order Successfull');
                setOpenModal(false);
            }
        })
    }



    return (
        <div>
            {/* The button to open modal */}
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="product-modal" className="modal-toggle" />
            <div className="modal">
                <form onSubmit={handleOrder} className="modal-box relative">
                    <label htmlFor="product-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{productModal?.productName}</h3><br></br>
                    <h3 className="text-md"><span className='font-bold'>Name:</span> {user?.displayName}</h3>
                    <h3 className="text-md"><span className='font-bold'>Email:</span> {user?.email}</h3>
                    <h3 className="text-md"><span className='font-bold'>Product Price:</span>  ${productSellingPrice}</h3>
                    <div className="form-control mt-5">
                        <input name="phone" required type="text" placeholder="Phone Number" className="input input-bordered my-2" />
                        <input name="meetingLocation" required type="text" placeholder="Metting Location" className="input input-bordered" />
                    </div>
                    <br></br>
                    <button disabled={loading} className='btn btn-primary'>{loading ? 'Loading...': 'Submit'}</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;