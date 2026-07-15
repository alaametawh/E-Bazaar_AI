const validateForm = (name: string, email: string, address: string) => {
    if(!name || !email || !address) {
        return 'Please fill in all fields';
    }

    const NameRegex = /^[a-zA-Z\s]+$/; // Allows only letters and spaces
    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
    const AddressRegex = /^[a-zA-Z0-9\s,'-]*$/; // Allows letters, numbers, spaces, commas, apostrophes, and hyphens
    const Errors = [
        !NameRegex.test(name) ? 'Wrong Name format' : true,
        !EmailRegex.test(email) ? 'Wrong Email format' : true,
        !AddressRegex.test(address) ? 'Wrong Address format' : true
    ]
    const result = Errors.find(error => error !== true);
    return result ? result : true;
}

export default validateForm;