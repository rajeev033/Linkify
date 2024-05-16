function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="bg-[#000000] hover:scale-[1.05] text-white font-bold py-2 px-4 rounded-[24px] transition-[all]">{children}</button>
  )
}
export default Button;