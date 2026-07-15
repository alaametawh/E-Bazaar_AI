import Divider from './Divider'

const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-bg/90 text-text/70 font-default text-sm sm:text-base tracking-wide mt-4">
        <Divider />
        <p className="text-text/70 text-sm sm:text-base tracking-wide grid place-items-center w-full py-4">
            &copy; {new Date().getFullYear()} E-Bazaar. All rights reserved
            <span className="text-accent text-xs font-bold"> Cairo, Egypt </span>
        </p>
    </div>
  )
}

export default Footer