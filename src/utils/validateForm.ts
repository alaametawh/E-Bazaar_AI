const validateForm = (name: string, number: string, address: string) => {
    if(!name || !number || !address) {
        return 'Please fill in all fields';
    }

    const NameRegex = /^[a-zA-Z\s]+$/; // Allows only letters and spaces
    const NumberRegex = /^(010|011|012)\d{8}$/; // Allows only numbers that start with 010, 011, or 012
    const AddressRegex = /^[a-zA-Z0-9\s,'-]*$/; // Allows letters, numbers, spaces, commas, apostrophes, and hyphens
    const Errors = [
        !NameRegex.test(name) ? 'Wrong Name format' : true,
        !NumberRegex.test(number) ? 'Wrong Phone Number format' : true,
        !AddressRegex.test(address) ? 'Wrong Address format' : true
    ]
    const result = Errors.find(error => error !== true);
    return result ? result : true;
}

export default validateForm;