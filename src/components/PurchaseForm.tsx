import { useState } from 'react'
import validateForm from '@/utils/validateForm';
import { submitForm } from '@/services/apiSubmitForm';
import { X } from 'lucide-react'
import toast from 'react-hot-toast';
const PurchaseForm = ({ isOpen, setIsOpen, cartItems, setCartItems, total }: { isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; cartItems: any[]; setCartItems: React.Dispatch<React.SetStateAction<any[]>>; total: number }) => {
    const [userData, setUserData] = useState({
        name: '',
        number: '',
        address: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Validatation
        const validationError = validateForm(userData.name, userData.number, userData.address);
        if (validationError !== true) {
            toast.error(validationError as string);
            return;
        }

        // Lock the button
        setIsSubmitting(true);

        // Try to submit, catch any errors
        try {
            await submitForm(userData, cartItems, total);
            
            // on success, clear the cart and localStorage, and show a success toast and close the form
            setCartItems([]);
            localStorage.removeItem('cartItems');
            toast.success('Purchase successful!');
            setIsOpen(false);
            
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            // Unlock the button whether it succeeds or fails
            setIsSubmitting(false);
        }
    }



    return (
        <div className={`${isOpen ? 'fixed' : 'hidden'} inset-0 bg-black/50 backdrop-blur-sm z-40 grid place-items-center`} onClick={(e) => {
            if (e.target === e.currentTarget) {
                setIsOpen(false);
            }
        }}>
            <div className={`flex flex-col gap-4 w-[90dvw] h-max bg-bg rounded-lg p-4 md:p-8 border border-accent/50 shadow-lg`}>
                <div className="flex items-center px-4 py-2 justify-between">
                    <h2 className="text-lg md:text-xl font-bold text-accent text-center font-default">Purchase Form</h2>
                    <X size={24} className="cursor-pointer hover:text-red-500 transition-colors duration-300 text-accent" onClick={() => setIsOpen(false)} />
                </div>
                <form className="flex flex-col gap-4 " onSubmit={onSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm md:text-base font-bold text-text font-default">Name</label>
                        <input onChange={(e) => setUserData({ ...userData, name: e.target.value })} value={userData.name} type="text" id="name" name="name" placeholder="Enter your name" className="font-default w-full px-4 py-2 rounded-md border border-accent/30 focus:outline-none focus:ring-2 focus:ring-accent/50" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="number" className="text-sm md:text-base font-bold text-text font-default">Phone Number</label>
                        <input onChange={(e) => setUserData({ ...userData, number: e.target.value })} value={userData.number} type="text" id="number" name="number" placeholder="Enter your phone number" className="font-default w-full px-4 py-2 rounded-md border border-accent/30 focus:outline-none focus:ring-2 focus:ring-accent/50" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="address" className="text-sm md:text-base font-bold text-text font-default">Address</label>
                        <input onChange={(e) => setUserData({ ...userData, address: e.target.value })} value={userData.address} type="text" id="address" name="address" placeholder="Enter your address" className="font-default w-full px-4 py-2 rounded-md border border-accent/30 focus:outline-none focus:ring-2 focus:ring-accent/50" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className={`cursor-pointer w-full p-2 bg-accent text-bg font-bold rounded-md hover:bg-accent/80 transition-colors duration-300`}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PurchaseForm